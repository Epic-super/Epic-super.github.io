// 公共组件脚本:js/components.js
// 负责注入统一的导航栏与页脚,并处理:
//  - 当前页面高亮(active 状态)
//  - 移动端汉堡菜单
//  - 暗色模式切换(localStorage 持久化,默认跟随系统)

(function () {
    'use strict';

    // 计算站点根路径:根据当前页面引用 components.js 的相对路径推断
    function getSiteRoot() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute('src') || '';
            if (/components\.js$/.test(src)) {
                var idx = src.lastIndexOf('js/');
                return idx > -1 ? src.substring(0, idx) : '';
            }
        }
        return '';
    }

    var root = getSiteRoot();

    // 导航数据:改菜单只改这里,全站生效
    var navItems = [
        { href: 'index.html',    label: '首页',     page: 'index.html' },
        { href: 'about.html',    label: '关于我',   page: 'about.html' },
        { href: 'notes.html',    label: '学习笔记', page: 'notes.html' },
        { href: 'projects.html', label: '项目展示', page: 'projects.html' },
        { href: 'blog.html',     label: '博客随笔', page: 'blog.html' },
        { href: 'tools.html',    label: '工具箱',   page: 'tools.html' },
        { href: 'contact.html',  label: '联系我',   page: 'contact.html' }
    ];

    // 当前文件名(用于高亮)
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');

    function renderHeader() {
        var navHtml = navItems.map(function (item) {
            var active = (item.page === currentPage) ? ' class="active" aria-current="page"' : '';
            return '<li><a href="' + root + item.href + '"' + active + '>' + item.label + '</a></li>';
        }).join('');

        var header = document.createElement('header');
        header.className = 'site-header';
        header.innerHTML =
            '<div class="header-inner">' +
                '<a href="' + root + 'index.html" class="site-logo">小待的个人藏宝库</a>' +
                '<button class="nav-toggle" id="nav-toggle" aria-label="切换导航菜单" aria-expanded="false">' +
                    '<span class="nav-toggle-bar"></span>' +
                    '<span class="nav-toggle-bar"></span>' +
                    '<span class="nav-toggle-bar"></span>' +
                '</button>' +
                '<nav class="main-nav" id="main-nav" aria-label="主导航">' +
                    '<ul>' + navHtml + '</ul>' +
                '</nav>' +
                '<button class="theme-toggle" id="theme-toggle" aria-label="切换明暗主题">🌙</button>' +
            '</div>';
        document.body.insertBefore(header, document.body.firstChild);

        // 汉堡菜单切换
        var toggle = document.getElementById('nav-toggle');
        var nav = document.getElementById('main-nav');
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    function renderFooter() {
        var year = new Date().getFullYear();
        var footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = '<p>&copy; ' + year + ' 小待的个人藏宝库. 保留所有权利.</p>';
        document.body.appendChild(footer);
    }

    // 暗色模式
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    function initTheme() {
        var stored = null;
        try { stored = localStorage.getItem('theme'); } catch (e) { /* 隐私模式等场景 */ }
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(stored || (prefersDark ? 'dark' : 'light'));

        var btn = document.getElementById('theme-toggle');
        btn.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
        });

        // 系统主题变化时,若用户未手动设置过,则跟随
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
                if (!localStorage.getItem('theme')) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    function init() {
        renderHeader();
        renderFooter();
        initTheme();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
