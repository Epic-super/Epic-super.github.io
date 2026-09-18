class InputManager {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.key] = true;
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.key] = false;
        });
    }

    isPressed(key) {
        return this.keys[key.toLowerCase()] || this.keys[key];
    }

    getPlayer1Input() {
        return {
            up: this.isPressed('w'),
            down: this.isPressed('s'),
            left: this.isPressed('a'),
            right: this.isPressed('d'),
            attack: this.isPressed('j'),
            defend: this.isPressed('k')
        };
    }

    getPlayer2Input() {
        return {
            up: this.isPressed('arrowup'),
            down: this.isPressed('arrowdown'),
            left: this.isPressed('arrowleft'),
            right: this.isPressed('arrowright'),
            attack: this.isPressed('1'),
            defend: this.isPressed('2')
        };
    }
}