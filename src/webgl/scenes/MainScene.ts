import { Vector3 } from 'three';
import BaseScene from './BaseScene';
import Cube from 'webgl/objects/Cube';
import Stars from 'webgl/objects/Stars';
import CountDown from 'webgl/objects/Countdown';
import gsap from 'gsap';
import { Scenes } from 'webgl';

export default class MainScene extends BaseScene {
  cube: Cube;
  stars: Stars;
  countdown: CountDown;

  constructor(sceneId: Scenes) {
    super(sceneId, { cameraPosition: new Vector3(0, 5, 20) })
  }

  createObjects(): Promise<void> {
    return new Promise((resolve, reject) => {
      // this.cube = new Cube();
      // this.add(this.cube);

      this.stars = new Stars(500, { distMin: 8, distMax: 12, scaleMax: 0.15, rotation: 0, opacity: 1, speed: 0.01 });
      this.add(this.stars);

      this.countdown = new CountDown();
      this.add(this.countdown);

      resolve();
    });
  }

  update(delta: number): void {
    super.update(delta);
    this.cube?.update();
    this.stars?.update();
    this.countdown?.update();
  }

  animateIn() {
    const gsapProps = {
      duration: 3, ease: 'power2.inOut'
    }
    gsap.to(this.cameraMouseControl.initialPosition, { y: 0, ...gsapProps, onUpdate: () => {
      this.cameraMouseControl.handleMouseMove(this.cameraMouseControl.mousePosition)
    } })
    gsap.to(this.camera.position, { z: 5, ...gsapProps })
  }
}