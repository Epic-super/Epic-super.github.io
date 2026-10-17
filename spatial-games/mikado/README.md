# Mikado: A 3D Spatial Reasoning Game

This project is a web-based brain training game designed to test and improve 3D spatial reasoning skills. It was developed collaboratively to explore procedural generation of complex visual puzzles.

## What is this?

Mikado is a "find the match" game with a twist. Instead of static 2D images, the game presents the player with six rapidly rotating 3D figures. Five of these figures are unique, and one is a duplicate. The player's goal is to identify the two identical figures as quickly as possible.

The game is designed to be challenging. The figures are abstract, composed of a series of colored "capsules" sampled from the surface of platonic solids. As the player levels up, the figures become more complex by adding more lines, making them harder to distinguish.

## How it Works

### For pair matching

1.  **Start:** The game begins with a title screen. Tapping the screen starts some timer.

The core gameplay loop is as follows:

2.  **Matching:** The player is shown a 2x3 grid of 6 rotating figures. They must tap the two figures they believe are identical.
3.  **Scoring & Leveling:**
    - A correct match instantly advances to the next round with a new set of figures.
    - An incorrect match provides visual feedback, and the player must try again.
    - After 5 correct matches, the player "levels up."
4.  **Leveling Up:** When a player levels up, the complexity of the figures increases by adding an extra line. The 60-second timer is also reset, rewarding the player for their speed and accuracy.
5.  **Game Over:** The game ends when the 60-second timer runs out. The final score is displayed, and the player can choose to start over.
6.  **Pause:** The player can tap the timer at any point to pause the game. Tapping the pause screen resumes the game.

### For N-back

2.  **Seeding:** `N` figures are going to be shown until you are asked to answer anything.
3.  **Matching:** Once you can answer, you should remember the figure N steps before and decide if it's the same or not. You have a limited time to choose.
4.  **Leveling Up:** As above.
5.  **Game over, pause**: As above, although pause does not stop all transition timers. Assume your game might be over if you pause.

## Technologies & Acknowledgements

This prototype was built using standard web technologies, brought to life with a powerful 3D graphics library.

- **Core:** HTML5, CSS3, modern JavaScript (ES6+).
- **3D Rendering:** The excellent [three.js](https://threejs.org/) library is used for all WebGL scene management, geometry, materials, and rendering.
- **Fonts:** The game uses the [Inter](https://fonts.google.com/specimen/Inter) and [Sixtyfour](https://fonts.google.com/specimen/Sixtyfour) fonts, served by Google Fonts.
- **Development:** This game was prototyped and developed in a collaborative session with **Google's Gemini**, iterating on gameplay mechanics, visual styles, and technical implementation.
