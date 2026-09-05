window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);

    game.start();

    console.log('像素风机甲对战游戏已启动！');
    console.log('玩家1: WASD移动, J攻击, K防御');
    console.log('玩家2: 方向键移动, 1攻击, 2防御');
});