import { Camera, Vector2, Vector3 } from 'three';

import { mousePosition } from 'store/mouseMove';
import pane from './pane';

// https://github.com/Jeremboo/scribble-lab/blob/master/modules/CameraMouseControl.js
export default class CameraMouseControl {
  width = window.innerWidth;
  height = window.innerHeight;
  camera: Camera;
  mouseMove = new Vector2(2.5, 5);
  velocity = new Vector2(0.1, 0.1);
  lookAt = new Vector3();
  mousePosition = new Vector2()
  position = new Vector2();
  initialPosition = new Vector2();
  idleRotation = new Vector2();
  speed = new Vector2(0.05, 0.025);
  idleStrength = 0.5;
  t = 0;

  constructor(camera: Camera, { mouseMove, velocity, speed }: { mouseMove?: Vector2, velocity?: Vector2, speed?: Vector2 } = {}) {
    this.camera = camera;
    this.mouseMove = mouseMove ?? this.mouseMove;
    this.velocity = velocity ?? this.velocity;
    this.speed = speed ?? this.speed;

    this.position.set(this.camera.position.x, this.camera.position.y);
    this.initialPosition.copy(this.position);

    mousePosition.subscribe(this.handleMouseMove);

    pane.addBinding(this.mouseMove, 'x', { min: 0, max: 5, label: "parallaxX" }).on('change', () => this.handleMouseMove());
    pane.addBinding(this.mouseMove, 'y', { min: 0, max: 5, label: "parallaxY" }).on('change', () => this.handleMouseMove());
  }

  handleMouseMove = ({ x, y } = this.mousePosition) => {
    this.mousePosition.set(x, y);
    this.position.x = this.initialPosition.x + ((this.mousePosition.x / this.width) - 0.5) * this.mouseMove.x;
    this.position.y = this.initialPosition.y - ((this.mousePosition.y / this.height) - 0.5) * this.mouseMove.y;
  }

  resize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
    this.handleMouseMove(this.mousePosition)
  }

  update() {
    this.t += 0.1;
    this.idleRotation.x = Math.sin(this.t * this.speed.x) * this.idleStrength;
    this.idleRotation.y = Math.sin(this.t * this.speed.y) * this.idleStrength;
    this.camera.position.x += (this.position.x - this.idleRotation.x - this.camera.position.x) * this.velocity.x;
    this.camera.position.y += (this.position.y - this.idleRotation.y - this.camera.position.y) * this.velocity.y;
    this.camera.lookAt(this.lookAt);
  }

  dispose() {
    // TODO 2023-11-26 jeremboo:
  }
}