// src/research-hub.js — 科研专区（从 app-main.js IIFE 迁出，ESM + window 桥接）
// 数据命名空间 wb_sjtu_research_v1（与 zk-ky.html 共用，实时互通），独立于主 state。
// helper 经 window.WBUtil 收口（esc/toast/$/openModal/closeModals/uid/today/daysTo），
// 由 app-main.js 在 IIFE 末尾挂出；store 经 window.store（lib/store.js）。
const U = window.WBUtil || {};
const store = window.store;

const RS_ST = {
  topic: ['构思中','进行中','投稿中','已发表','搁置'],
  paper: ['待读','在读','已读'],
  sub:   ['构思','撰写中','投稿中','已录用','已拒稿']
};

let RS = { topics: [], papers: [], subs: [] };
let _impRS = null;

function loadRS() {
  try {
    var o = store.getLegacy('wb_sjtu_research_v1', null);
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      o.topics = o.topics || [];
      o.papers = o.papers || [];
      o.subs = o.subs || [];
      return o;
    }
  } catch (e) {}
  return { topics: [], papers: [], subs: [] };
}
function saveRS() {
  try { store.setLegacy('wb_sjtu_research_v1', RS); }
  catch (e) { U.toast('科研数据保存失败：本地存储可能已满'); }
}
function renderResearchHub() {
  if (!document.getElementById('rsStatHub')) return;
  var tN = RS.topics.length, tActive = RS.topics.filter(function (x) { return x.st === '进行中'; }).length;
  var pRead = RS.papers.filter(function (x) { return x.st === '已读'; }).length;
  var sActive = RS.subs.filter(function (x) { return x.st === '投稿中'; }).length;
  document.getElementById('rsStatHub').innerHTML =
    '<div class="st"><b>' + tN + '</b><span>课题总数</span></div>' +
    '<div class="st"><b style="color:var(--green)">' + tActive + '</b><span>进行中</span></div>' +
    '<div class="st"><b style="color:var(--navy)">' + pRead + '</b><span>已读论文</span></div>' +
    '<div class="st"><b style="color:var(--amber)">' + sActive + '</b><span>投稿中</span></div>';

  document.getElementById('topicBoxHub').innerHTML = RS.topics.length ? RS.topics.map(function (x) {
    return '<div class="cs' + (x.st === '进行中' ? ' plan' : '') + (x.st === '已发表' ? ' pass' : '') + '">' +
      '<div class="cn">' + U.esc(x.name) + '</div>' +
      (x.dir ? '<div class="cc">方向：' + U.esc(x.dir) + '</div>' : '') +
      '<div class="cr"><span class="tag ' + (x.st === '进行中' ? 'k8' : x.st === '已发表' ? 'ok' : x.st === '搁置' ? 'el' : 'zk') + '">' + x.st + '</span></div>' +
      '<select onchange="setTopicSt(\'' + x.id + '\',this.value)">' +
        RS_ST.topic.map(function (o) { return '<option' + (x.st === o ? ' selected' : '') + '>' + o + '</option>'; }).join('') +
      '</select>' +
      '<div class="plink" style="justify-content:space-between"><span style="font-size:11px;color:var(--muted)">更新 ' + U.esc(x.upd || '') + '</span>' +
      '<button class="xbtn" onclick="delTopic(\'' + x.id + '\')" aria-label="删除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>' +
    '</div>';
  }).join('') : '<div class="empty">还没有课题，点「+ 新建课题」开始你的研究</div>';

  var pn = RS.papers.length, pu = RS.papers.filter(function (x) { return x.st !== '已读'; }).length;
  var psEl = document.getElementById('paperStatHub'); if (psEl) psEl.textContent = '共 ' + pn + ' 篇 · 待读 ' + pu;
  document.getElementById('paperBoxHub').innerHTML = RS.papers.length ? '<ul class="tl">' + RS.papers.map(function (x) {
    return '<li class="ti' + (x.st === '已读' ? ' dn' : '') + '">' +
      '<button class="ck' + (x.st === '已读' ? ' on' : '') + '" onclick="togglePaper(\'' + x.id + '\')" aria-label="标记已读"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></button>' +
      '<div class="tb"><div class="tt">' + U.esc(x.title) + '</div>' +
      '<div class="tm"><span class="tag ' + (x.st === '已读' ? 'ok' : x.st === '在读' ? 'k8' : 'el') + '">' + x.st + '</span>' +
      (x.author ? '<span>' + U.esc(x.author) + '</span>' : '') +
      (x.url ? '<a href="' + U.esc(x.url) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">链接 →</a>' : '') +
      '<button class="btn sm" style="padding:3px 9px;min-height:28px;font-size:11.5px" onclick="cyclePaper(\'' + x.id + '\')">切换状态</button>' +
      '<button class="xbtn" onclick="delPaper(\'' + x.id + '\')" aria-label="删除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div></div></li>';
  }).join('') + '</ul>' : '<div class="empty">文献清单是空的，把要看的论文加进来</div>';

  document.getElementById('subBoxHub').innerHTML = RS.subs.length ? RS.subs.map(function (x) {
    var dl = x.due ? U.daysTo(x.due) : null;
    var dlTxt = (typeof dl === 'number' && !isNaN(dl)) ? (dl < 0 ? '已截止' : dl + ' 天') : '无截止';
    return '<div class="cs' + (x.st === '投稿中' ? ' plan' : '') + (x.st === '已录用' ? ' pass' : '') + '">' +
      '<div class="cn">' + U.esc(x.name) + '</div>' +
      (x.venue ? '<div class="cc">' + U.esc(x.venue) + '</div>' : '') +
      '<div class="cr"><span class="tag ' + (x.st === '投稿中' ? 'k8' : x.st === '已录用' ? 'ok' : x.st === '已拒稿' ? 'el' : 'zk') + '">' + x.st + '</span>' +
      (x.due ? '<span class="tag ' + (dl < 0 ? 'od' : ' el') + '">' + dlTxt + '</span>' : '') + '</div>' +
      '<select onchange="setSubSt(\'' + x.id + '\',this.value)">' +
        RS_ST.sub.map(function (o) { return '<option' + (x.st === o ? ' selected' : '') + '>' + o + '</option>'; }).join('') +
      '</select>' +
      (x.due ? '<div class="plink"><span style="font-size:11px;color:var(--muted)">截止 ' + U.esc(x.due) + '</span></div>' : '') +
      '<div class="plink" style="justify-content:flex-end"><button class="xbtn" onclick="delSub(\'' + x.id + '\')" aria-label="删除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>' +
    '</div>';
  }).join('') : '<div class="empty">还没有投稿 / 会议计划</div>';
}
/* 动态 modal（兼容双线 openM/closeM 写法） */
function openM(h) { var b = U.$("#modalDynBody"); if (!b) return; b.innerHTML = h; U.openModal("modalDyn"); }
function closeM() { U.closeModals(); }
function addTopic() {
  openM('<h3>新建课题</h3>' +
    '<div class="field"><label>课题名称</label><input type="text" id="tName" placeholder="例：基于图神经网络的代码缺陷检测"></div>' +
    '<div class="field"><label>研究方向</label><input type="text" id="tDir" placeholder="例：软件工程 / AI4SE"></div>' +
    '<div class="modal-actions"><button class="btn ghost" data-close>取消</button><button class="btn primary" onclick="doAddTopic()">创建</button></div>');
  setTimeout(function () { var e = document.getElementById('tName'); if (e) e.focus(); }, 50);
}
function doAddTopic() {
  var n = document.getElementById('tName').value.trim(); if (!n) { U.toast('填个课题名'); return; }
  RS.topics.unshift({ id: U.uid(), name: n, dir: document.getElementById('tDir').value.trim(), st: '构思中', upd: U.today() });
  saveRS(); closeM(); renderResearchHub(); U.toast('已添加课题');
}
function setTopicSt(id, v) { var x = RS.topics.filter(function (t) { return t.id === id; })[0]; if (x) { x.st = v; x.upd = U.today(); saveRS(); renderResearchHub(); } }
function delTopic(id) { RS.topics = RS.topics.filter(function (t) { return t.id !== id; }); saveRS(); renderResearchHub(); }
function addPaper() {
  openM('<h3>加论文</h3>' +
    '<div class="field"><label>论文标题</label><input type="text" id="pTi" placeholder="例：Attention Is All You Need"></div>' +
    '<div class="field"><label>作者 / 来源</label><input type="text" id="pAu" placeholder="例：Vaswani et al. 2017"></div>' +
    '<div class="field"><label>链接（arXiv / 期刊页，可选）</label><input type="text" id="pUrl" placeholder="https://..."></div>' +
    '<div class="modal-actions"><button class="btn ghost" data-close>取消</button><button class="btn primary" onclick="doAddPaper()">添加</button></div>');
  setTimeout(function () { var e = document.getElementById('pTi'); if (e) e.focus(); }, 50);
}
function doAddPaper() {
  var t = document.getElementById('pTi').value.trim(); if (!t) { U.toast('填个标题'); return; }
  RS.papers.unshift({ id: U.uid(), title: t, author: document.getElementById('pAu').value.trim(), url: document.getElementById('pUrl').value.trim(), st: '待读' });
  saveRS(); closeM(); renderResearchHub(); U.toast('已加入清单');
}
function togglePaper(id) { var x = RS.papers.filter(function (p) { return p.id === id; })[0]; if (x) { x.st = (x.st === '已读' ? '待读' : '已读'); saveRS(); renderResearchHub(); } }
function cyclePaper(id) { var x = RS.papers.filter(function (p) { return p.id === id; })[0]; if (x) { var i = RS_ST.paper.indexOf(x.st); x.st = RS_ST.paper[(i + 1) % RS_ST.paper.length]; saveRS(); renderResearchHub(); } }
function delPaper(id) { RS.papers = RS.papers.filter(function (p) { return p.id !== id; }); saveRS(); renderResearchHub(); }
function addSub() {
  openM('<h3>加投稿 / 会议</h3>' +
    '<div class="field"><label>名称</label><input type="text" id="sName" placeholder="例：ICSE 2027 投稿"></div>' +
    '<div class="field"><label>会议 / 期刊</label><input type="text" id="sVen" placeholder="例：ICSE / TSE"></div>' +
    '<div class="field"><label>截止日期（可选）</label><input type="date" id="sDue"></div>' +
    '<div class="modal-actions"><button class="btn ghost" data-close>取消</button><button class="btn primary" onclick="doAddSub()">添加</button></div>');
  setTimeout(function () { var e = document.getElementById('sName'); if (e) e.focus(); }, 50);
}
function doAddSub() {
  var n = document.getElementById('sName').value.trim(); if (!n) { U.toast('填个名称'); return; }
  RS.subs.unshift({ id: U.uid(), name: n, venue: document.getElementById('sVen').value.trim(), due: document.getElementById('sDue').value || '', st: '构思' });
  saveRS(); closeM(); renderResearchHub(); U.toast('已添加');
}
function setSubSt(id, v) { var x = RS.subs.filter(function (s) { return s.id === id; })[0]; if (x) { x.st = v; saveRS(); renderResearchHub(); } }
function delSub(id) { RS.subs = RS.subs.filter(function (s) { return s.id !== id; }); saveRS(); renderResearchHub(); }
function exportRS() {
  var blob = new Blob([JSON.stringify(RS, null, 2)], { type: 'application/json' });
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = '科研专区备份_' + U.today() + '.json'; a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000); U.toast('科研数据已导出');
}
function importRS(inp) {
  var f = inp.files[0]; if (!f) return; var r = new FileReader();
  r.onload = function () {
    try {
      var o = JSON.parse(r.result); if (!o || typeof o !== 'object') throw 0;
      o.topics = o.topics || []; o.papers = o.papers || []; o.subs = o.subs || [];
      openM('<h3>确认导入科研数据</h3><p style="color:var(--muted);font-size:13px;margin:0 0 14px">将用备份覆盖当前科研数据：课题 ' + o.topics.length + '、论文 ' + o.papers.length + '、投稿 ' + o.subs.length + '。当前科研数据会被替换，确定吗？</p><div class="modal-actions"><button class="btn ghost" data-close>取消</button><button class="btn primary" onclick="doImportRS()">确认导入</button></div>');
      _impRS = o;
    } catch (e) { U.toast('文件格式不对，请选择本专区导出的 JSON'); }
  };
  r.readAsText(f);
}
function doImportRS() { RS = _impRS; saveRS(); closeM(); renderResearchHub(); U.toast('科研数据导入完成'); }

export function initResearchHub() {
  RS = loadRS();
  // 桥接 window，兼容 index.html 内联 onclick 与跨标签同步
  window.renderResearchHub = renderResearchHub;
  window.openM = openM; window.closeM = closeM;
  window.addTopic = addTopic; window.doAddTopic = doAddTopic;
  window.setTopicSt = setTopicSt; window.delTopic = delTopic;
  window.addPaper = addPaper; window.doAddPaper = doAddPaper;
  window.togglePaper = togglePaper; window.cyclePaper = cyclePaper; window.delPaper = delPaper;
  window.addSub = addSub; window.doAddSub = doAddSub;
  window.setSubSt = setSubSt; window.delSub = delSub;
  window.exportRS = exportRS; window.importRS = importRS; window.doImportRS = doImportRS;
}
