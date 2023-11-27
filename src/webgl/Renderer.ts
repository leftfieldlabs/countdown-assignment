import { WebGLRenderer } from 'three';

export const PIXEL_RATIO = Math.min(1.6, window.devicePixelRatio); // 1.6 is normaly enought

export default class Renderer extends WebGLRenderer {
  canvas: HTMLCanvasElement;
  aspectRatio: number;

  constructor(canvas: HTMLCanvasElement) {
    super({ canvas, antialias: true, alpha: true });
    this.canvas = canvas;
    this.setPixelRatio(PIXEL_RATIO);
    this.setClearColor(0xFFFFFF, 0);
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.setSize(width, height, false);

    this.aspectRatio = width / height;
    return this.aspectRatio;
  }
}