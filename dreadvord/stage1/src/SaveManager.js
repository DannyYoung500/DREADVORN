export class SaveManager{
  constructor(){ this.key = 'dreadvord_stage1_v1'; }
  save(state){ try{ localStorage.setItem(this.key, JSON.stringify(state)); }catch(e){ console.warn('save failed',e); } }
  load(){ try{ const s=localStorage.getItem(this.key); return s?JSON.parse(s):null; }catch(e){return null;} }
}
