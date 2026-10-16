# DREADVORN
### When the world falls, the war begins.

DREADVORN is an in-development 3D zombie survival shooter. The first playable browser prototype targets Android phones and desktop browsers; a more advanced native Android/PC release is a longer-term goal.

## Playable prototype — current features
- 3D third-person view with a fixed follow camera
- A post-apocalyptic district with an abandoned hospital landmark
- Zombies that pursue and damage the player; the current slice uses a persistent outbreak rather than arcade waves
- Finite pistol magazine, reserve ammunition, reloading, enemy health, and infected counter
- Scavengeable ammunition and medical supplies
- An incident-report clue that introduces the hospital mystery
- Player health, game-over, and redeploy at the starting safehouse area
- Touch joystick, FIRE, RELOAD, and contextual INTERACT buttons for phones
- Keyboard movement (WASD or arrow keys), Space to shoot, and R to reload on desktop

## Run locally
Open `index.html` in a modern browser with internet access. Three.js is loaded from a CDN, so the first load requires a connection.

## Publish with GitHub Pages
A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. In the repository settings, open **Pages** and set the build/deployment source to **GitHub Actions**. Pushes to the `main` branch will then trigger deployment. The published URL will appear in **Settings → Pages** and in the workflow run.

## Roadmap
1. Verify the current slice in mobile browsers and fix any runtime issues.
2. Add real collision, cover, and a more navigable hospital interior.
3. Improve survivor and infected models, animation, sound, and hit feedback.
4. Add safehouse storage, recovered-loot persistence, more weapons, and mission progression.
5. Evaluate the longer-term path toward a more advanced native Android/PC game; multiplayer comes only after the single-player loop is stable.

## Technology
The prototype uses JavaScript and Three.js. GitHub manages the source code. This browser prototype is a starting point, not a finished AAA game and not automatically convertible into an Unreal Engine project.

## Current status
**Playable prototype code committed; browser/device testing and GitHub Pages setup are still required.** Features may need fixes as they are tested on real phones.

## Disclaimer
DREADVORN is a working title. Check relevant trademarks, store listings, and branding conflicts before a commercial release.
