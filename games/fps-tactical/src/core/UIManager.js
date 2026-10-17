export class UIManager {
  constructor() {
    this.healthFill = document.getElementById('health-fill');
    this.ammoCounter = document.getElementById('ammo-counter');
    this.weaponName = document.getElementById('weapon-name');
    this.damageOverlay = document.getElementById('damage-overlay');
    this.deathScreen = document.getElementById('death-screen');
    this.levelCompleteScreen = document.getElementById('level-complete-screen');
    this.gameCompleteScreen = document.getElementById('game-complete-screen');
    this.pauseScreen = document.getElementById('pause-screen');
    this.crosshair = document.getElementById('crosshair');
    this.audioStatus = document.getElementById('audio-status');
    
    // Mini-map setup
    this.minimap = document.getElementById('minimap');
    this.minimapCtx = this.minimap.getContext('2d');
    this.resizeMinimap();
    this.minimapScale = 1.5; // World units per pixel
  }

  resizeMinimap() {
    const size = window.matchMedia('(max-width: 760px), (hover: none) and (pointer: coarse)').matches ? 112 : 300;
    this.minimap.width = size;
    this.minimap.height = size;
  }

  update(player, enemies = []) {
    // Update health bar
    const healthPercent = (player.health / player.maxHealth) * 100;
    this.healthFill.style.width = healthPercent + '%';

    // Update ammo counter
    const weapon = player.getCurrentWeapon();
    if (weapon) {
      this.ammoCounter.textContent = `${weapon.currentAmmo} / ${weapon.reserveAmmo}`;
      this.weaponName.textContent = weapon.name.toUpperCase();
    }

    // Update crosshair based on ADS
    if (player.isADS) {
      this.crosshair.style.opacity = '0';
    } else {
      this.crosshair.style.opacity = '0.7';
    }
    
    // Update mini-map
    this.updateMinimap(player, enemies);
  }
  
  updateMinimap(player, enemies) {
    const ctx = this.minimapCtx;
    const width = this.minimap.width;
    const height = this.minimap.height;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // Map world coordinates to screen coordinates
    // Show absolute positions with scaling
    const worldScale = 2.0; // Units per pixel
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Convert world position to screen position
    const worldToScreen = (worldPos) => {
      return {
        x: centerX + (worldPos.x / worldScale),
        y: centerY + (worldPos.z / worldScale)
      };
    };
    
    // Draw enemies (color-coded by state)
    enemies.forEach(enemy => {
      if (enemy.isAlive) {
        const screenPos = worldToScreen(enemy.position);
        
        // Only draw if on screen
        if (screenPos.x >= 0 && screenPos.x <= width && screenPos.y >= 0 && screenPos.y <= height) {
          // State-based coloring: hold=green, alert=yellow, chase/shoot=red
          let color = '#ff0000'; // Default red for chase/shoot
          let glowColor = 'rgba(255, 0, 0, 0.5)';
          
          if (enemy.state === 'hold' || enemy.state === 'idle') {
            color = '#00ff00'; // Green - dormant
            glowColor = 'rgba(0, 255, 0, 0.4)';
          } else if (enemy.state === 'alert') {
            color = '#ffaa00'; // Orange/yellow - alert
            glowColor = 'rgba(255, 170, 0, 0.5)';
          } else if (enemy.state === 'patrol') {
            color = '#ff8800'; // Orange - patrol
            glowColor = 'rgba(255, 136, 0, 0.4)';
          }
          
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(screenPos.x, screenPos.y, 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(screenPos.x, screenPos.y, 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    });
    
    // Draw player position
    const playerScreen = worldToScreen(player.position);
    
    // Draw player direction indicator
    ctx.save();
    ctx.translate(playerScreen.x, playerScreen.y);
    ctx.rotate(player.yaw);
    
    // Direction arrow
    ctx.fillStyle = '#00aaff';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(4, 4);
    ctx.lineTo(0, 0);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
    // Draw player (blue dot)
    ctx.fillStyle = '#00aaff';
    ctx.beginPath();
    ctx.arc(playerScreen.x, playerScreen.y, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Add player glow
    ctx.strokeStyle = 'rgba(0, 170, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(playerScreen.x, playerScreen.y, 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  updateAudioStatus(audioManager) {
    if (!audioManager || !audioManager.context) {
      this.audioStatus.textContent = '🔇 Audio: Not initialized';
      this.audioStatus.style.color = '#ff0000';
      return;
    }

    const state = audioManager.context.state;
    if (state === 'running') {
      this.audioStatus.textContent = '🔊 Audio: Active';
      this.audioStatus.style.color = '#00ff00';
    } else if (state === 'suspended') {
      this.audioStatus.textContent = '🔇 Audio: Click to activate';
      this.audioStatus.style.color = '#ffaa00';
    } else {
      this.audioStatus.textContent = '🔇 Audio: ' + state;
      this.audioStatus.style.color = '#ff0000';
    }
  }

  showDamageEffect() {
    this.damageOverlay.style.opacity = '1';
    setTimeout(() => {
      this.damageOverlay.style.opacity = '0';
    }, 200);
  }

  showDeathScreen() {
    this.deathScreen.style.display = 'flex';
  }

  hideDeathScreen() {
    this.deathScreen.style.display = 'none';
  }

  showLevelCompleteScreen(level, enemiesKilled) {
    const levelStats = document.getElementById('level-stats');
    const points = enemiesKilled * 100;
    levelStats.textContent = `Level ${level} Complete!\nEnemies Defeated: ${enemiesKilled}\nPoints: ${points}`;
    this.levelCompleteScreen.style.display = 'flex';
  }

  hideLevelCompleteScreen() {
    this.levelCompleteScreen.style.display = 'none';
  }

  showGameCompleteScreen() {
    this.gameCompleteScreen.style.display = 'flex';
  }

  hideGameCompleteScreen() {
    this.gameCompleteScreen.style.display = 'none';
  }

  showPauseScreen() {
    this.pauseScreen.style.display = 'flex';
  }

  hidePauseScreen() {
    this.pauseScreen.style.display = 'none';
  }
}
