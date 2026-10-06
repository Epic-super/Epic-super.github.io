class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.pixelScale = 4;
    }

    clear() {
        this.ctx.fillStyle = '#16213e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid() {
        this.ctx.strokeStyle = '#1f4068';
        this.ctx.lineWidth = 1;

        for (let x = 0; x < this.canvas.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.canvas.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawBoundaries() {
        this.ctx.strokeStyle = '#4a4e69';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);

        this.ctx.fillStyle = '#0f3460';
        this.ctx.fillRect(0, 0, this.canvas.width, 20);
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
        this.ctx.fillRect(0, 0, 20, this.canvas.height);
        this.ctx.fillRect(this.canvas.width - 20, 0, 20, this.canvas.height);
    }

    drawMecha(player) {
        const ctx = this.ctx;
        const x = player.x;
        const y = player.y;
        const color = player.color;
        const direction = player.direction;
        const state = player.state;

        ctx.save();
        ctx.translate(x, y);

        if (direction === -1) {
            ctx.scale(-1, 1);
        }

        const bodyColor = color;
        const darkColor = this.darkenColor(color, 30);
        const lightColor = this.lightenColor(color, 30);

        if (state === 'defend') {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.fillStyle = darkColor;
        ctx.fillRect(-12, -16, 24, 32);

        ctx.fillStyle = bodyColor;
        ctx.fillRect(-10, -14, 20, 28);

        ctx.fillStyle = lightColor;
        ctx.fillRect(-8, -12, 16, 24);

        ctx.fillStyle = '#2d3436';
        ctx.fillRect(-6, -8, 12, 12);

        ctx.fillStyle = '#00ff00';
        ctx.fillRect(-4, -6, 8, 8);

        ctx.fillStyle = darkColor;
        ctx.fillRect(-14, -10, 4, 20);
        ctx.fillRect(10, -10, 4, 20);

        if (state === 'attack') {
            ctx.fillStyle = '#ff4757';
            ctx.fillRect(14, -4, 12, 8);
        }

        ctx.restore();
    }

    drawAttackEffect(x, y, direction) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x, y);

        for (let i = 0; i < 5; i++) {
            const offsetX = direction * (20 + i * 5);
            const size = 4 - i * 0.5;
            ctx.fillStyle = `rgba(255, 71, 87, ${1 - i * 0.2})`;
            ctx.fillRect(offsetX, -size / 2, size, size);
        }

        ctx.restore();
    }

    drawHitEffect(x, y) {
        const ctx = this.ctx;
        const particles = 8;

        for (let i = 0; i < particles; i++) {
            const angle = (Math.PI * 2 / particles) * i;
            const distance = 20;
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;

            ctx.fillStyle = '#ffd700';
            ctx.fillRect(px - 2, py - 2, 4, 4);
        }
    }

    drawDefenseEffect(x, y) {
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.stroke();
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max((num >> 16) - amt, 0);
        const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
        const B = Math.max((num & 0x0000FF) - amt, 0);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min((num >> 16) + amt, 255);
        const G = Math.min((num >> 8 & 0x00FF) + amt, 255);
        const B = Math.min((num & 0x0000FF) + amt, 255);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
}