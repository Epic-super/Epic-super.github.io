// 动效引擎:js/motion.js
// 滚动入场 / 数字滚动 / 视差 / 光标光晕 / 卡片 3D 倾斜 / 磁吸按钮 / 打字机
// 纯原生 JS,无依赖;全部尊重 prefers-reduced-motion

(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 背景光斑 + 光标光晕注入 ---------- */
  function injectBackdrop() {
    if (document.querySelector('.bg-fx')) return;
    var fx = document.createElement('div');
    fx.className = 'bg-fx';
    fx.setAttribute('aria-hidden', 'true');
    fx.innerHTML =
      '<span class="orb orb-1"></span>' +
      '<span class="orb orb-2"></span>' +
      '<span class="orb orb-3"></span>';
    document.body.appendChild(fx);

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
  }

  /* ---------- 2. 滚动入场 ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    // 2026-11-05 修复（1.0.258）：原用 threshold:0.12 判「元素 12% 面积进入视口」。
    // 对超高区块失效——#learn-maps 放 14 张长图，手机端高 10291px = 12.2 倍视口，
    // 12% 门槛约 1235px，滚到区块中间时可见部分也远达不到 → 永远不加 .in → 整块永不显示
    //（实测：手机端该区块 opacity 恒为 0，用户看到一大片空白）。
    // 改法：threshold 设 0，靠 rootMargin 收一点点，只要元素**任一像素**进入视口即触发；
    // 超高区块自然在露头时就显示，不需要「12% 面积」这种对长内容不友好的条件。
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });

    // 兜底看门狗：若因任何原因（IO 未回调/布局抖动/后台标签页）3 秒后仍有 .reveal 未显示，
    // 直接全部置为可见 —— 内容可见性优先于动效，绝不因动画把内容锁成空白。
    setTimeout(function () {
      els.forEach(function (el) {
        if (!el.classList.contains('in') && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('in');
        }
      });
    }, 3000);
  }

  /* ---------- 3. 数字滚动 ---------- */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    function animate(el) {
      var target = parseFloat(el.dataset.count) || 0;
      var suffix = el.dataset.suffix || '';
      var dur = 1400, start = null;
      if (reduceMotion) { el.textContent = target + suffix; return; }
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        // easeOutExpo
        var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animate(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. 鼠标视差 / 光标光晕 / 卡片倾斜 ---------- */
  function initPointer() {
    if (reduceMotion) return;
    var glow = document.querySelector('.cursor-glow');
    var bumps = document.querySelectorAll('.hero-spot');
    var cards = document.querySelectorAll('.card');
    var magnets = document.querySelectorAll('.btn');
    var rafId = null;
    var mx = 0, my = 0;

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        rafId = null;
        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;
        var nx = (mx - cx) / cx;  // -1 .. 1
        var ny = (my - cy) / cy;

        if (glow) {
          glow.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
        }
        bumps.forEach(function (b, i) {
          var depth = (i + 1) * 12;
          b.style.transform = 'translate(' + (nx * depth) + 'px,' + (ny * depth) + 'px)';
        });
      });
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    // 卡片 3D 倾斜 + 扫光位置
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        var rx = (0.5 - py) * 8;
        var ry = (px - 0.5) * 8;
        card.style.transform =
          'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });

    // 磁吸按钮
    magnets.forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
        b.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = '';
      });
    });
  }

  /* ---------- 5. 打字机标题 ---------- */
  function initTypewriter() {
    var el = document.querySelector('[data-type]');
    if (!el) return;
    var text = el.dataset.type;
    if (reduceMotion) { el.textContent = text; return; }

    el.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    el.appendChild(cursor);

    var i = 0;
    function tick() {
      if (i >= text.length) return;
      cursor.insertAdjacentText('beforebegin', text.charAt(i));
      i++;
      setTimeout(tick, 70 + Math.random() * 60);
    }
    setTimeout(tick, 350);
  }

  /* ---------- 6. 顶部滚动进度条 ---------- */
  function initScrollProgress() {
    if (reduceMotion) return;
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop / max) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- 7. 技能条填充 ---------- */
  function initSkillBars() {
    var bars = document.querySelectorAll('.skill-bar i');
    if (!bars.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.classList.add('fill'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          // 依次错开填充
          Array.prototype.forEach.call(
            en.target.closest('.skills').querySelectorAll('.skill-bar i'),
            function (bar, i) {
              setTimeout(function () { bar.classList.add('fill'); }, i * 110);
            }
          );
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { io.observe(b); });
  }

  function init() {
    injectBackdrop();
    initReveal();
    initCounters();
    initPointer();
    initTypewriter();
    initScrollProgress();
    initSkillBars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();