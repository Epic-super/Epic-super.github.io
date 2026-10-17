/* 灵魂拷问 · 苏格拉底式自我诘问引擎（纯前端，无后端、无密钥、本地持久化）
 * 四段连问：为什么做 → 打算怎么做 → 要付出什么 → 达到什么目的
 * 靠答案内容做分支追问、矛盾镜像、复盘摘要。
 */
(function () {
  'use strict';

  var STORE_KEY = 'soul_session_v1';

  // 四段式。bridge = 上一段过渡到本段的引线。
  var STAGES = [
    {
      id: 'why', label: '为什么做',
      q: '先从最该问的开始：你为什么要做这件事？别急着给“正确”的答案，给真的那个——哪怕它自私、无聊，或者很俗。',
      bridge: '动机我替你记下了。接下来换个角度，问你具体怎么做——'
    },
    {
      id: 'how', label: '打算怎么做',
      q: '说路径。你打算怎么做？具体到“明天就能迈出、且能被验证”的那一步，不要给我一份宏大的年度计划。',
      bridge: '方法我听进去了。但方法不免费——'
    },
    {
      id: 'cost', label: '要付出什么',
      q: '任何事都有价签。这件事要你付出什么？时间、钱、关系、面子、睡眠、别的机会……把它摊开，别用“值得”来糊弄自己。',
      bridge: '代价你也认了。那收尾的、最凉的一句——'
    },
    {
      id: 'goal', label: '达到什么目的',
      q: '最后问你：你做到什么程度，才算“达到了目的”？给一个能被证伪的标准，不是“变得更好”这种谁都不会反驳的废话。',
      bridge: null
    }
  ];

  // 跨段矛盾检测：a 段说过某类词、b 段（当前）又说了对立词 → 镜像出来。
  var TENSIONS = [
    {
      a: 'how', aTok: ['每天', '长期', '持续', '全年', '天天', '一直', '全年无休', '周末'],
      b: 'cost', bTok: ['没时间', '不花时间', '零时间', '不用花', '没精力', '懒得', '没空'],
      msg: '你前面说会“长期 / 每天”投入，转头又说“不花时间”——这两句里至少有一个不是真的。先把时间账算平。'
    },
    {
      a: 'goal', aTok: ['自由', '意义', '热爱', '开心', '快乐', '自我', '幸福'],
      b: 'cost', bTok: ['疏远', '吵架', '孤独', '分手', '得罪', '关系', '朋友', '家人', '伴侣', '团队', '社交'],
      msg: '你要的终点是“自由 / 意义”，代价却是关系——这自由里可能藏着你还没算的孤独价。你确定付得起？'
    },
    {
      a: 'why', aTok: ['钱', '赚钱', '财务', '搞钱', '收入', '财富', '变现'],
      b: 'cost', bTok: ['钱', '花钱', '花', '费', '预算', '成本', '贵', '穷', '亏'],
      msg: '你说是为“钱”而做，又承认要付出“钱”——这是个可能亏本的局。你算过净收益吗，还是只想先动起来？'
    }
  ];

  var VAGUE = ['大概', '可能', '也许', '差不多', '感觉', '随便', '或许', '估计', '好像', '应该'];
  var UNKNOWN = ['不知道', '不清楚', '没想过', '没概念', '说不清', '懵', '迷', '没底'];
  var SHOULD = ['应该', '大家都', '不得不', '别人说', '父母让', '社会', '理应', '规矩', '传统'];

  // ---------- 工具 ----------
  function $(s) { return document.querySelector(s); }
  function el(id) { return document.getElementById(id); }
  function hasAny(text, arr) { for (var i = 0; i < arr.length; i++) if (text.indexOf(arr[i]) >= 0) return arr[i]; return null; }
  function hasTok(arr, toks) { for (var i = 0; i < arr.length; i++) for (var j = 0; j < toks.length; j++) if (arr[i].indexOf(toks[j]) >= 0) return true; return false; }
  function pick(arr, n) { return arr[((n % arr.length) + arr.length) % arr.length]; }

  function extractKey(text) {
    var m = text.match(/[“"『「]([^”"』」]{2,12})[”"』」]/);
    if (m) return m[1];
    var runs = text.match(/[一-龥]{2,}/g) || [];
    if (runs.length) { runs.sort(function (a, b) { return b.length - a.length; }); return runs[0]; }
    return text.slice(0, 10);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function todayStamp() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate());
  }

  // ---------- 状态 ----------
  function fresh() {
    return { stage: 0, turns: 0, log: [], mem: { why: [], how: [], cost: [], goal: [] }, finished: false, tensionsFired: [] };
  }
  function load() {
    try {
      var r = localStorage.getItem(STORE_KEY); if (!r) return null;
      var o = JSON.parse(r); if (!o || !o.log) return null;
      o.mem = o.mem || { why: [], how: [], cost: [], goal: [] };
      o.tensionsFired = o.tensionsFired || [];
      return o;
    } catch (e) { return null; }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

  var state = load() || fresh();
  var busy = false;
  var dom = {};

  // ---------- 渲染 ----------
  function appendMsg(role, text) {
    var row = document.createElement('div');
    row.className = 'soul-msg ' + role;
    if (role === 'coach') {
      var av = document.createElement('div'); av.className = 'soul-ava-sm'; av.textContent = '?';
      row.appendChild(av);
    }
    var b = document.createElement('div'); b.className = 'soul-bubble'; b.textContent = text;
    row.appendChild(b);
    dom.log.appendChild(row);
    scrollLog();
  }

  function showTyping(cb) {
    var row = document.createElement('div');
    row.className = 'soul-msg coach';
    row.innerHTML = '<div class="soul-ava-sm">?</div><div class="soul-bubble soul-typing"><span></span><span></span><span></span></div>';
    dom.log.appendChild(row);
    scrollLog();
    var delay = 480 + Math.min(900, (state.log.length % 5) * 130);
    setTimeout(function () { if (row.parentNode) row.parentNode.removeChild(row); cb(); }, delay);
  }

  function scrollLog() { dom.log.scrollTop = dom.log.scrollHeight; }

  function updateProgress() {
    if (!dom.dots) return;
    dom.dots.innerHTML = '';
    for (var i = 0; i < STAGES.length; i++) {
      var d = document.createElement('span');
      d.className = 'soul-dot' + (i === state.stage ? ' on' : (i < state.stage ? ' done' : ''));
      dom.dots.appendChild(d);
    }
    dom.stageLabel.textContent = '第 ' + (state.stage + 1) + '/' + STAGES.length + ' 问 · ' + STAGES[state.stage].label;
  }

  function renderChips(list) {
    dom.chips.innerHTML = '';
    list.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'soul-chip';
      b.textContent = c.label;
      b.addEventListener('click', function () {
        if (busy) return;
        if (c.action === 'next') { advanceStage(); return; }
        if (c.action === 'finish') { finish(); return; }
        handleUserInput(c.text);
      });
      dom.chips.appendChild(b);
    });
  }

  function genericChips() {
    return [
      { label: '举个最硬的例子', text: '举个最硬的例子。' },
      { label: '最坏会怎样', text: '最坏会怎样？' },
      { label: '和长期目标矛盾吗', text: '这和我的长期目标矛盾吗？' },
      { label: '如果重来一遍', text: '如果重来一遍，你会改哪一步？' }
    ];
  }
  function stageChips() {
    var chips = genericChips();
    if (state.turns >= 1) {
      if (state.stage < STAGES.length - 1) chips.push({ label: '进入下一段 →', action: 'next' });
      else chips.push({ label: '生成复盘摘要', action: 'finish' });
    }
    return chips;
  }

  // ---------- 诘问引擎 ----------
  function maybeTension(sid, text) {
    for (var i = 0; i < TENSIONS.length; i++) {
      var r = TENSIONS[i];
      if (r.b !== sid) continue;
      if (state.tensionsFired.indexOf(r.msg) < 0 && hasTok(state.mem[r.a], r.aTok) && hasTok([text], r.bTok)) {
        state.tensionsFired.push(r.msg);
        return r.msg;
      }
    }
    return null;
  }

  function buildCoach(text, sid) {
    var tension = maybeTension(sid, text);
    if (tension) return { text: tension };

    if (text.length < 4 || /^[\s\p{P}]+$/u.test(text)) {
      return { text: '沉默也是一种回答。是还没想清楚，还是不想在这儿说？给一个词也行。' };
    }
    var uk = hasAny(text, UNKNOWN);
    if (uk) {
      return { text: '“' + uk + '”先收着。你不知道的，到底是“做不到”，还是“不值得”？这两件事的解法完全不同。' };
    }
    var sh = hasAny(text, SHOULD);
    if (sh) {
      return { text: '你用了“' + sh + '”。这是借来的方向盘——如果这件事永远不会被任何人知道，你还会做吗？' };
    }
    var vg = hasAny(text, VAGUE);
    if (vg) {
      return { text: '你用了“' + vg + '”。“' + vg + '”是缓冲垫。把话说死一次：去掉它，你真正的判断是什么？' };
    }
    // 实打实的回答：ack + 抽取式深挖 / 第一性原理 / 最坏 / 证据 / 身体感受
    var kw = extractKey(text);
    var pool = [
      '你提到「' + kw + '」，展开说——它具体指什么？给个最硬的例子。',
      '退一步问：如果这件事的根本目的消失了，你还会用这个方法吗？方法有没有变成目的本身？',
      '最坏会怎样？如果全力做却彻底失败，你真正失去的是什么？',
      '你凭什么觉得会这样——是见过别人如此，还是只是希望如此？',
      '说这些的时候，你身体哪个部位是紧的？我们在回避什么？'
    ];
    return { text: pick(pool, state.turns) };
  }

  function isSubstantive(text) { return text.length >= 4 && !/^[\s\p{P}]+$/u.test(text); }

  function handleUserInput(raw) {
    var text = (raw || '').trim();
    if (!text || busy) return;
    appendMsg('user', text);
    state.log.push({ r: 'user', t: text });
    var sid = STAGES[state.stage].id;
    if (isSubstantive(text)) state.mem[sid].push(text);
    state.turns++;
    save();
    coachReply(sid);
  }

  function coachReply(sid) {
    busy = true; setSending(true);
    var resp = buildCoach(state.log[state.log.length - 1].t, sid);
    showTyping(function () {
      appendMsg('coach', resp.text);
      state.log.push({ r: 'coach', t: resp.text });
      renderChips(stageChips());
      updateProgress();
      save();
      busy = false; setSending(false);
    });
  }

  function advanceStage() {
    if (state.stage >= STAGES.length - 1) { finish(); return; }
    state.stage++; state.turns = 0; save();
    var stage = STAGES[state.stage];
    var opener = (state.stage > 0 ? STAGES[state.stage - 1].bridge : '') + stage.q;
    appendMsg('coach', opener);
    state.log.push({ r: 'coach', t: opener });
    renderChips(stageChips());
    updateProgress();
    scrollLog(); save();
  }

  // ---------- 复盘摘要 ----------
  function collectTensions() {
    var out = [];
    TENSIONS.forEach(function (r) {
      if (hasTok(state.mem[r.a], r.aTok) && hasTok(state.mem[r.b], r.bTok) && out.indexOf(r.msg) < 0) out.push(r.msg);
    });
    return out;
  }

  function buildSummary() {
    var date = new Date().toLocaleString('zh-CN');
    function block(id) {
      var arr = state.mem[id];
      return arr.length ? arr.slice(-2).join('\n') : '（这段你沉默了，或没给出实质回答。）';
    }
    var tensions = collectTensions();
    var tline = tensions.length ? tensions.join('\n') : '这一轮没有发现明显的自相矛盾——但别高兴太早，答案会随你下一秒的选择改写。';
    var closing = tensions.length
      ? '你答完了，却也暴露了裂缝。裂缝不是失败，是还能长进的地方。去动，别只动嘴。'
      : '你答完了。答案会随你下一秒的选择改写。去动，别只动嘴。';
    return '# 灵魂拷问 · 复盘摘要\n生成时间：' + date + '\n\n' +
      '## 1. 为什么做（动机）\n' + block('why') + '\n\n' +
      '## 2. 打算怎么做（路径）\n' + block('how') + '\n\n' +
      '## 3. 要付出什么（代价）\n' + block('cost') + '\n\n' +
      '## 4. 达到什么目的（终点）\n' + block('goal') + '\n\n' +
      '## 拷问者看到的张力\n' + tline + '\n\n' +
      '## 一句收尾\n' + closing + '\n';
  }

  function renderMD(md) {
    var esc = escapeHtml(md);
    return esc.split('\n').map(function (line) {
      if (/^### /.test(line)) return '<h4>' + line.slice(4) + '</h4>';
      if (/^## /.test(line)) return '<h3>' + line.slice(3) + '</h3>';
      if (/^# /.test(line)) return '<h2>' + line.slice(2) + '</h2>';
      if (line.trim() === '') return '';
      return '<p>' + line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function finish() {
    state.finished = true; save();
    el('soulSummaryBody').innerHTML = renderMD(buildSummary());
    dom.chat.style.display = 'none';
    dom.summary.style.display = 'block';
    scrollLog();
  }

  function download(name, text) {
    try {
      var blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = name;
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); if (a.parentNode) a.parentNode.removeChild(a); }, 100);
    } catch (e) { toast('下载失败，可用「复制」'); }
  }

  function toast(m) {
    var t = el('soulToast'); if (!t) return;
    t.textContent = m; t.classList.add('on');
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('on'); }, 2200);
  }

  // ---------- 会话启动 ----------
  function enterChat(restoreOnly) {
    dom.intro.style.display = 'none';
    dom.summary.style.display = 'none';
    dom.chat.style.display = 'flex';
    if (!restoreOnly) {
      state = fresh(); save();
      var stage = STAGES[0];
      appendMsg('coach', stage.q);
      state.log.push({ r: 'coach', t: stage.q });
      renderChips(stageChips());
      updateProgress();
      save();
    } else {
      // 恢复已有记录
      dom.log.innerHTML = '';
      state.log.forEach(function (m) { appendMsg(m.r, m.t); });
      updateProgress();
      renderChips(stageChips());
    }
  }

  function setSending(on) {
    dom.send.disabled = on;
    dom.input.disabled = on;
    dom.send.classList.toggle('sending', on);
  }

  function init() {
    dom.intro = el('soulIntro');
    dom.chat = el('soulChat');
    dom.summary = el('soulSummary');
    dom.log = el('soulLog');
    dom.chips = el('soulChips');
    dom.input = el('soulInput');
    dom.send = el('soulSend');
    dom.stageLabel = el('soulStageLabel');
    dom.dots = el('soulDots');
    if (!dom.intro || !dom.chat) return; // 视图未挂载

    el('soulStart').addEventListener('click', function () {
      // 有未完成的旧对话时，开始 = 新一轮（清空）；否则直接开
      if (state.log.length && !state.finished) {
        if (!confirm('已有未完成的对话，开始会清空它，确定吗？')) return;
      }
      enterChat(false);
    });

    var resumeBtn = el('soulResume');
    if (resumeBtn) {
      if (state.log.length && !state.finished) {
        resumeBtn.style.display = '';
        resumeBtn.addEventListener('click', function () { enterChat(true); });
      } else if (state.finished) {
        resumeBtn.textContent = '查看上次复盘';
        resumeBtn.style.display = '';
        resumeBtn.addEventListener('click', function () {
          dom.intro.style.display = 'none';
          el('soulSummaryBody').innerHTML = renderMD(buildSummary());
          dom.summary.style.display = 'block';
        });
      }
    }

    el('soulReset').addEventListener('click', function () {
      if (!confirm('清空当前对话并重新开始？')) return;
      enterChat(false);
    });

    dom.send.addEventListener('click', function () { handleUserInput(dom.input.value); dom.input.value = ''; dom.input.style.height = 'auto'; });
    dom.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleUserInput(dom.input.value); dom.input.value = ''; dom.input.style.height = 'auto'; }
    });
    dom.input.addEventListener('input', function () {
      this.style.height = 'auto'; this.style.height = Math.min(140, this.scrollHeight) + 'px';
    });

    el('soulCopy').addEventListener('click', function () {
      var md = buildSummary();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).then(function () { toast('已复制到剪贴板'); }, function () { toast('复制失败，请手动选择'); });
      else toast('当前环境不支持自动复制');
    });
    el('soulDownload').addEventListener('click', function () { download('灵魂拷问-复盘-' + todayStamp() + '.md', buildSummary()); });
    el('soulAgain').addEventListener('click', function () {
      dom.summary.style.display = 'none';
      enterChat(false);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
