class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);
        this.inputManager = new InputManager();

        this.player1 = new Player(150, 300, '#00d4ff', null, 1);
        this.player2 = new Player(650, 300, '#ff4757', null, 2);

        this.isRunning = false;
        this.isPaused = false;
        this.winner = null;
        this.messageTimeout = null;

        this.lastTime = 0;
        this.attackEffects = [];
        this.hitEffects = [];
        this.defenseEffects = [];

        this.setupUI();
    }

    setupUI() {
        this.p1HpFill = document.getElementById('p1-hp-fill');
        this.p2HpFill = document.getElementById('p2-hp-fill');
        this.gameMessage = document.getElementById('game-message');
    }

    start() {
        this.isRunning = true;
        this.winner = null;
        this.player1.reset(150, 300);
        this.player2.reset(650, 300);
        this.updateUI();
        this.hideMessage();
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    gameLoop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        if (this.isRunning) {
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    update(deltaTime) {
        if (this.isPaused || this.winner) return;

        const input1 = this.inputManager.getPlayer1Input();
        const input2 = this.inputManager.getPlayer2Input();

        this.player1.update(deltaTime, input1, this.player2);
        this.player2.update(deltaTime, input2, this.player1);

        this.checkAttacks();
        this.checkWinCondition();
        this.updateEffects(deltaTime);
    }

    checkAttacks() {
        if (this.player1.isAttacking && this.player1.state === 'attack') {
            this.attackEffects.push({
                x: this.player1.x,
                y: this.player1.y,
                direction: this.player1.direction,
                timer: 200
            });
        }

        if (this.player2.isAttacking && this.player2.state === 'attack') {
            this.attackEffects.push({
                x: this.player2.x,
                y: this.player2.y,
                direction: this.player2.direction,
                timer: 200
            });
        }
    }

    updateEffects(deltaTime) {
        this.attackEffects = this.attackEffects.filter(effect => {
            effect.timer -= deltaTime;
            return effect.timer > 0;
        });

        this.hitEffects = this.hitEffects.filter(effect => {
            effect.timer -= deltaTime;
            return effect.timer > 0;
        });

        this.defenseEffects = this.defenseEffects.filter(effect => {
            effect.timer -= deltaTime;
            return effect.timer > 0;
        });
    }

    checkWinCondition() {
        if (this.player1.hp <= 0) {
            this.endGame('玩家2 胜利！');
        } else if (this.player2.hp <= 0) {
            this.endGame('玩家1 胜利！');
        }
    }

    endGame(message) {
        this.winner = message;
        this.showMessage(message);
        this.isRunning = false;

        setTimeout(() => {
            if (confirm('游戏结束！是否重新开始？')) {
                this.start();
            }
        }, 1500);
    }

    render() {
        this.renderer.clear();
        this.renderer.drawGrid();
        this.renderer.drawBoundaries();

        this.attackEffects.forEach(effect => {
            this.renderer.drawAttackEffect(effect.x, effect.y, effect.direction);
        });

        this.hitEffects.forEach(effect => {
            this.renderer.drawHitEffect(effect.x, effect.y);
        });

        this.defenseEffects.forEach(effect => {
            this.renderer.drawDefenseEffect(effect.x, effect.y);
        });

        this.renderer.drawMecha(this.player1);
        this.renderer.drawMecha(this.player2);

        this.updateUI();
    }

    updateUI() {
        const p1HpPercent = (this.player1.hp / this.player1.maxHp) * 100;
        const p2HpPercent = (this.player2.hp / this.player2.maxHp) * 100;

        this.p1HpFill.style.width = p1HpPercent + '%';
        this.p2HpFill.style.width = p2HpPercent + '%';
    }

    showMessage(text) {
        this.gameMessage.textContent = text;
        this.gameMessage.classList.add('show');
    }

    hideMessage() {
        this.gameMessage.classList.remove('show');
    }
}