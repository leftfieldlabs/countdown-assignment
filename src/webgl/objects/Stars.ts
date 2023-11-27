import { TetrahedronGeometry, Mesh, ShaderMaterial, Color, Vector3 } from 'three';

import { getRandomFloat } from 'utils';
import { rotate, scale } from 'utils/glsl';

import InstancedGeom from './InstancedGeom';


const starGeometry = new TetrahedronGeometry(1, 0);

const COLORS = [
  "#FCBC05",
  "#4385F5",
  "#E5443F",
  "#34A853",
];

export default class Stars extends Mesh {
  override material: ShaderMaterial;
  speed = 0;
  rotationSpeed = new Vector3();

  constructor(nbrOfStars = 300, {
    depthWrite = true,
    opacity = 0.75,
    distMin = 2,
    distMax = 10,
    rotation = 0,
    speed = 0.01,
    scaleMin = 0.03,
    scaleMax = 0.05,
  } = {}) {
    const instancedStars = new InstancedGeom(starGeometry, nbrOfStars);

    // PROPS
    const positionAttribute = instancedStars.createAttribute('_position', 3);
    const scaleAttribute = instancedStars.createAttribute('_scale', 1);
    const rotationAttribute = instancedStars.createAttribute('_rotation', 1);
    const opacityAttribute = instancedStars.createAttribute('_opacity', 1);
    const colorAttribute = instancedStars.createAttribute('_color', 3);

    for (let i = 0; i < nbrOfStars; i++) {
      const scalar = getRandomFloat(distMin, distMax);
      positionAttribute.setXYZ(
        i,
        Math.random() * Math.sign(Math.random() - 0.5) * scalar,
        Math.random() * Math.sign(Math.random() - 0.5) * scalar,
        Math.random() * Math.sign(Math.random() - 0.5) * scalar
      );
      scaleAttribute.setX(i, getRandomFloat(scaleMin, scaleMax));
      rotationAttribute.setX(i, Math.PI * Math.random() * 2);
      opacityAttribute.setX(i, Math.random() * opacity);
      const c = new Color(COLORS[Math.floor(Math.random() * COLORS.length)]);
      colorAttribute.setXYZ(i, c.r, c.g, c.b);
    }

    // Material
    const material = new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new Color('#ffffff') }
      },
      depthWrite,
      vertexShader: `
        attribute float _scale;
        attribute vec3 _position;
        attribute float _rotation;
        attribute float _opacity;
        attribute vec3 _color;

        uniform float time;

        varying float vOpacity;
        varying vec3 vColor;

        ${scale}
        ${rotate}

        void main() {
          #include <begin_vertex>

          mat4 rotationMatrix = rotate(_rotation);

          float scaleDiff = _scale * sin(_scale * 100. + time);
          mat4 scaleMatrix = scale(scaleDiff, scaleDiff, scaleDiff);

          transformed = (rotationMatrix * scaleMatrix * vec4(position, 1.0)).xyz;
          transformed += _position;

          vOpacity = _opacity;
          vColor = _color;

          #include <project_vertex>
        }
      `,
      fragmentShader: `
        uniform float opacity;
        uniform vec3 color;
        uniform float time;

        varying float vOpacity;
        varying vec3 vColor;

        void main() {
          gl_FragColor = vec4(color * vColor, vOpacity);
        }
      `,
      transparent: true
    });

    super(instancedStars, material);
    this.speed = speed;
    this.material = material;
    this.rotationSpeed.set(
      Math.random() * rotation,
      Math.random() * rotation,
      Math.random() * rotation,
    );
  }

  update = () => {
    this.rotation.x += Math.sin(this.material.uniforms.time.value) * this.rotationSpeed.x;
    this.rotation.y += Math.cos(this.material.uniforms.time.value * 0.5) * this.rotationSpeed.y;
    this.rotation.z += this.rotationSpeed.z;
    this.material.uniforms.time.value += this.speed;
  }
}
