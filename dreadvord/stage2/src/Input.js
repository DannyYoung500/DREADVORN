import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class Input {
  constructor(){
    this.moveX = 0; this.moveY = 0;
    this.attack = false; this.dodge = false; this.guard = false;
    this.timeout = null;
    this._keys = {};
    this._setupTouch();
    this._bindKeys();
  }

  _setupTouch(){
    const stickArea = document.getElementById('stickArea');
    const stick = document.getElementById('stick');
    let pointerId = null;
    const setStick = (ev) => {
      const rect = stickArea.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = ev.clientX - cx;
      let dy = ev.clientY - cy;
      const max = rect.width * 0.32;
      const len = Math.hypot(dx, dy) || 1;
      if (len > max) {
        dx = (dx / len) * max;
        dy = (dy / len) * max;
      }
      stick.style.transform = `translate(${dx}px, ${dy}px)`;
      this.moveX = dx / max;
      this.moveY = dy / max;
    };

    stickArea.addEventListener('pointerdown', (e) => {
      pointerId = e.pointerId;
      stickArea.setPointerCapture(pointerId);
      setStick(e);
    });
    stickArea.addEventListener('pointermove', (e) => { if (e.pointerId === pointerId) setStick(e); });
    const resetStick = () => {
      pointerId = null;
      stick.style.transform = 'translate(-50%,-50%)';
      this.moveX = 0; this.moveY = 0;
    };
    stickArea.addEventListener('pointerup', resetStick);
    stickArea.addEventListener('pointercancel', resetStick);

    const buttons = ['attack','dodge','guard'];
    buttons.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this[id] = true;
      });
      el.addEventListener('pointerup', () => { this[id] = false; });
      el.addEventListener('pointerleave', () => { this[id] = false; });
    });
  }

  _bindKeys(){
    addEventListener('keydown', (e) => { this._keys[e.key.toLowerCase()] = true; });
    addEventListener('keyup', (e) => { this._keys[e.key.toLowerCase()] = false; });
  }

  update(){
    const keyboardX = (this._keys['d'] || this._keys['arrowright'] ? 1 : 0) - (this._keys['a'] || this._keys['arrowleft'] ? 1 : 0);
    const keyboardY = (this._keys['s'] || this._keys['arrowdown'] ? 1 : 0) - (this._keys['w'] || this._keys['arrowup'] ? 1 : 0);
    if (Math.abs(keyboardX) > 0 || Math.abs(keyboardY) > 0) {
      this.moveX = keyboardX;
      this.moveY = keyboardY;
    }
    // keyboard attacks/dodge/guard
    if (this._keys[' '] || this._keys['space']) this.attack = true;
    if (!this._keys[' '] && !this._keys['space']) this.attack = this.attack && false;
    if (this._keys['shift']) this.dodge = true;
    else this.dodge = false;
    if (this._keys['g']) this.guard = true;
    else this.guard = false;
  }
}
