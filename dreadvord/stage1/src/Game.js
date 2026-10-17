import * as THREE from 'three';
import {Input} from './Input.js';
import {PlayerController} from './PlayerController.js';
import {EnemyController, spawnEnemies} from './EnemyController.js';
import {CombatSystem} from './CombatSystem.js';
import {HUD} from './HUD.js';
import {SaveManager} from './SaveManager.js';

export class Game{
  constructor(opts={}){
    this.mount = opts.mount || document.body;
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0b0d10, 10, 80);
    this.camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, .1, 200);
    this.renderer = new THREE.WebGLRenderer({antialias:false});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));
    this.renderer.setSize(innerWidth, innerHeight);
    this.mount.appendChild(this.renderer.domElement);

    this.input = new Input();
    this.hud = new HUD();
    this.save = new SaveManager();

    this.player = new PlayerController(this.scene, this.input, this.hud);
    this.combat = new CombatSystem(this.scene, this.player);
    this.enemies = [];

    this.paused = false;
    this._bind();
    this._buildWorld();
  }

  _bind(){
    addEventListener('resize',()=>{this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();this.renderer.setSize(innerWidth,innerHeight)});
  }

  _buildWorld(){
    const hemi = new THREE.HemisphereLight(0xb9cde0, 0x241f20, 1.2); this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffe6c2,1.6); sun.position.set(-8,20,6); sun.castShadow=false; this.scene.add(sun);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(120,120), new THREE.MeshStandardMaterial({color:0x2b2d2f,roughness:1})); ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; this.scene.add(ground);

    // simple ruined gate landmark
    const gate = new THREE.Mesh(new THREE.BoxGeometry(8,6,1.8), new THREE.MeshStandardMaterial({color:0x3b3b3b})); gate.position.set(0,3,-22); this.scene.add(gate);

    // player initial position
    this.player.object.position.set(0,0,6);

    // spawn enemies
    this.enemies = spawnEnemies(this.scene, [{x:-3,z:-18},{x:3,z:-20}]);

    this.hud.setObjective('MISSION: ENTER THE RUINED GATE — Reach the castle gate');
  }

  start(){
    this.clock.startTime = performance.now();
    this.last = 0;
    this._loop();
  }

  togglePause(){
    this.paused = !this.paused;
  }

  _loop(){
    requestAnimationFrame(()=>this._loop());
    const dt = Math.min(this.clock.getDelta(), .05);
    if(!this.paused){
      this.input.update(dt);
      this.player.update(dt);
      for(const e of this.enemies) e.update(dt, this.player);
      this.combat.processAttacks(this.enemies);
      this.hud.update(this.player.health, this.player.stamina);
      // check objective
      if(!this._completed && this.player.object.position.z < -20){ this._completed = true; this.hud.showMessage('Objective complete — Press PAUSE to continue'); }
    }
    // camera follow
    const camTarget = this.player.object.position.clone().add(new THREE.Vector3(Math.sin(this.player.yaw)*8,4,Math.cos(this.player.yaw)*8));
    this.camera.position.lerp(camTarget, 1-Math.pow(.001,dt));
    this.camera.lookAt(this.player.object.position.x,1.4,this.player.object.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}
