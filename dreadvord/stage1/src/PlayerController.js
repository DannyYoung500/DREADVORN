import * as THREE from 'three';
export class PlayerController{
  constructor(scene, input, hud){
    this.scene=scene; this.input=input; this.hud=hud;
    this.object = new THREE.Group(); scene.add(this.object);
    // simple placeholder body
    const body = new THREE.Mesh(new THREE.BoxGeometry(.72,1.05,.42), new THREE.MeshStandardMaterial({color:0x2d2f31})); body.position.y=1.05; this.object.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.26,8,6), new THREE.MeshStandardMaterial({color:0xd6bfa6})); head.position.y=2.02; this.object.add(head);
    this.yaw=0; this.health=100; this.stamina=100;
    this.attackCd=0; this.dodgeTime=0; this.invulnerable=0; this.guard=false; this.alive=true;
  }
  update(dt){
    if(!this.alive) return;
    // input movement (moveY is forward/back)
    let ix = this.input.moveX, iy = -this.input.moveY; // invert vertical so up = forward
    const len = Math.hypot(ix,iy);
    if(len>1){ix/=len;iy/=len}
    const moving = Math.abs(ix)+Math.abs(iy)>.05;
    if(moving && this.dodgeTime<=0){
      const speed = this.input.guard?1.8:4.2;
      const dx = (ix*Math.cos(this.yaw)+iy*Math.sin(this.yaw))*speed*dt;
      const dz = (-ix*Math.sin(this.yaw)+iy*Math.cos(this.yaw))*speed*dt;
      this.object.position.x += dx; this.object.position.z += dz;
      const moveAngle = Math.atan2(-dx,-dz); this.object.rotation.y = moveAngle; this.yaw = moveAngle;
    }

    // attacks
    this.attackCd = Math.max(0, this.attackCd - dt);
    if(this.input.attack && this.attackCd<=0 && this.stamina>=12){ this.attackCd = 0.48; this.stamina = Math.max(0,this.stamina-12); this._emitAttack(); }
    // dodge
    this.dodgeTime = Math.max(0, this.dodgeTime - dt);
    if(this.input.dodge && this.dodgeTime<=0 && this.stamina>=25){ this.stamina -= 25; this.dodgeTime = 0.38; this.invulnerable = 0.48; }
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    // guard
    this.guard = this.input.guard && this.stamina>2;
    if(this.guard){ this.stamina = Math.max(0, this.stamina - dt*10); }

    // stamina regen
    if(!this.guard && this.dodgeTime<=0 && this.attackCd<=0){ this.stamina = Math.min(100, this.stamina + dt*18); }
    if(this.stamina<10) this.hud.showMessage('Low stamina');

    // expose recent attack for combat system
    this._recentAttack = (this.attackCd>0 && this.attackCd<0.45);

    // death check
    if(this.health<=0 && this.alive){ this.alive=false; this.hud.showMessage('YOU HAVE FALLEN'); }

  }
  _emitAttack(){
    // a small impulse forward (visual)
    const forward = new THREE.Vector3(0,0,-1).applyAxisAngle(new THREE.Vector3(0,1,0), this.yaw);
    this.object.position.add(forward.multiplyScalar(0.06));
  }
  takeDamage(amount){
    if(this.invulnerable>0) return;
    if(this.guard) amount *= 0.35;
    this.health = Math.max(0, this.health - amount);
    this.hud.setHealth(this.health);
  }
}
