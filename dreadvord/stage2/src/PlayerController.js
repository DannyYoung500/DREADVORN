import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class PlayerController {
  constructor(scene, input, hud) {
    this.scene = scene;
    this.input = input;
    this.hud = hud;
    this.object = new THREE.Group();
    scene.add(this.object);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(.72,1.08,.38), new THREE.MeshStandardMaterial({ color: 0x2b2f35, roughness: .9 }));
    torso.position.y = 1.26;
    this.object.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(.24,16,12), new THREE.MeshStandardMaterial({ color: 0xd8b995, roughness: .8 }));
    head.position.y = 2.02;
    this.object.add(head);

    const sword = new THREE.Mesh(new THREE.BoxGeometry(.12,1.4,.18), new THREE.MeshStandardMaterial({ color: 0xc0d0d2, metalness: .8, roughness: .2 }));
    sword.position.set(.7,1.2,-.12);
    sword.rotation.z = -0.42;
    this.object.add(sword);
    this.sword = sword;

    this.yaw = 0;
    this.health = 100;
    this.stamina = 100;
    this.attackCooldown = 0;
    this.dodgeCooldown = 0;
    this.guardActive = false;
    this.invulnerable = 0;
    this.alive = true;
    this.combo = 0;
  }

  update(dt){
    if (!this.alive) return;

    const ix = this.input.moveX;
    const iy = -this.input.moveY;
    const len = Math.hypot(ix, iy);
    const moving = len > 0.12;

    if (moving) {
      const speed = this.guardActive ? 1.7 : 4.4;
      const dx = (ix * Math.cos(this.yaw) + iy * Math.sin(this.yaw)) * speed * dt;
      const dz = (-ix * Math.sin(this.yaw) + iy * Math.cos(this.yaw)) * speed * dt;
      this.object.position.x += dx;
      this.object.position.z += dz;
      this.object.rotation.y = Math.atan2(-dx, -dz);
      this.yaw = this.object.rotation.y;
    }

    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.dodgeCooldown = Math.max(0, this.dodgeCooldown - dt);
    this.invulnerable = Math.max(0, this.invulnerable - dt);

    if (this.input.attack && this.attackCooldown <= 0 && this.stamina >= 10) {
      this.attackCooldown = 0.45;
      this.stamina = Math.max(0, this.stamina - 12);
      this.combo = (this.combo + 1) % 3;
      this.hud.flashSwing(this.combo);
      this._attackImpulse();
    }

    if (this.input.dodge && this.dodgeCooldown <= 0 && this.stamina >= 25) {
      this.dodgeCooldown = 0.55;
      this.stamina = Math.max(0, this.stamina - 25);
      this.invulnerable = 0.42;
      this.object.position.add(new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)).multiplyScalar(1.6));
    }

    this.guardActive = !!this.input.guard && this.stamina > 0;
    if (this.guardActive) {
      this.stamina = Math.max(0, this.stamina - dt * 12);
    } else if (this.attackCooldown <= 0 && this.dodgeCooldown <= 0) {
      this.stamina = Math.min(100, this.stamina + dt * 20);
    }

    if (this.health <= 0 && this.alive) {
      this.alive = false;
      this.hud.setObjective('YOU HAVE FALLEN — Rise again');
    }
  }

  _attackImpulse(){
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    this.object.position.add(forward.multiplyScalar(0.25));
    this.sword.rotation.x = -0.9;
    setTimeout(() => { this.sword.rotation.x = -0.42; }, 80);
  }

  takeDamage(amount){
    if (!this.alive) return;
    if (this.invulnerable > 0) return;
    let value = amount;
    if (this.guardActive) value *= 0.35;
    this.health = Math.max(0, this.health - value);
    this.hud.updateBars(this.health, this.stamina);
  }
}
