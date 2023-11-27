import { Scene, Clock, Camera } from 'three';
import MainScene from "./scenes/MainScene";
import Renderer from './Renderer';
import BaseScene from './scenes/BaseScene';

// TODO 2023-11-26 jeremboo: Create data/enum.ts
export enum Scenes {
  Main = 'main'
}

class Webgl {
  isStarted = false;
  rafId = 0;
  renderer: Renderer;
  clock = new Clock(true);
  scenes: { [key in Scenes]: BaseScene } = {
    [Scenes.Main]: new MainScene(Scenes.Main),
  }
  currentScene: BaseScene

  constructor(canvas: HTMLCanvasElement, sceneId = Scenes.Main) {
    this.currentScene = this.scenes[sceneId];
    this.renderer = new Renderer(canvas, this.currentScene);
  }

  switchScene(sceneId: Scenes) {
    // TODO 2023-11-26 jeremboo:
  }

  resize(width: number, height: number) {
    const aspectRatio = this.renderer.resize(width, height);
    this.currentScene.resize(width, height, aspectRatio);
  }

  /*
   * * *******************
   * * LOAD
   * * *******************
   */

  async load() {
    // TODO 2023-11-26 jeremboo:
    await this.currentScene.load();
  }

  start() {
    if (this.isStarted) return
    this.isStarted = true;
    this.update();
  }

  stop() {
    if (!this.isStarted) return;
    cancelAnimationFrame(this.rafId);
    this.isStarted = false;
  }

  /*
   * * *******************
   * * UPDATE
   * * *******************
   */

  update = () => {
    const delta = this.clock.getDelta();
    this.currentScene.update(delta);

    // TODO 2023-11-26 jeremboo: Add dev mode to enable dev camera
    this.render(this.currentScene, this.currentScene.camera);

    // TODO 2023-11-26 jeremboo: Add stats

    this.rafId = requestAnimationFrame(this.update);
  }

  render(scene: Scene, camera: Camera) {
    this.renderer.update();
  }

  /*
   * * *******************
   * * DISPOSE
   * * *******************
   */

  dispose() {
      // TODO 2023-11-26 jeremboo:
  }
}

export default Webgl;