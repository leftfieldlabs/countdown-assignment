import {
  BufferGeometry,
  BufferAttribute,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
} from 'three';

const VERTICES = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0];

export const createPlaneBuffer = () => {
  const geom = new BufferGeometry();
  geom.setAttribute('position', new BufferAttribute(new Float32Array(VERTICES), 3));
  return geom;
};

export const createAttribute = (nbrOfInstances, nbrOfAttributes) => {
  const attribute = new InstancedBufferAttribute(new Float32Array(nbrOfInstances * nbrOfAttributes), nbrOfAttributes);
  return attribute;
};

export default class InstancedGeom extends InstancedBufferGeometry {
  maxInstancedCount: number;
  constructor(geometry, nbrOfInstances) {
    super();
    this.maxInstancedCount = nbrOfInstances;

    // Clone the attributes
    Object.keys(geometry.attributes).forEach(key => {
      this.setAttribute(key, geometry.attributes[key].clone());
    });
    this.groups = [...geometry.groups];
    this.setIndex(geometry.getIndex());
  }

  createAttribute(name, nbrOfAttributes) {
    const attribute = createAttribute(this.maxInstancedCount, nbrOfAttributes);
    this.setAttribute(name, attribute);

    return attribute;
  }
}
