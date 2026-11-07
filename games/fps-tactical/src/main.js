import * as THREE from 'three';
import { Game } from './core/Game.js';
import { InputManager } from './core/InputManager.js';
import { AudioManager } from './core/AudioManager.js';

// Initialize game when DOM is ready
let game = null;
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 760px)').matches;

const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');

startButton.addEventListener('click', async () => {
  startScreen.style.display = 'none';
  
  // Start background music
  const bgMusic = document.getElementById('background-music');
  if (bgMusic) {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(e => console.log('Background music autoplay blocked:', e));
  }
  
  // Initialize game first
  if (!game) {
    game = new Game();
    await game.init();
    
    game.audioManager.init();
    
    setTimeout(() => {
      console.log('Testing audio...');
      game.audioManager.play('rifle_shot', 1.0);
    }, 500);
    
    game.start();
    
    // Add click handler to canvas for pointer lock (Safari requirement)
    if (!isTouchDevice && game.renderer && game.renderer.domElement) {
      game.renderer.domElement.addEventListener('click', () => {
        if (!document.pointerLockElement && !document.webkitPointerLockElement) {
          requestPointerLock();
        }
      });
      
      requestPointerLock();
    } else {
      document.body.classList.add('playing');
    }
    
    // Make game accessible for debugging
    window.game = game;
    window.render_game_to_text = () => JSON.stringify(game.getTextState());
    window.advanceTime = (ms) => {
      if (!game || !game.isRunning || game.isPaused) return;
      const steps = Math.max(1, Math.round(ms / (1000 / 60)));
      for (let i = 0; i < steps; i++) {
        game.update(1 / 60, game.clock.getElapsedTime());
      }
      game.render();
    };
    console.log('Game started! Type "game" in console to debug.');
    console.log('Click on the game screen to lock cursor');
  }
});

// Handle pointer lock (Safari compatibility)
const pointerLockChange = () => {
  if (isTouchDevice) return;
  const canvas = game && game.renderer ? game.renderer.domElement : null;
  const isLocked = document.pointerLockElement === document.body || 
                   document.pointerLockElement === canvas ||
                   document.mozPointerLockElement === document.body ||
                   document.mozPointerLockElement === canvas ||
                   document.webkitPointerLockElement === document.body ||
                   document.webkitPointerLockElement === canvas;
  
  if (isLocked) {
    console.log('✓ Pointer locked!');
    if (game && game.isPaused) {
      game.resume();
    }
    // Force hide cursor on all browsers
    document.body.style.cursor = 'none';
    document.body.classList.add('playing');
    if (canvas) {
      canvas.style.cursor = 'none';
    }
  } else {
    console.log('✗ Pointer unlocked');
    // Don't auto-pause if we're showing a menu screen
    if (game && game.gameState === 'playing' && !game.isPaused) {
      // User pressed ESC - show pause menu
      game.togglePause();
    }
    document.body.style.cursor = 'default';
    document.body.classList.remove('playing');
  }
};

document.addEventListener('pointerlockchange', pointerLockChange);
document.addEventListener('mozpointerlockchange', pointerLockChange);
document.addEventListener('webkitpointerlockchange', pointerLockChange);

// Handle ESC key for pause menu toggle
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && game && game.isRunning && game.gameState === 'playing') {
    e.preventDefault();
    game.togglePause();
  }
});

// Pause menu buttons
document.getElementById('resume-button').addEventListener('click', () => {
  if (game) {
    game.togglePause();
  }
});

document.getElementById('quit-button').addEventListener('click', () => {
  if (game) {
    game.quitToMenu();
  }
});

document.getElementById('touch-pause-button').addEventListener('click', () => {
  if (game && game.isRunning && game.gameState === 'playing') {
    game.togglePause();
  }
});

// Request pointer lock with Safari compatibility
function requestPointerLock() {
  if (isTouchDevice) return;
  // Safari works better with canvas element instead of body
  const element = game && game.renderer ? game.renderer.domElement : document.body;
  
  // Normalize the API across browsers
  element.requestPointerLock = element.requestPointerLock ||
                                element.mozRequestPointerLock ||
                                element.webkitRequestPointerLock;
  
  if (!element.requestPointerLock) {
    console.error('❌ Pointer Lock API not available');
    return;
  }
  
  // Must be called synchronously in user event for Safari
  try {
    element.requestPointerLock();
    console.log('✓ Pointer lock requested on', element.tagName);
  } catch (error) {
    console.error('❌ Pointer lock request failed:', error);
  }
  
  // Force cursor hiding immediately (fallback for all browsers)
  document.body.classList.add('playing');
  document.body.style.cursor = 'none';
  element.style.cursor = 'none';
}
