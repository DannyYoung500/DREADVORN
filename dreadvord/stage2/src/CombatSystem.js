export class CombatSystem {
  constructor(player, enemies) {
    this.player = player;
    this.enemies = enemies;
  }

  update(){
    if (!this.player.alive) return;
    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;
      const dist = enemy.object.position.distanceTo(this.player.object.position);
      const range = enemy.boss ? 2.8 : 1.9;
      if (dist <= range && enemy.attackTimer <= 0) {
        enemy.attackTimer = enemy.boss ? 1.2 : 0.9;
        this.player.takeDamage(enemy.boss ? 15 : 10);
      }
      if (dist <= 3.4) {
        const dir = this.player.object.position.clone().sub(enemy.object.position).normalize();
        enemy.object.position.add(dir.multiplyScalar(0.04));
      }
    }
  }

  resolvePlayerAttackEnemies(){
    if (this.player.attackCooldown > 0.1) {
      for (const enemy of this.enemies) {
        if (!enemy.alive) continue;
        const dist = enemy.object.position.distanceTo(this.player.object.position);
        if (dist < 2.8) {
          enemy.takeDamage(this.player.combo > 1 ? 4 : 3);
        }
      }
    }
  }
}
