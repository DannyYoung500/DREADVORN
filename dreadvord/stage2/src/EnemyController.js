import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class EnemyController {
  constructor(scene, x, z, boss = false){
    this.boss = boss;
    this.object = new THREE.Group();
    scene.add(this.object);
    this.object.position.set(x, 0, z);

    const bodyMat = new THREE.MeshStandardMaterial({ color: boss ? 0x3a2b2f : 0x4a4b52, roughness: .9 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(boss ? 1.1 : 0.8, boss ? 1.7 : 1.2, 0.5), bodyMat);
    body.position.y = boss ? 1.45 : 1.1;
    this.object.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(boss ? 0.34 : 0.24, 14, 12), new THREE.MeshStandardMaterial({ color: 0xd6b799 }));
    head.position.y = boss ? 2.4 : 1.8;
    this.object.add(head);

    const sword = new THREE.Mesh(new THREE.BoxGeometry(0.12, boss ? 1.6 : 1.0, 0.18), new THREE.MeshStandardMaterial({ color: 0x8c9fab, metalness: .7, roughness: .3 }));
    sword.position.set(boss ? 0.7 : 0.54, boss ? 1.4 : 1.05, -0.15);
    sword.rotation.z = -0.42;
    this.object.add(sword);
    this.weapon = sword;

    this.hp = boss ? 18 : 8;
    this.maxHp = this.hp;
    this.alive = true;
    this.attackTimer = 0;
  }

  update(dt, player){
    if (!this.alive) return;
    this.attackTimer = Math.max(0, this.attackTimer - dt);
    const dir = player.object.position.clone().sub(this.object.position); const dist = dir.length();
    if (dist > 1.6) {
      dir.normalize();
      this.object.position.add(dir.multiplyScalar((this.boss ? 1.2 : 1.7) * dt));
      this.object.rotation.y = Math.atan2(dir.x, dir.z);
    }
  }

  takeDamage(amount){
    if (!this.alive) return;
    this.hp -= amount;
    if (this.hp <= 0) {
      this.alive = false;
      this.object.visible = false;
    }
  }
}
