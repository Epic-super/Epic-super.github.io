class Player {
    constructor(x, y, color, controls, playerId) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.controls = controls;
        this.playerId = playerId;
        this.width = 24;
        this.height = 32;
        this.speed = 3;
        this.hp = 100;
        this.maxHp = 100;
        this.direction = playerId === 1 ? 1 : -1;
        this.state = 'idle';
        this.stateTimer = 0;
        this.attackCooldown = 0;
        this.defendCooldown = 0;
        this.isAttacking = false;
        this.isDefending = false;
        this.attackRange = 50;
        this.attackDamage = 10;
        this.defenseReduction = 0.7;
        this.defendDuration = 500;
        this.attackDuration = 300;
        this.invulnerable = false;
        this.invulnerableTimer = 0;
    }

    update(deltaTime, input, opponent) {
        if (this.stateTimer > 0) {
            this.stateTimer -= deltaTime;
        }

        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }

        if (this.defendCooldown > 0) {
            this.defendCooldown -= deltaTime;
        }

        if (this.invulnerableTimer > 0) {
            this.invulnerableTimer -= deltaTime;
            if (this.invulnerableTimer <= 0) {
                this.invulnerable = false;
            }
        }

        if (this.stateTimer <= 0) {
            this.state = 'idle';
            this.isAttacking = false;
            this.isDefending = false;
        }

        this.handleInput(input, opponent);
        this.updatePosition();
        this.checkBoundaries();
    }

    handleInput(input, opponent) {
        if (this.state === 'attack' || this.state === 'defend') {
            return;
        }

        let dx = 0;
        let dy = 0;

        if (input.up) dy -= 1;
        if (input.down) dy += 1;
        if (input.left) dx -= 1;
        if (input.right) dx += 1;

        if (dx !== 0 || dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;

            this.x += dx * this.speed;
            this.y += dy * this.speed;

            if (dx > 0) this.direction = 1;
            else if (dx < 0) this.direction = -1;

            this.state = 'walk';
        } else {
            this.state = 'idle';
        }

        if (input.attack && this.attackCooldown <= 0) {
            this.attack(opponent);
        }

        if (input.defend && this.defendCooldown <= 0) {
            this.defend();
        }
    }

    attack(opponent) {
        this.state = 'attack';
        this.stateTimer = this.attackDuration;
        this.attackCooldown = 500;
        this.isAttacking = true;

        const distance = Math.sqrt(
            Math.pow(this.x - opponent.x, 2) + Math.pow(this.y - opponent.y, 2)
        );

        if (distance < this.attackRange + this.width / 2 + opponent.width / 2) {
            opponent.takeDamage(this.attackDamage);
        }
    }

    defend() {
        this.state = 'defend';
        this.stateTimer = this.defendDuration;
        this.defendCooldown = 1000;
        this.isDefending = true;
    }

    takeDamage(amount) {
        if (this.invulnerable) return;

        let actualDamage = amount;
        if (this.isDefending) {
            actualDamage = Math.floor(amount * (1 - this.defenseReduction));
        }

        this.hp = Math.max(0, this.hp - actualDamage);
        this.invulnerable = true;
        this.invulnerableTimer = 500;
    }

    updatePosition() {
        if (this.x < 40) this.x = 40;
        if (this.x > 760) this.x = 760;
        if (this.y < 40) this.y = 40;
        if (this.y > 560) this.y = 560;
    }

    checkBoundaries() {
        if (this.x < 40) this.x = 40;
        if (this.x > 760) this.x = 760;
        if (this.y < 40) this.y = 40;
        if (this.y > 560) this.y = 560;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.hp = this.maxHp;
        this.state = 'idle';
        this.stateTimer = 0;
        this.attackCooldown = 0;
        this.defendCooldown = 0;
        this.isAttacking = false;
        this.isDefending = false;
        this.invulnerable = false;
        this.invulnerableTimer = 0;
    }
}