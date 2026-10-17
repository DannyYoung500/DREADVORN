export class Input{
  constructor(){
    this.moveX=0; this.moveY=0; this.attack=false; this.dodge=false; this.guard=false;
    this._setupUI();
    this._keys={};
    this._bindKeys();
  }
  _setupUI(){
    const stickArea=document.getElementById('stickArea'), stick=document.getElementById('stick');
    let pointer=null; const centerR=()=>stickArea.getBoundingClientRect();
    const set=(e)=>{const r=centerR();let dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);const max=r.width*.34;const len=Math.hypot(dx,dy)||1;if(len>max){dx=dx/len*max;dy=dy/len*max;}stick.style.transform=`translate(${dx}px,${dy}px)`;this.moveX=dx/max;this.moveY=dy/max;};
    stickArea.addEventListener('pointerdown',(e)=>{pointer=e.pointerId;stickArea.setPointerCapture(pointer);set(e)});
    stickArea.addEventListener('pointermove',(e)=>{if(e.pointerId===pointer) set(e)});
    const reset=()=>{pointer=null;stick.style.transform='translate(0,0)';this.moveX=0;this.moveY=0;};
    stickArea.addEventListener('pointerup',reset);stickArea.addEventListener('pointercancel',reset);

    // buttons
    document.getElementById('attack').addEventListener('pointerdown',()=>this.attack=true); document.getElementById('attack').addEventListener('pointerup',()=>this.attack=false);
    document.getElementById('dodge').addEventListener('pointerdown',()=>this.dodge=true); document.getElementById('dodge').addEventListener('pointerup',()=>this.dodge=false);
    document.getElementById('guard').addEventListener('pointerdown',()=>this.guard=true); document.getElementById('guard').addEventListener('pointerup',()=>this.guard=false);
    document.getElementById('pause').addEventListener('pointerdown',()=>{/* handled externally */});
  }
  _bindKeys(){
    addEventListener('keydown',e=>{this._keys[e.key.toLowerCase()]=true;});
    addEventListener('keyup',e=>{this._keys[e.key.toLowerCase()]=false;});
  }
  update(dt){
    // keyboard WASD fallback
    const ix = (this._keys['d']?1:0)-(this._keys['a']?1:0); const iy=(this._keys['s']?1:0)-(this._keys['w']?1:0);
    if(Math.abs(ix)+Math.abs(iy)>0.01){ this.moveX = ix; this.moveY = iy; }
  }
}
