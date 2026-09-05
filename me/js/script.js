// 脚本文件：xiaodai-treasure-trove/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('小待的个人藏宝库脚本已加载！');

    // 移除旧的导航悬停效果，CSS已处理

    // Hero区域元素淡入效果
    const heroTitle = document.querySelector('#hero h2');
    const heroParagraph = document.querySelector('#hero p');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100); // 延迟一小段时间以确保过渡生效
    }

    if (heroParagraph) {
        heroParagraph.style.opacity = '0';
        heroParagraph.style.transform = 'translateY(20px)';
        heroParagraph.style.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'; // 延迟0.3秒开始
        setTimeout(() => {
            heroParagraph.style.opacity = '1';
            heroParagraph.style.transform = 'translateY(0)';
        }, 100); // 延迟一小段时间以确保过渡生效
    }

    // 可以在这里添加更多的交互功能
    // 例如：
    // - 响应式导航菜单的切换 (如果需要更复杂的逻辑)
    // - 图片轮播
    // - 表单验证
    // - AJAX内容加载
    // - 更高级的滚动动画

    // 博客分类过滤功能
    const categoryLinks = document.querySelectorAll('#blog-categories ul li a');
    const blogPostItems = document.querySelectorAll('.blog-post-item');

    if (categoryLinks.length > 0 && blogPostItems.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // 阻止链接的默认跳转行为

                const selectedCategory = this.dataset.category;

                blogPostItems.forEach(item => {
                    const itemCategory = item.dataset.category;
                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.style.display = ''; // 或者 'block', 'flex' 等，取决于您的布局
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});