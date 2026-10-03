export class InputManager {
  constructor() {
    this.keys = {};
    this.mouse = {
      movementX: 0,
      movementY: 0,
      buttons: {}
    };
    this.touch = {
      enabled: window.matchMedia('(hover: none), (pointer: coarse), (max-width: 760px)').matches,
      moveX: 0,
      moveY: 0,
      lookX: 0,
      lookY: 0,
      activeLookId: null,
      lastLookX: 0,
      lastLookY: 0
    };

    this.setupEventListeners();
    this.setupTouchControls();
  }

  setupEventListeners() {
    // Keyboard
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouse.movementX = e.movementX || 0;
      this.mouse.movementY = e.movementY || 0;
    });

    // Mouse buttons
    document.addEventListener('mousedown', (e) => {
      this.mouse.buttons[e.button] = true;
    });

    document.addEventListener('mouseup', (e) => {
      this.mouse.buttons[e.button] = false;
    });

    document.addEventListener('contextmenu', (e) => {
      if (this.touch.enabled || this.isMouseButtonPressed(2)) {
        e.preventDefault();
      }
    });
  }

  setupTouchControls() {
    const movePad = document.getElementById('touch-move-pad');
    const moveStick = document.getElementById('touch-move-stick');
    const lookZone = document.getElementById('touch-look-zone');

    if (!movePad || !moveStick || !lookZone) return;

    const setTouchButton = (selector, onPress, onRelease = onPress) => {
      const button = document.querySelector(selector);
      if (!button) return;

      const press = (event) => {
        event.preventDefault();
        button.classList.add('is-active');
        onPress(true);
      };
      const release = (event) => {
        event.preventDefault();
        button.classList.remove('is-active');
        onRelease(false);
      };

      button.addEventListener('pointerdown', press);
      button.addEventListener('pointerup', release);
      button.addEventListener('pointercancel', release);
      button.addEventListener('pointerleave', release);
    };

    let movePointerId = null;
    const updateMove = (event) => {
      const rect = movePad.getBoundingClientRect();
      const radius = rect.width / 2;
      const centerX = rect.left + radius;
      const centerY = rect.top + radius;
      const rawX = event.clientX - centerX;
      const rawY = event.clientY - centerY;
      const distance = Math.hypot(rawX, rawY);
      const clampedDistance = Math.min(distance, radius);
      const angle = Math.atan2(rawY, rawX);
      const visualX = Math.cos(angle) * clampedDistance;
      const visualY = Math.sin(angle) * clampedDistance;

      this.touch.moveX = distance > 8 ? visualX / radius : 0;
      this.touch.moveY = distance > 8 ? visualY / radius : 0;
      moveStick.style.transform = `translate(calc(-50% + ${visualX}px), calc(-50% + ${visualY}px))`;
    };

    const resetMove = () => {
      movePointerId = null;
      this.touch.moveX = 0;
      this.touch.moveY = 0;
      moveStick.style.transform = 'translate(-50%, -50%)';
    };

    movePad.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      movePointerId = event.pointerId;
      movePad.setPointerCapture(event.pointerId);
      updateMove(event);
    });
    movePad.addEventListener('pointermove', (event) => {
      if (event.pointerId === movePointerId) {
        event.preventDefault();
        updateMove(event);
      }
    });
    movePad.addEventListener('pointerup', resetMove);
    movePad.addEventListener('pointercancel', resetMove);

    lookZone.addEventListener('pointerdown', (event) => {
      if (this.touch.activeLookId !== null) return;
      event.preventDefault();
      this.touch.activeLookId = event.pointerId;
      this.touch.lastLookX = event.clientX;
      this.touch.lastLookY = event.clientY;
      lookZone.setPointerCapture(event.pointerId);
    });
    lookZone.addEventListener('pointermove', (event) => {
      if (event.pointerId !== this.touch.activeLookId) return;
      event.preventDefault();
      this.touch.lookX += event.clientX - this.touch.lastLookX;
      this.touch.lookY += event.clientY - this.touch.lastLookY;
      this.touch.lastLookX = event.clientX;
      this.touch.lastLookY = event.clientY;
    });
    const resetLook = (event) => {
      if (event.pointerId === this.touch.activeLookId) {
        this.touch.activeLookId = null;
      }
    };
    lookZone.addEventListener('pointerup', resetLook);
    lookZone.addEventListener('pointercancel', resetLook);

    setTouchButton('[data-touch-action="shoot"]', (pressed) => {
      this.mouse.buttons[0] = pressed;
    });
    setTouchButton('[data-touch-action="ads"]', (pressed) => {
      this.mouse.buttons[2] = pressed;
    });
    setTouchButton('[data-touch-action="reload"]', (pressed) => {
      this.keys.KeyR = pressed;
    });
    setTouchButton('[data-touch-action="run"]', (pressed) => {
      this.keys.ShiftLeft = pressed;
    });
    setTouchButton('[data-touch-action="jump"]', (pressed) => {
      this.keys.Space = pressed;
    });
  }

  isKeyPressed(code) {
    return this.keys[code] || false;
  }

  isMouseButtonPressed(button) {
    return this.mouse.buttons[button] || false;
  }

  getMouseMovement() {
    const movement = {
      x: this.mouse.movementX + this.touch.lookX,
      y: this.mouse.movementY + this.touch.lookY
    };
    // Reset after reading
    this.mouse.movementX = 0;
    this.mouse.movementY = 0;
    this.touch.lookX = 0;
    this.touch.lookY = 0;
    return movement;
  }

  getMovementVector() {
    return {
      x: this.touch.moveX,
      y: this.touch.moveY
    };
  }

  isTouchEnabled() {
    return this.touch.enabled;
  }
}
