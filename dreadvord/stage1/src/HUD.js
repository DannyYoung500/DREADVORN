export class HUD{
  constructor(){ this.hpEl = document.getElementById('hp'); this.stEl = document.getElementById('stam'); this.obj = document.getElementById('objective'); this.msgTimer=0; this.msgEl=null; }
  setHealth(v){ if(this.hpEl) this.hpEl.style.width = v+'%'; }
  update(health, stamina){ if(this.hpEl) this.hpEl.style.width = Math.max(0,health)+'%'; if(this.stEl) this.stEl.style.width = Math.max(0,stamina)+'%'; }
  setObjective(text){ if(this.obj) this.obj.textContent = text; }
  showMessage(text, sec=3){ // transient message in objective area
    this.obj.textContent = text; this.msgTimer = sec; clearTimeout(this._t); this._t = setTimeout(()=>{ this.msgTimer=0; }, sec*1000); }
}
