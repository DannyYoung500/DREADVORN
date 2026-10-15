# DREADVORN
### When the world falls, the war begins.

DREADVORN is an in-development 3D zombie survival shooter. The first playable browser prototype targets Android phones and desktop browsers; a more advanced native Android/PC release is a longer-term goal.

## Playable prototype — current features
- 3D third-person view with a fixed follow camera
- A post-apocalyptic environment with buildings and obstacles
- Zombies that pursue and damage the player
- Shooting, enemy health, and kill counter
- Player health, escalating waves, game-over, and redeploy/restart
- Touch joystick and FIRE button for phones
- Keyboard movement (WASD or arrow keys) and Space to shoot on desktop

## Run locally
Open `index.html` in a modern browser with internet access. Three.js is loaded from a CDN, so the first load requires a connection.

## Publish with GitHub Pages
A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. In the repository settings, open **Pages** and set the build/deployment source to **GitHub Actions**. Pushes to the `main` branch will then trigger deployment. The published URL will appear in **Settings → Pages** and in the workflow run.

## Roadmap
1. Test and improve mobile controls and performance.
2. Improve player and zombie models, animation, sound, and hit feedback.
3. Add more weapons, missions, and boss encounters.
4. Evaluate the longer-term path toward a more advanced native Android/PC game.
5. Consider multiplayer only after the core single-player game is stable.

## Technology
The prototype uses JavaScript and Three.js. GitHub manages the source code. This browser prototype is a starting point, not a finished AAA game and not automatically convertible into an Unreal Engine project.

## Current status
**Playable prototype code committed; browser/device testing and GitHub Pages setup are still required.** Features may need fixes as they are tested on real phones.

## Disclaimer
DREADVORN is a working title. Check relevant trademarks, store listings, and branding conflicts before a commercial release.
