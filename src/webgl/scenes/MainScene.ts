import {  } from 'three';
import BaseScene from './BaseScene';
import Cube from 'webgl/objects/Cube';
import Stars from 'webgl/objects/Stars';
import CountDown from 'webgl/objects/Countdown';
import gsap from 'gsap';

export default class MainScene extends BaseScene {
  cube: Cube;
  stars: Stars;

  createObjects(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cube = new Cube();
      this.add(this.cube);

      this.stars = new Stars(500, { scalarMin: 8, scalarMax: 10, rotation: 0, opacity: 1, speed: 0.01 });
      this.add(this.stars);

      this.countdown = new CountDown();
      this.add(this.countdown);

      resolve();
    })
  }

  update(delta: number): void {
    super.update(delta);
    this.cube?.update();
    this.stars?.update();
    this.countdown?.update();
  }
  }
}