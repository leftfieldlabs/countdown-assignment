import { BoxGeometry, Mesh, MeshStandardMaterial } from "three"

const SPEED = 0.001;

export default class Cube extends Mesh {

  constructor() {
    super(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ color: 0x00ffff }));
  }

  update() {
    this.rotation.x += SPEED;
    this.rotation.y += SPEED;
  }
}