// 脚本文件：me/js/script.js（v3 · 2026-11-05 并入作战台）
// 兼容两套结构：
//   · 新（首页内嵌）：#rnd-btn/#rnd-min/#rnd-max/#rnd-out、#todo-add、#fc-card/#fc-next/#fc-prev
//   · 旧（子页 tools/）：#minNumber/#maxNumber/#randomNumberResult、#add-todo-btn、#todo-list.completed
// 两套同时存在时互不干扰：各自只在对应元素存在时绑定。

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    /* ---------- 1. Hero 淡入（旧版保留，仅在没有 motion.js 时才有意义） ---------- */
    var heroTitle = document.querySelector('#hero h2');
    var heroParagraph = document.querySelector('#hero p');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        setTimeout(function () {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    if (heroParagraph) {
        heroParagraph.style.opacity = '0';
        heroParagraph.style.transform = 'translateY(20px)';
        heroParagraph.style.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s';
        setTimeout(function () {
            heroParagraph.style.opacity = '1';
            heroParagraph.style.transform = 'translateY(0)';
        }, 100);
    }

    /* ---------- 2. 博客/杂记分类过滤（兼容 #blog-categories 旧 + #note-cats 新） ---------- */
    var catLinks = document.querySelectorAll('#blog-categories ul li a');
    var blogItems = document.querySelectorAll('.blog-post-item');
    if (catLinks.length && blogItems.length) {
        catLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                var selected = this.dataset.category;
                blogItems.forEach(function (item) {
                    item.style.display = (selected === 'all' || item.dataset.category === selected) ? '' : 'none';
                });
                catLinks.forEach(function (l) { l.classList.remove('on'); });
                this.classList.add('on');
            });
        });
    }
    var catBtns = document.querySelectorAll('#note-cats button');
    var posts = document.querySelectorAll('.notepost');
    if (catBtns.length && posts.length) {
        catBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                catBtns.forEach(function (b) { b.classList.remove('on'); });
                btn.classList.add('on');
                var c = btn.dataset.cat;
                posts.forEach(function (p) {
                    p.style.display = (c === 'all' || p.dataset.cat === c) ? '' : 'none';
                });
            });
        });
    }

    /* ---------- 3. 工具：随机数生成器（两套 ID 都支持） ---------- */
    // 3a. 新（首页内嵌）
    var rndBtn = document.getElementById('rnd-btn');
    if (rndBtn) {
        var rndMin = document.getElementById('rnd-min');
        var rndMax = document.getElementById('rnd-max');
        var rndOut = document.getElementById('rnd-out');
        rndBtn.addEventListener('click', function () {
            var min = Math.ceil(parseFloat(rndMin.value) || 0);
            var max = Math.floor(parseFloat(rndMax.value) || 100);
            if (min > max) { var t = min; min = max; max = t; }
            rndOut.textContent = Math.floor(Math.random() * (max - min + 1)) + min;
        });
    }
    // 3b. 旧（tools/random-number-generator.html 自带内联脚本，此处不重复绑定，避免双触发）

    /* ---------- 4. 工具：待办事项 ---------- */
    // 4a. 新（首页内嵌，key: rebuild-todos-v1，结构 li>span+span.todo-actions）
    var todoInput = document.getElementById('todo-input');
    var todoAdd = document.getElementById('todo-add');
    var todoList = document.getElementById('todo-list');
    if (todoAdd && todoList) {
        var KEY = 'rebuild-todos-v1';
        function loadTodos() {
            try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
        }
        function saveTodos(list) {
            try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
        }
        function renderTodos() {
            var list = loadTodos();
            todoList.innerHTML = '';
            list.forEach(function (item, i) {
                var li = document.createElement('li');
                if (item.done) li.className = 'done';
                li.innerHTML =
                    '<span>' + item.text + '</span>' +
                    '<span class="todo-actions">' +
                        '<button class="ok" data-i="' + i + '">' + (item.done ? '↩' : '✓') + '</button>' +
                        '<button class="del" data-i="' + i + '">✕</button>' +
                    '</span>';
                todoList.appendChild(li);
            });
        }
        function addTodo() {
            var text = todoInput.value.trim();
            if (!text) return;
            var list = loadTodos();
            list.push({ text: text, done: false });
            saveTodos(list);
            todoInput.value = '';
            renderTodos();
        }
        todoAdd.addEventListener('click', addTodo);
        todoInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') addTodo(); });
        todoList.addEventListener('click', function (e) {
            var btn = e.target.closest('button');
            if (!btn) return;
            var list = loadTodos();
            var i = parseInt(btn.dataset.i, 10);
            if (btn.classList.contains('del')) list.splice(i, 1);
            if (btn.classList.contains('ok')) list[i].done = !list[i].done;
            saveTodos(list);
            renderTodos();
        });
        renderTodos();
    }
    // 4b. 旧（tools/todo-list.html 自带内联脚本，key: todos）—— 不在此绑定

    /* ---------- 5. 工具：六级单词速记（首页内嵌卡片） ---------- */
    var card = document.getElementById('fc-card');
    var fcNext = document.getElementById('fc-next');
    var fcPrev = document.getElementById('fc-prev');
    var fcFlip = document.getElementById('fc-flip');
    if (card) {
        var words = [
            { w: 'abandon', m: 'v. 放弃；抛弃' },
            { w: 'capacity', m: 'n. 能力；容量' },
            { w: 'diverse', m: 'adj. 多样的' },
            { w: 'essential', m: 'adj. 必要的；本质的' },
            { w: 'fundamental', m: 'adj. 基本的' },
            { w: 'generate', m: 'v. 产生；生成' },
            { w: 'inevitable', m: 'adj. 不可避免的' },
            { w: 'justify', m: 'v. 证明…正当' },
            { w: 'maintain', m: 'v. 维持；保养' },
            { w: 'overwhelm', m: 'v. 压倒；使不知所措' },
            { w: 'perspective', m: 'n. 观点；透视' },
            { w: 'significant', m: 'adj. 重要的；显著的' }
        ];
        var idx = 0, flipped = false;
        function render() {
            var item = words[idx];
            card.innerHTML = flipped
                ? item.m + '<span class="hint">点击卡片翻回单词</span>'
                : item.w + '<span class="hint">点击卡片查看释义 · ' + (idx + 1) + ' / ' + words.length + '</span>';
        }
        card.addEventListener('click', function () { flipped = !flipped; render(); });
        if (fcNext) fcNext.addEventListener('click', function () { idx = (idx + 1) % words.length; flipped = false; render(); });
        if (fcPrev) fcPrev.addEventListener('click', function () { idx = (idx - 1 + words.length) % words.length; flipped = false; render(); });
        if (fcFlip) fcFlip.addEventListener('click', function () { flipped = !flipped; render(); });
        render();
    }
});