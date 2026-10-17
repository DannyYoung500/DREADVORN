# DREADVORN
### When the world falls, the war begins.

**DREADVORN** is an in-development, third-person 3D zombie-survival shooter designed for mobile browsers first, with desktop keyboard support. This repository contains the current web prototype—not a finished commercial release or native Android APK.

## 🎮 Play the browser prototype

**[Launch DREADVORN on GitHub Pages](https://dannyyoung500.github.io/DREADVORN/)**

If the link does not load, check the repository's **Actions** tab for the latest Pages deployment, then check **Settings → Pages** for the active published URL. The first load requires an internet connection because Three.js is loaded from a CDN.

## Current prototype features

- Third-person 3D camera and post-apocalyptic environment
- Abandoned hospital landmark and outbreak-themed exploration
- Infected enemies that pursue and damage the player
- Pistol shooting, magazine and reserve ammunition, and reloading
- Scavengeable ammunition and medical supplies
- Incident-report clue introducing the hospital mystery
- Player health, game-over state, and redeployment
- Touch controls for phones: joystick, FIRE, RELOAD, and contextual INTERACT
- Desktop controls: WASD or arrow keys to move, Space to shoot, and R to reload

This is an early playable slice. Controls, performance, collision, enemy behavior, and visuals still need testing and improvement on real devices.

## How to play

### On Android / mobile browser
1. Open the Play link above in a modern browser.
2. Wait for the scene to load; keep an internet connection active.
3. Use the on-screen joystick to move and the FIRE / RELOAD buttons to fight.
4. Use INTERACT when the game presents an interaction prompt.

### On desktop
- **Move:** WASD or arrow keys
- **Shoot:** Space
- **Reload:** R

## Run locally

Open `index.html` in a modern browser with internet access. Three.js is loaded from a CDN, so the browser needs a connection to load the library.

## GitHub Pages deployment

The repository includes GitHub Actions workflows under `.github/workflows/`. To verify publishing:
1. Open the repository's **Actions** tab and inspect the latest deployment workflow.
2. Confirm it completed successfully.
3. Open **Settings → Pages** and use the published URL shown there.

The live link depends on GitHub Pages being configured and the deployment completing successfully.

## Roadmap

1. Test the browser build on Android and desktop and fix runtime issues.
2. Improve collision, cover, and navigation through the hospital.
3. Upgrade survivor and infected models, animations, sound, lighting, and hit feedback.
4. Add safehouse storage, loot persistence, additional weapons, and mission progression.
5. Evaluate a native Android/PC release after the browser gameplay loop is stable.
6. Consider multiplayer only after the single-player experience is reliable.

## Technology and scope

The current prototype uses JavaScript and Three.js. GitHub hosts the source and can publish the browser build through GitHub Pages. This prototype is not a native Android game and is not a finished AAA title; a separate native build would require additional development and device testing.

## Status

**In development.** Browser gameplay code is in the repository. A successful deployment does not guarantee that every feature works on every phone; real-device testing and fixes remain part of development.

## Disclaimer

DREADVORN is a working title. Check relevant trademarks, store listings, and branding conflicts before commercial release.
