export class CombatSystem{
  constructor(scene, player){ this.scene = scene; this.player = player; }
  processAttacks(enemies){
    // when player has recent attack window, test nearby enemies
    if(this.player._recentAttack){
      const ppos = this.player.object.position;
      for(const e of enemies){ if(!e.alive) continue; const d = e.g.position.distanceTo(ppos); if(d < 3.2){ e.takeDamage(3); } }
    }
    // enemies don't have weapon colliders; damage applied in enemy._attack
  }
}
