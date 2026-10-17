import * as THREE from 'three';
export class EnemyController{
  constructor(scene, x=0, z=0){
    this.g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({color:0x3c3a3a});
    const body = new THREE.Mesh(new THREE.BoxGeometry(.7,1.05,.42), mat); body.position.y=1.05; this.g.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.25,8,6), new THREE.MeshStandardMaterial({color:0xbca78d})); head.position.y=1.85; this.g.add(head);
    this.g.position.set(x,0,z); scene.add(this.g);
    this.hp = 6; this.max = 6; this.speed = 1.45; this.attackCd = 1.2; this.alive = true; this.hit = 0;
  }
  update(dt, player){ if(!this.alive) return; this.attackCd = Math.max(0,this.attackCd - dt);
    const delta = player.object.position.clone().sub(this.g.position); const dist = delta.length();
    if(dist>1.5){ delta.normalize(); this.g.position.add(delta.multiplyScalar(this.speed*dt)); } else { // in range
      if(this.attackCd<=0){ this._attack(player); this.attackCd = 1.2; }
    }
    if(this.hit>0){ this.hit = Math.max(0,this.hit-dt); this.g.position.y = .04; } else this.g.position.y = 0;
  }
  _attack(player){ if(!player.alive) return; player.takeDamage(12); }
  takeDamage(amount){ if(!this.alive) return; this.hp -= amount; this.hit = .12; if(this.hp<=0){ this.die(); } }
  die(){ this.alive=false; this.g.visible=false; }
}

export function spawnEnemies(scene, list){ const out=[]; for(const p of list){ out.push(new EnemyController(scene, p.x, p.z)); } return out; }
