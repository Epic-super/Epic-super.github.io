"""
民航旅客体验深度解析平台 —— 轻量后端 (零依赖, 标准库 http.server)
提供分析结果 REST API, 并托管构建后的 React 看板。

运行: python app.py   (默认端口 5000)
依赖: 仅 Python 标准库 (+ pipeline/dimensions 模块用于维度归类)
"""
import os
import sys
import json
import gzip
import mimetypes
from collections import Counter, defaultdict
import functools
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESULTS = os.path.join(ROOT, "pipeline", "results")
DATA = os.path.join(ROOT, "pipeline", "data")
BUILD = os.path.join(ROOT, "build")  # workbench 部署: build 直接放 ROOT/build
PIPELINE = os.path.join(ROOT, "pipeline")
if PIPELINE not in sys.path:
    sys.path.insert(0, PIPELINE)
import dimensions  # noqa: E402

FILES = ["meta", "sentiment", "topics", "wordcloud", "dimensions",
         "timeseries", "trend", "interpretability", "topics_tuning", "airlines"]


def load_json(name):
    p = os.path.join(RESULTS, name + ".json")
    if not os.path.exists(p):
        raise FileNotFoundError(f"结果文件缺失: {name}.json —— 请先运行对应 pipeline 脚本")
    with open(p, encoding="utf-8") as f:
        return json.load(f)


# ---- 词表 (分段词云用) ----
WHITELIST = set()
WL_PATH = os.path.join(ROOT, "words.txt")
if os.path.exists(WL_PATH):
    with open(WL_PATH, encoding="utf-8", errors="ignore") as f:
        for ln in f:
            w = ln.strip().lower()
            if w:
                WHITELIST.add(w)

# ---- 结构化数据 (懒加载到内存, 用于分段筛选) ----
# 优先级: ① 本地 data/structured.jsonl(.gz)  ② 本机原竞赛目录(402MB, 不进仓库, 走回退)
_STRUCTURED = None
_STRUCTURED_SRC = None
_CANDIDATE_STRUCTURED = [
    os.path.join(DATA, "structured.jsonl"),
    os.path.join(DATA, "structured.jsonl.gz"),
    r"<本机项目数据目录>/pipeline/data/structured.jsonl",
    r"<本机项目数据目录>/pipeline/data/structured.jsonl.gz",
]


def _load_structured():
    global _STRUCTURED, _STRUCTURED_SRC
    if _STRUCTURED is None:
        recs = []
        src = None
        for cand in _CANDIDATE_STRUCTURED:
            if os.path.exists(cand):
                src = cand
                break
        if src:
            is_gz = src.endswith(".gz")
            opener = gzip.open if is_gz else open
            with opener(src, "rt" if is_gz else "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        recs.append(json.loads(line))
                    except Exception:
                        pass
        _STRUCTURED = recs
        _STRUCTURED_SRC = src
    return _STRUCTURED


def _global_view():
    """全量视图: 合并 meta/sentiment/topics/dimensions/wordcloud"""
    return {
        "scope": "all",
        "airline": None,
        "meta": load_json("meta"),
        "topics": load_json("topics"),
        "sentiment": load_json("sentiment"),
        "dimensions": load_json("dimensions"),
        "wordcloud": load_json("wordcloud"),
    }


def _airline_view(slug):
    """单航司视图: 用文本归因得到的该航司聚合, 叠加全量 meta/topics"""
    data = load_json("airlines")
    per = data.get("per_airline", {}).get(slug)
    if per is None:
        return None
    info = next((a for a in data["airlines"] if a["slug"] == slug), None)
    return {
        "scope": "airline",
        "airline": info,
        "meta": load_json("meta"),
        "topics": load_json("topics"),
        "sentiment": per["sentiment"],
        "dimensions": {"dimensions": per["dimensions"]},
        "wordcloud": per["wordcloud"],
        "samples": per.get("samples", []),
    }


def _segment_view(year, region, route, airline):
    """多维分段视图: 按 年/地区/航线/航司 实时聚合, 复用维度归类与词表"""
    recs = _load_structured()
    pos = neg = neu = tot = 0
    dim_count = {d["key"]: 0 for d in dimensions.DIMENSIONS}
    word_counter = Counter()
    samples = []
    sample_cap = 10
    for r in recs:
        ym = r.get("travel_ym") or r.get("post_ym") or ""
        if year and ym[:4] != year:
            continue
        if region and r.get("region") != region:
            continue
        if route and r.get("route") != route:
            continue
        if airline and r.get("airline") != airline:
            continue
        tot += 1
        s = r.get("sent")
        if s == "pos":
            pos += 1
        elif s == "neg":
            neg += 1
        else:
            neu += 1
        toks = dimensions.clean(r.get("text", "") or "")
        dk, _ = dimensions.classify_dimension(toks)
        if dk:
            dim_count[dk] += 1
        for w in toks:
            if w in WHITELIST:
                word_counter[w] += 1
        if len(samples) < sample_cap and r.get("text"):
            samples.append({
                "rating": r.get("rating"), "text": r.get("text"),
                "region": r.get("region"), "route": r.get("route"),
                "airline": r.get("airline"),
            })
    words = [{"name": w, "value": c} for w, c in word_counter.most_common(40)]
    dims = [{
        "key": k, "name": dimensions.DIM_BY_KEY[k]["name"],
        "count": v, "proportion": (v / tot if tot else 0),
    } for k, v in dim_count.items()]
    return {
        "scope": "segment",
        "filters": {"year": year, "region": region, "route": route, "airline": airline},
        "sentiment": {"distribution": {"pos": pos, "neg": neg, "neu": neu}, "total": tot},
        "dimensions": {"dimensions": dims},
        "wordcloud": {"words": words},
        "samples": samples,
    }


def ym_idx(ym):
    """'2019-05' -> 2019*12+5 ; 无效返回 None"""
    try:
        y, m = ym.split("-")[:2]
        return int(y) * 12 + int(m)
    except Exception:
        return None


_PRIORITY_CACHE = {}


def _priority_view(airline, year, region, route):
    """问题优先级加权打分 (#17), 支持按 航司/年份/地区/航线 联动。

    逻辑与 pipeline/priority.py 一致 (维度关键词归类 + 近12月 vs 前12月趋势
    + 声量占比×负面率 归一化), 但改为后端实时聚合, 并随筛选条件联动。
    无过滤条件时直接返回离线预计算的 priority.json, 保持一致且零延迟。
    结果按 (airline, year, region, route) 元组缓存到内存, 避免重复遍历 89 万条。
    """
    # 全量(无过滤) -> 直接返回离线文件 (补齐 scope/filters 保持结构一致)
    if (not airline or airline == "all") and not year and not region and not route:
        result = load_json("priority")
        result["scope"] = "priority_all"
        result["filters"] = {"airline": "", "year": "", "region": "", "route": ""}
        return result
    key = (airline, year, region, route)
    if key in _PRIORITY_CACHE:
        return _PRIORITY_CACHE[key]

    recs = _load_structured()
    keys = [d["key"] for d in dimensions.DIMENSIONS]
    agg = {}
    for k in keys:
        agg[k] = {"vol": 0, "neg": 0, "rating_sum": 0.0, "rating_n": 0,
                  "monthly": defaultdict(lambda: {"vol": 0, "neg": 0})}
    total = 0
    ym_set = set()
    for r in recs:
        # ---- 联动过滤 (与 _segment_view 同口径: 年份取 travel_ym or post_ym) ----
        ym_filter = (r.get("travel_ym") or r.get("post_ym") or "")
        if airline and airline != "all" and r.get("airline") != airline:
            continue
        if year and ym_filter[:4] != year:
            continue
        if region and r.get("region") != region:
            continue
        if route and r.get("route") != route:
            continue
        text = (r.get("text") or "") + " " + (r.get("title") or "")
        toks = dimensions.clean(text)
        if len(toks) < 2:
            total += 1
            continue
        k, _ = dimensions.classify_dimension(toks)
        if k is None:
            total += 1
            continue
        m = agg[k]
        m["vol"] += 1
        rating = r.get("rating")
        if isinstance(rating, (int, float)):
            m["rating_sum"] += rating
            m["rating_n"] += 1
        sent = r.get("sent")
        neg = (sent == "negative") or (isinstance(rating, (int, float)) and rating <= 2)
        if neg:
            m["neg"] += 1
        ym = r.get("post_ym") or ""   # 趋势用 post_ym (与离线 priority.py 一致)
        if ym and "-" in ym:
            ym_set.add(ym)
            b = m["monthly"][ym]
            b["vol"] += 1
            if neg:
                b["neg"] += 1
        total += 1

    # ---- 时间趋势窗口: 近12个月 vs 前12个月 ----
    latest = max(ym_set) if ym_set else None
    recent_lo = prev_lo = prev_hi = None
    if latest:
        li = ym_idx(latest)
        recent_lo = li - 11
        prev_lo = li - 23
        prev_hi = li - 12

    out = {}
    total_vol = sum(agg[k]["vol"] for k in keys) or 1
    for k in keys:
        m = agg[k]
        vol = m["vol"]
        neg = m["neg"]
        neg_rate = neg / vol if vol else 0.0
        vol_share = vol / total_vol
        avg_rating = (m["rating_sum"] / m["rating_n"]) if m["rating_n"] else None
        recent_neg_rate = prev_neg_rate = delta = None
        direction = "unknown"
        if latest:
            for ym, b in m["monthly"].items():
                idx = ym_idx(ym)
                if idx is None:
                    continue
                if recent_lo <= idx <= li:
                    m["recent_vol"] = m.get("recent_vol", 0) + b["vol"]
                    m["recent_neg"] = m.get("recent_neg", 0) + b["neg"]
                elif prev_lo <= idx <= prev_hi:
                    m["prev_vol"] = m.get("prev_vol", 0) + b["vol"]
                    m["prev_neg"] = m.get("prev_neg", 0) + b["neg"]
            rv = m.get("recent_vol", 0)
            pv = m.get("prev_vol", 0)
            recent_neg_rate = (m.get("recent_neg", 0) / rv) if rv else None
            prev_neg_rate = (m.get("prev_neg", 0) / pv) if pv else None
            if recent_neg_rate is not None and prev_neg_rate is not None:
                delta = recent_neg_rate - prev_neg_rate
                if delta > 0.01:
                    direction = "worsening"
                elif delta < -0.01:
                    direction = "improving"
                else:
                    direction = "stable"
        raw = vol_share * neg_rate
        out[k] = {
            "key": k,
            "name": dimensions.DIM_BY_KEY[k]["name"],
            "en": dimensions.DIM_BY_KEY[k]["en"],
            "volume": vol,
            "volume_share": round(vol_share, 4),
            "neg_count": neg,
            "neg_rate": round(neg_rate, 4),
            "avg_rating": round(avg_rating, 3) if avg_rating is not None else None,
            "priority_raw": round(raw, 6),
            "trend": {
                "latest_month": latest,
                "recent_neg_rate": round(recent_neg_rate, 4) if recent_neg_rate is not None else None,
                "prev_neg_rate": round(prev_neg_rate, 4) if prev_neg_rate is not None else None,
                "delta": round(delta, 4) if delta is not None else None,
                "direction": direction,
            },
        }

    max_raw = max(o["priority_raw"] for o in out.values()) or 1
    for k in keys:
        out[k]["priority_pct"] = round(100 * out[k]["priority_raw"] / max_raw, 1)
    ranked = sorted(keys, key=lambda k: out[k]["priority_pct"], reverse=True)
    for i, k in enumerate(ranked, 1):
        out[k]["rank"] = i

    dims_sorted = [out[k] for k in ranked]
    result = {
        "method": ("优先级 = 声量占比(volume_share) × 负面率(neg_rate), 归一化到最高维=100%; "
                   "维度采用设计书 5 大业务维度关键词匹配归类; 趋势为近12月 vs 前12月负面率之差。"),
        "data_total": total,
        "dimensions_assigned": total_vol,
        "latest_month": latest,
        "scope": "priority_filtered" if (airline or year or region or route) else "priority_all",
        "filters": {"airline": airline, "year": year, "region": region, "route": route},
        "dimensions": dims_sorted,
        "note": "优先级分是相对值: 最高优先级维度归一化为 100%, 其余按 (声量占比×负面率) 比例缩放。",
    }
    _PRIORITY_CACHE[key] = result
    return result


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype="application/json; charset=utf-8"):
        if isinstance(body, (dict, list)):
            body = json.dumps(body, ensure_ascii=False).encode("utf-8")
        elif isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        try:
            if path.startswith("/api/"):
                qs = parse_qs(parsed.query)
                self._api(path[len("/api/"):], qs)
                return
            self._static(path)
        except FileNotFoundError as e:
            self._send(503, {"error": str(e)})
        except Exception as e:  # pragma: no cover
            self._send(500, {"error": str(e)})

    def _api(self, name, qs):
        if name == "all":
            self._send(200, _global_view())
        elif name == "airlines":
            data = load_json("airlines")
            self._send(200, {
                "airlines": data["airlines"],
                "total_matched": data["total_matched"],
                "total_unmatched": data["total_unmatched"],
                "method": data["method"],
                "threshold": data["threshold"],
            })
        elif name.startswith("airline/"):
            slug = name[len("airline/"):].strip()
            if slug == "" or slug == "all":
                self._send(200, _global_view())
                return
            view = _airline_view(slug)
            if view is None:
                self._send(404, {"error": "unknown airline: " + slug})
            else:
                self._send(200, view)
        elif name == "segment":
            year = (qs.get("year", [""])[0] or "") if "year" in qs else ""
            region = (qs.get("region", [""])[0] or "") if "region" in qs else ""
            route = (qs.get("route", [""])[0] or "") if "route" in qs else ""
            airline = (qs.get("airline", [""])[0] or "") if "airline" in qs else ""
            self._send(200, _segment_view(year, region, route, airline))
        elif name == "priority":
            airline = (qs.get("airline", [""])[0] or "") if "airline" in qs else ""
            year = (qs.get("year", [""])[0] or "") if "year" in qs else ""
            region = (qs.get("region", [""])[0] or "") if "region" in qs else ""
            route = (qs.get("route", [""])[0] or "") if "route" in qs else ""
            self._send(200, _priority_view(airline, year, region, route))
        elif name in FILES:
            try:
                self._send(200, load_json(name))
            except FileNotFoundError:
                self._send(404, {"error": name + ".json 尚未生成（该模块可能未运行）"})
        else:
            self._send(404, {"error": "unknown api: " + name})

    def _static(self, path):
        if not os.path.isdir(BUILD):
            self._send(200, "<h3>前端尚未构建</h3><p>请在 00vis/00air-comments/demo-airline 执行 "
                              "<code>npm run build</code> 后再访问。</p>", "text/html; charset=utf-8")
            return
        if path in ("", "/"):
            fp = os.path.join(BUILD, "index.html")
        else:
            fp = os.path.join(BUILD, path.lstrip("/"))
        if os.path.isfile(fp):
            ctype = mimetypes.guess_type(fp)[0] or "application/octet-stream"
            with open(fp, "rb") as f:
                self._send(200, f.read(), ctype)
        else:
            with open(os.path.join(BUILD, "index.html"), "rb") as f:
                self._send(200, f.read(), "text/html; charset=utf-8")

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Serving API + dashboard at http://localhost:{port}")
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
