Original prompt: I want to make it mobile responsive. The Challenge: FPS games are tricky on mobile because no mouse for looking around, no keyboard for WASD movement, small screen makes the HUD cramped, and performance -- Three.js 3D can be heavy on low-end phones.

## Progress

- Started mobile responsiveness pass.
- Added touch movement/look/buttons, mobile HUD breakpoints, lower mobile render pixel ratio, smaller mobile shadows, minimap resizing, and text-state hooks for testing.
- `npm run build` passes. Started Vite dev server at `http://127.0.0.1:3000/`.
- In-app mobile screenshots showed the responsive start screen and gameplay HUD. Fixed pointer-lock handling for narrow/mobile viewports and moved phone HUD elements away from bottom touch controls.

## TODO

- Browser Use became stuck on a CDP `Page.enable` timeout during the final recheck after the CSS fallback tweak, so the final screenshot after that last small positioning fallback was not captured.
- Existing asset warnings remain: missing enemy/texture assets fall back to procedural/solid materials.
