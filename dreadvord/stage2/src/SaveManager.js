export class SaveManager {
  constructor(){ this.key = 'dreadvord_stage2_v1'; }
  save(state){ try{localStorage.setItem(this.key, JSON.stringify(state));}catch(e){console.warn('save failed', e);} }
  load(){ try{ const raw = localStorage.getItem(this.key); return raw ? JSON.parse(raw) : null; }catch(e){ return null; } }
}
