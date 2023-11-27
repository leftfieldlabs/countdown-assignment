import { Scene, PerspectiveCamera, Light, AmbientLight, DirectionalLight } from 'three';
import { Scenes } from 'webgl';
import CameraMouseControl from 'webgl/utils/CameraMouseControl';

export default class BaseScene extends Scene {
  sceneId: Scenes;
  camera: PerspectiveCamera;
  cameraMouseControl: CameraMouseControl;
  lights: { [key in string]: Light } = {
    ambient: new AmbientLight(0xffffff, 0.5),
    directional: new DirectionalLight(0xffffff, 0.5)
  }

  constructor(sceneId: Scenes) {
    super();
    this.sceneId = sceneId;
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, 5);
    this.cameraMouseControl = new CameraMouseControl(this.camera);
    this.add(this.lights.ambient);
    this.add(this.lights.directional);
  }

  resize = (width: number, height: number, aspectRatio: number) => {
    this.cameraMouseControl.resize(width, height)
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    // TODO 2023-11-26 jeremboo:
  }

  // override add(...objects: Object3D<Object3DEventMap>[]) {
  //   super.add(...objects);
  //   objects.forEach(obj => this.addUpdate(obj));
  //   return this;
  // }

  // override remove(...objects: Object3D<Object3DEventMap>[]) {
  //   super.remove(...objects);
  //   // TODO 2023-11-26 jeremboo: Remove listeners
  //   return this;
  // }

  /*
   * * *******************
   * * INIT
   * * *******************
   */

  async load() {
    await this.createObjects();
  }

  createObjects(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /*
   * * *******************
   * * ANIMATION
   * * *******************
   */

  animateIn() {
    // TODO 2023-11-26 jeremboo:
  }

  animateOut() {
    // TODO 2023-11-26 jeremboo:
  }

  /*
   * * *******************
   * * UPDATE
   * * *******************
   */

  update(delta: number) {
    this.cameraMouseControl.update();
  }
}