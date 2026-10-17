# DREADVORD — The Fallen Kingdom

Landscape-first mobile 3D dark-fantasy action prototype built with Three.js.

## Run
Open `index.html` in a static web server or publish the folder to a static host. Three.js modules are loaded from jsDelivr.

## Mobile controls
- Rotate device to landscape; the page attempts to request landscape orientation where the browser allows it.
- Left virtual joystick moves the knight.
- Drag the open right side of the screen to turn the camera.
- ATTACK damages nearby enemies.
- DODGE spends stamina and briefly grants invulnerability.
- GUARD reduces incoming damage at a stamina cost.
- LOCK toggles target-lock UI state.

## Prototype limitations
This is an early playable prototype, not a finished commercial game. It uses procedural enemy/scene meshes and optionally loads the Shadow Knight GLB from the published build. More animation, collision refinement, audio, and Android packaging remain future work.
