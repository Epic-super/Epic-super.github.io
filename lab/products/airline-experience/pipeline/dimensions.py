"""
民航旅客体验深度解析平台 —— 业务维度映射 (纯标准库, 零依赖)

把"纯学术"的 LDA 主题, 翻译回产品能看懂的 5 大业务维度:
  准点延误 / 行李 / 人员服务 / 客舱舒适 / 价格

做法:
  1) 用设计书定义的 5 大业务维度关键词字典, 对每条真实评论做关键词匹配归类
     -> 直接、可解释、符合产品视角 (而非黑盒 LDA 聚类)
  2) 复用标注评论(评分1-5)构建 log-odds 情感词典, 计算"每个维度内部"的情感拆分
  3) 把已跑出的 LDA 主题(top词) 回填映射到业务维度, 做"学术->产品"桥接说明
  4) 输出 dimensions.json 供前端产品化看板使用

数据: 02cleanData/comments/corpus.txt + 01getRemark/02_rawData/.../remarks_*.txt
运行: python pipeline/dimensions.py
结果: pipeline/results/dimensions.json
"""
import os
import re
import json
import math
import random
import argparse
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORPUS_PATH = os.path.join(ROOT, "02cleanData", "comments", "corpus.txt")
REMARKS_ROOT = os.path.join(ROOT, "01getRemark", "02_rawData")
RESULTS_DIR = os.path.join(ROOT, "pipeline", "results")
TOPICS_PATH = os.path.join(RESULTS_DIR, "topics.json")

SAMPLE_CORPUS = 40000
LEXICON_ROWS = 30000
SEED = 42
random.seed(SEED)

STOP = set("""a an the and or but if then else when at by for with about against between into
through during before after above below to from up down in out on off over under again further
once here there all any both each few more most other some such no nor not only own same so than
too very can will just should now i me my we our you your he she it they them his her its their
is are was were be been being have has had do does did this that these those of as at s t re ve ll
m d o re y ain don didn doesn what which who whom where why how am pm""".split())

_token_re = re.compile(r"[^a-z0-9\s]")

# ---- 5 大业务维度关键词字典 (设计书口径, 英文语料) ----
DIMENSIONS = [
    {
        "key": "punctuality", "name": "准点延误", "en": "Punctuality & Delay",
        "keywords": ["delay", "delayed", "late", "arrive", "arrival", "arrived", "depart",
                     "departure", "departed", "time", "hour", "minute", "cancel", "cancelled",
                     "canceled", "schedule", "scheduled", "ontime", "on_time", "missed",
                     "connection", "connections", "wait", "waited", "waiting", "hold", "held"],
    },
    {
        "key": "baggage", "name": "行李", "en": "Baggage & Luggage",
        "keywords": ["bag", "bags", "baggage", "luggage", "suitcase", "suitcases", "lost",
                     "lose", "losing", "carry", "carryon", "carry_on", "checked", "checkin",
                     "cart", "trolley", "damaged", "broken", "missing"],
    },
    {
        "key": "service", "name": "人员服务", "en": "Staff & Service",
        "keywords": ["service", "staff", "crew", "attendant", "attendants", "helpful", "rude",
                     "friendly", "polite", "unhelpful", "customer", "agent", "agents", "board",
                     "boarding", "check", "checkin", "kind", "professional", "worst", "better",
                     "attitude", "treated", "greeting", "smile"],
    },
    {
        "key": "cabin", "name": "客舱舒适", "en": "Cabin & Comfort",
        "keywords": ["seat", "seats", "legroom", "leg", "room", "space", "comfortable",
                     "uncomfortable", "class", "economy", "business", "premium", "wifi",
                     "entertainment", "food", "meal", "meals", "drink", "drinks", "clean",
                     "dirty", "toilet", "restroom", "temperature", "cold", "hot", "window", "aisle"],
    },
    {
        "key": "price", "name": "价格", "en": "Price & Value",
        "keywords": ["price", "prices", "cost", "costs", "expensive", "cheap", "value", "fare",
                     "fares", "fee", "fees", "charge", "charged", "paid", "pay", "money", "dollar",
                     "dollars", "refund", "ticket", "tickets", "booked", "booking", "upgrade", "deal"],
    },
]
DIM_BY_KEY = {d["key"]: d for d in DIMENSIONS}
for d in DIMENSIONS:
    d["kwset"] = set(d["keywords"])


def clean(text):
    text = text.lower()
    text = _token_re.sub(" ", text)
    return [t for t in text.split() if t and t not in STOP and len(t) > 1]


def build_lexicon(cap):
    """从标注评论(评分)构建 log-odds 情感词典, 返回 {word: logodds}"""
    print("[lexicon] 构建情感词典 (log-odds) ...", flush=True)
    pos = Counter()
    neg = Counter()
    n_pos = n_neg = 0
    files = []
    for dirpath, _, fnames in os.walk(REMARKS_ROOT):
        for fn in fnames:
            if fn.startswith("remarks_") and fn.endswith(".txt"):
                files.append(os.path.join(dirpath, fn))
    rows = 0
    for fp in files:
        try:
            with open(fp, encoding="utf-8", errors="ignore") as f:
                for line in f:
                    line = line.rstrip("\n")
                    if not line:
                        continue
                    parts = line.split("\t")
                    try:
                        rating = int(float(parts[0]))
                    except ValueError:
                        continue
                    if rating < 1 or rating > 5:
                        continue
                    text = ""
                    for p in reversed(parts[1:]):
                        if p.strip():
                            text = p.strip()
                            break
                    if not text:
                        continue
                    toks = clean(text)
                    if len(toks) < 3:
                        continue
                    if rating > 3:
                        pos.update(toks)
                        n_pos += 1
                    elif rating < 3:
                        neg.update(toks)
                        n_neg += 1
                    rows += 1
                    if rows >= cap:
                        break
        except Exception:
            pass
        if rows >= cap:
            break
    print(f"[lexicon] 正样本 {n_pos} / 负样本 {n_neg}", flush=True)
    vocab = set(pos) | set(neg)
    lex = {}
    for w in vocab:
        pp = (pos[w] + 1) / (n_pos + 1)
        pn = (neg[w] + 1) / (n_neg + 1)
        lex[w] = math.log(pp / pn)  # >0 偏正面, <0 偏负面
    return lex


def classify_dimension(toks):
    best_key, best_score = None, 0
    for d in DIMENSIONS:
        s = sum(1 for t in toks if t in d["kwset"])
        if s > best_score:
            best_key, best_score = d["key"], s
    return best_key, best_score


def map_lda_to_dimensions():
    """把已跑出的 LDA 主题 top 词, 回填映射到业务维度 (学术->产品桥接)"""
    if not os.path.exists(TOPICS_PATH):
        return []
    with open(TOPICS_PATH, encoding="utf-8") as f:
        topics = json.load(f).get("topics", [])
    bridge = []
    for t in topics:
        score_by_dim = Counter()
        for w in t.get("words", []):
            wt = w["word"]
            for d in DIMENSIONS:
                if wt in d["kwset"]:
                    score_by_dim[d["key"]] += w.get("weight", 0)
        if score_by_dim:
            top_dim = score_by_dim.most_common(1)[0][0]
        else:
            top_dim = "service"  # LDA 主题无强业务匹配时默认归入"服务"
        bridge.append({
            "lda_id": t["id"],
            "lda_name": t["name"],
            "lda_proportion": t["proportion"],
            "mapped_dim": top_dim,
            "mapped_dim_name": DIM_BY_KEY[top_dim]["name"],
        })
    return bridge


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample-corpus", type=int, default=SAMPLE_CORPUS)
    ap.add_argument("--lexicon-rows", type=int, default=LEXICON_ROWS)
    args = ap.parse_args()
    os.makedirs(RESULTS_DIR, exist_ok=True)

    lex = build_lexicon(args.lexicon_rows)
    lex_median = sorted(lex.values())[len(lex) // 2]

    print(f"[io] 抽样 corpus.txt -> {args.sample_corpus} 行 ...", flush=True)
    comments = []
    total = 0
    step = None
    with open(CORPUS_PATH, encoding="utf-8", errors="ignore") as f:
        for line in f:
            total += 1
            if step is None and total >= args.sample_corpus:
                step = max(1, total // args.sample_corpus)
            if step and total % step == 0:
                comments.append(line.strip())
                if len(comments) >= args.sample_corpus:
                    break
    print(f"[io] corpus 总行数≈{total}, 抽样 {len(comments)}", flush=True)

    # 每维度累加
    dim_count = Counter()
    dim_sent = {d["key"]: Counter() for d in DIMENSIONS}
    dim_kw = {d["key"]: Counter() for d in DIMENSIONS}
    dim_examples = {d["key"]: [] for d in DIMENSIONS}
    unmapped = 0

    for line in comments:
        toks = clean(line)
        if len(toks) < 3:
            continue
        key, score = classify_dimension(toks)
        if key is None:
            unmapped += 1
            continue
        dim_count[key] += 1
        # 情感: 该评论所有词 log-odds 之和
        s = sum(lex.get(t, 0.0) for t in toks)
        if s > 0.3:
            lab = "pos"
        elif s < -0.3:
            lab = "neg"
        else:
            lab = "neu"
        dim_sent[key][lab] += 1
        matched = [t for t in toks if t in DIM_BY_KEY[key]["kwset"]]
        dim_kw[key].update(matched)
        if len(dim_examples[key]) < 6:
            dim_examples[key].append({"text": line[:200], "sentiment": lab, "score": round(s, 3)})

    total_assigned = sum(dim_count.values()) or 1

    out_dims = []
    for d in DIMENSIONS:
        k = d["key"]
        c = dim_count[k]
        sent = dim_sent[k]
        st = sent["pos"] + sent["neg"] + sent["neu"] or 1
        out_dims.append({
            "key": k,
            "name": d["name"],
            "en": d["en"],
            "count": c,
            "proportion": round(c / total_assigned, 4),
            "sentiment": {
                "pos": sent["pos"],
                "neg": sent["neg"],
                "neu": sent["neu"],
                "pos_pct": round(sent["pos"] / st, 4),
                "neg_pct": round(sent["neg"] / st, 4),
                "neu_pct": round(sent["neu"] / st, 4),
            },
            "keywords": [{"word": w, "value": int(n)} for w, n in dim_kw[k].most_common(15)],
            "examples": dim_examples[k],
        })

    bridge = map_lda_to_dimensions()

    result = {
        "dimensions": out_dims,
        "unmapped_proportion": round(unmapped / (total_assigned + unmapped), 4),
        "corpus_sample": len(comments),
        "assigned": total_assigned,
        "unmapped": unmapped,
        "lda_to_dimension": bridge,
        "note": "业务维度采用设计书口径的关键词字典对真实评论直接归类(可解释、产品化); 情感拆分为同套 log-odds 情感词典(与零依赖版85%口径一致)。LDA 主题为学术自动聚类, 通过 lda_to_dimension 桥接回业务维度。",
    }
    with open(os.path.join(RESULTS_DIR, "dimensions.json"), "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print("[done] dimensions.json 已写入", RESULTS_DIR, flush=True)
    print("[stat] 维度占比:", {d["name"]: d["proportion"] for d in out_dims}, flush=True)


if __name__ == "__main__":
    main()
