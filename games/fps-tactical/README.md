# Urban Warfare - Browser-Based FPS Game

A fully-featured first-person shooter game built entirely with Three.js and vanilla JavaScript. Play directly in your browser - no downloads required!

🎮 **[Play Live Demo](https://sammintah.github.io/urban-warfare/)**

<img width="1694" height="984" alt="Screenshot 2026-05-18 at 4 07 46 PM" src="https://github.com/user-attachments/assets/35bc4a56-d903-4e53-a038-3342cacbd05d" />

## Features

- **3D Graphics** - Built with Three.js and WebGL
- **Smart AI Enemies** - Tactical behavior including hunting, flanking, and cover-seeking
- **3 Progressive Levels** - Increasing difficulty from 5 to 18 enemies
- **Real-time Mini-map** - Track enemy positions and navigate the battlefield
- **Smooth Controls** - WASD movement, mouse look, and responsive shooting
- **Dynamic Audio** - Procedural gunshot sounds and background music
- **Physics System** - Custom collision detection and bullet physics

## Controls

- **WASD** - Move
- **Mouse** - Look around
- **Left Click** - Shoot
- **Right Click** - Aim down sights (ADS)
- **R** - Reload
- **Shift** - Run

## Tech Stack

- **Three.js** - 3D rendering engine
- **JavaScript (ES6+)** - Game logic and AI
- **Vite** - Build tool and dev server
- **WebGL** - Hardware-accelerated graphics
- **Web Audio API** - Sound system

## Game Mechanics

### Enemy AI
- Detection and pursuit system
- Tactical positioning and flanking
- Cover-seeking when low on health
- Reload and ammunition management
- Squad-based behavior

### Level System
- **Level 1**: 5 enemies (Easy)
- **Level 2**: 10 enemies (Medium)
- **Level 3**: 18 enemies (Hard)

### Player Stats
- Health: 150 HP
- Weapons: M4A1 Rifle & Glock Pistol
- Spawn position: Edge of city for tactical advantage

## Installation & Development

```bash
# Clone the repository
git clone https://github.com/yourusername/urban-warfare-fps.git

# Navigate to project
cd urban-warfare-fps

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
├── src/
│   ├── core/          # Core game systems
│   │   ├── Game.js
│   │   ├── AudioManager.js
│   │   ├── PhysicsManager.js
│   │   └── UIManager.js
│   ├── entities/      # Game entities
│   │   ├── Player.js
│   │   └── Enemy.js
│   ├── weapons/       # Weapon system
│   │   ├── Weapon.js
│   │   └── Bullet.js
│   ├── world/         # Map and environment
│   │   └── MapBuilder.js
│   └── effects/       # Visual effects
│       └── BloodEffect.js
├── public/            # Static assets
│   ├── models/        # 3D models
│   └── background.jpg
└── index.html         # Entry point
```

## Performance

- Runs at 60 FPS on modern browsers
- Optimized collision detection
- Efficient particle systems
- Shadow mapping for realistic lighting

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with WebGL support

## Future Enhancements

- [ ] More weapons and weapon switching
- [ ] Multiplayer support
- [ ] Additional maps
- [ ] Power-ups and health packs
- [ ] Leaderboard system
- [ ] Mobile touch controls

## Credits

Built by [Your Name]

## License

MIT License - Feel free to use this project for learning and portfolio purposes.

---

⭐ Star this repo if you enjoyed the game!
