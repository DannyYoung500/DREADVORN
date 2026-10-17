import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { SaveManager } from './SaveManager.js';
import { Input } from './Input.js';
import { PlayerController } from './PlayerController.js';
import { EnemyController } from './EnemyController.js';
import { CombatSystem } from './CombatSystem.js';
import { HUD } from './HUD.js';

export class Game {
  constructor(opts = {}){
    this.mount = opts.mount || document.body;
    this.save = new SaveManager();
    this.input = new Input();
    this.hud = new HUD();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0d12);
    this.scene.fog = new THREE.Fog(0x0a0d12, 22, 90);
    this.camera = new THREE.PerspectiveCamera(58, innerWidth/innerHeight, .1, 200);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.renderer.setSize(innerWidth, innerHeight);
    this.mount.appendChild(this.renderer.domElement);

    this.paused = false;
    this.enemies = [];
    this.buildWorld();
    this.player = new PlayerController(this.scene, this.input, this.hud);
    this.player.object.position.set(0,0,6);
    this.player.hud = this.hud;
    this.player.updateBars = () => this.hud.updateBars(this.player.health, this.player.stamina);
    this.player.takeDamage = (amount) => {
      if (!this.player.alive) return;
      if (this.player.invulnerable > 0) return;
      const reduced = this.player.guardActive ? amount * 0.35 : amount;
      this.player.health = Math.max(0, this.player.health - reduced);
      this.hud.updateBars(this.player.health, this.player.stamina);
    };
    this.spawnWave();
    this.combat = new CombatSystem(this.player, this.enemies);
    this.hud.setCounters(this.enemies.filter(e => e.alive).length, 0);
    this.hud.setObjective('MISSION: ENTER THE RUINED GATE');
  }

  buildWorld(){
    this.scene.add(new THREE.HemisphereLight(0xb2c6de, 0x171a1d, 1.6));
    const sun = new THREE.DirectionalLight(0xffdca8, 1.3); sun.position.set(-12,16,8); this.scene.add(sun);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshStandardMaterial({ color: 0x2d2a2f, roughness: 1 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const gate = new THREE.Mesh(new THREE.BoxGeometry(8, 7, 1.5), new THREE.MeshStandardMaterial({ color: 0x434348, roughness: .9 }));
    gate.position.set(0, 3.5, -23);
    this.scene.add(gate);

    for (let i = 0; i < 14; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8 + Math.random() * 0.9, 0), new THREE.MeshStandardMaterial({ color: 0x4b4d52, roughness: 1 }));
      rock.position.set((Math.random() - 0.5) * 40, 0.5 + Math.random() * 0.6, (Math.random() - 0.5) * 40 - 8);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      this.scene.add(rock);
    }
  }

  spawnWave(){
    const spawns = [
      { x: -4, z: -14 },
      { x: 4, z: -18 },
      { x: -10, z: -10 },
      { x: 9, z: -12 },
    ];
    this.enemies = spawns.map((p) => new EnemyController(this.scene, p.x, p.z, false));
  }

  start(){
    requestAnimationFrame(() => this._loop());
  }

  togglePause(){
    this.paused = !this.paused;
  }

  _loop(){
    requestAnimationFrame(() => this._loop());
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.paused) {
      this.input.update();
      this.player.update(dt);
      this.combat.update();
      this.combat.resolvePlayerAttackEnemies();
      this.hud.updateBars(this.player.health, this.player.stamina);
      this.hud.setCounters(this.enemies.filter(e => e.alive).length, Math.max(0, 3 - this.enemies.filter(e => e.alive).length));

      if (this.player.object.position.z < -20 && this.enemies.every(e => !e.alive)) {
        this.hud.setObjective('OBJECTIVE COMPLETE — Approaching the Fallen King');
      }
    }

    const target = this.player.object.position.clone().add(new THREE.Vector3(Math.sin(this.player.yaw) * 8, 4.3, Math.cos(this.player.yaw) * 8));
    this.camera.position.lerp(target, 0.12);
    this.camera.lookAt(this.player.object.position.x, 1.3, this.player.object.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}
