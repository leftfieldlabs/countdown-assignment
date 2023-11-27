import { Camera, Vector2, Vector3 } from 'three';

import { mousePosition } from 'store/mouseMove';

// https://github.com/Jeremboo/scribble-lab/blob/master/modules/CameraMouseControl.js
export default class CameraMouseControl {
  width = 100;
  height = 100;
  camera: Camera;
  mouseMove = new Vector2(2.5, 5);
  velocity = new Vector2(0.1, 0.1);
  lookAt = new Vector3();
  position = new Vector2();
  initialPosition = new Vector2();

  constructor(camera: Camera, { mouseMove, velocity }: { mouseMove?: Vector2, velocity?: Vector2 } = {}) {
    this.camera = camera;
    this.mouseMove = mouseMove ?? this.mouseMove;
    this.velocity = velocity ?? this.velocity;

    this.position.set(this.camera.position.x, this.camera.position.z);
    this.initialPosition.copy(this.position);

    mousePosition.subscribe(this.handleMouseMove);
  }

  handleMouseMove = ({ x, y }) => {
    this.position.x = this.initialPosition.x + ((x / this.width) - 0.5) * this.mouseMove.x;
    this.position.y = this.initialPosition.x - ((y / this.height) - 0.5) * this.mouseMove.y;
  }

  resize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
  }

  update() {
    this.camera.position.x += (this.position.x - this.camera.position.x) * this.velocity.x;
    this.camera.position.y += (this.position.y - this.camera.position.y) * this.velocity.y;
    this.camera.lookAt(this.lookAt);
  }

  dispose() {
    // TODO 2023-11-26 jeremboo:
  }
}