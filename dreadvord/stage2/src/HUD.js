export class HUD {
  constructor(){
    this.hp = document.getElementById('hp');
    this.stam = document.getElementById('stam');
    this.objective = document.getElementById('objective');
    this.enemyCount = document.getElementById('enemyCount');
    this.souls = document.getElementById('souls');
  }

  updateBars(health, stamina){
    this.hp.style.width = `${Math.max(0, health)}%`;
    this.stam.style.width = `${Math.max(0, stamina)}%`;
  }

  setObjective(text){
    this.objective.textContent = text;
  }

  flashSwing(combo){
    const label = combo === 0 ? 'FIRST BLOOD' : combo === 1 ? 'CHAIN' : 'FINISH';
    this.objective.textContent = `COMBO: ${label}`;
    clearTimeout(this._comboTimer);
    this._comboTimer = setTimeout(() => {
      this.objective.textContent = 'MISSION: ENTER THE RUINED GATE';
    }, 320);
  }

  setCounters(live, souls){
    this.enemyCount.textContent = String(live);
    this.souls.textContent = String(souls);
  }
}
