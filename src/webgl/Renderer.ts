import { WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

import BaseScene from './scenes/BaseScene';
import FluidPass from './postprocessing/FluidPass';



export const PIXEL_RATIO = Math.min(1.6, window.devicePixelRatio); // 1.6 is normaly enought

export default class Renderer extends WebGLRenderer {
  canvas: HTMLCanvasElement;
  composer: EffectComposer;
  aspectRatio: number;
  renderPass: RenderPass;


  constructor(canvas: HTMLCanvasElement, scene: BaseScene) {
    super({ canvas, antialias: true, alpha: true });
    this.canvas = canvas;
    this.setPixelRatio(PIXEL_RATIO);
    this.setClearColor(0xFFFFFF, 0);
    this.composer = new EffectComposer(this);
    this.composer.setPixelRatio(PIXEL_RATIO);
    this.renderPass = new RenderPass(scene, scene.camera);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(new FluidPass());
    this.composer.addPass(new OutputPass());
  }

  setScene(scene: BaseScene) {
    this.renderPass.scene = scene;
    this.renderPass.camera = scene.camera;
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.setSize(width, height, false);
    this.composer.setSize(width, height);

    this.aspectRatio = width / height;
    return this.aspectRatio;
  }

  update = () => {
    this.composer.render();
  }
}