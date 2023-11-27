import {  } from 'three';
import BaseScene from './BaseScene';
import Cube from 'webgl/objects/Cube';

export default class MainScene extends BaseScene {
  cube: Cube;

  createObjects(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cube = new Cube();
      this.add(this.cube);
      resolve();
    })
  }

  update(delta: number): void {
    super.update(delta);
    this.cube?.update();
  }
}