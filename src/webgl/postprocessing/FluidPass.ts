import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

import { mousePosition } from 'store/mouseMove';
import { Vector2 } from "three";
import { drawRadialGradient } from "utils/glsl";
import { PIXEL_RATIO } from "webgl/Renderer";

const PROPS = {
  velocity: 0.05,
}


// TODO 2023-11-27 jeremboo: Create a CustomPass extends ShaderPass with resolution, tDiffuse...
// TODO 2023-11-26 jeremboo: Implement https://github.com/oframe/ogl/blob/master/examples/post-fluid-distortion.html
export default class FluidPass extends ShaderPass {
  targetedMousePosition = new Vector2()
  mouseDirection = new Vector2();

  constructor() {
    super({
      name: "FluidPass",
      uniforms: {
        tDiffuse: { value: null },
        tResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        tMousePosition: { value: new Vector2() },
        tMouseDirection: { value: new Vector2() },
        tMouseStrength: { value: 0 },
        tMouseScale: { value: 0.002 },
      },
      vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        #include <common>

        uniform sampler2D tDiffuse;
        uniform vec2 tResolution;
        uniform vec2 tMousePosition;
        uniform vec2 tMouseDirection;
        uniform float tMouseStrength;
        uniform float tMouseScale;

        varying vec2 vUv;

        ${drawRadialGradient}

        void main() {
          float distance = drawRadialGradient(tMousePosition, gl_FragCoord.xy, tMouseScale);
          vec2 directionalDistance = vec2(
            distance * tMouseDirection.x,
            distance * tMouseDirection.y
          );

          vec2 customUv = vUv + tMouseStrength * directionalDistance * 0.001;
          vec4 texel = texture2D(tDiffuse, customUv);
          // texel.xyz += distance * tMouseStrength * 10.;
          gl_FragColor = texel;
        }
      `
    });

    mousePosition.subscribe(this.handleMouseMove);
  }

  handleMouseMove = ({ x, y }) => {
    // TODO 2023-11-27 jeremboo: Refactor here to put that in the store. It's also used in the CameraMouseControl
    this.targetedMousePosition.set(x * PIXEL_RATIO, (window.innerHeight - y) * PIXEL_RATIO);
  }

  resize(width: number, height: number) {
    this.material.uniforms.tResolution.value.x = width;
    this.material.uniforms.tResolution.value.y = height;
  }

  update() {

    // Position
    this.mouseDirection.x = this.material.uniforms.tMousePosition.value.x -this.targetedMousePosition.x;
    this.mouseDirection.y = this.material.uniforms.tMousePosition.value.y - this.targetedMousePosition.y;
    this.material.uniforms.tMousePosition.value.x -= this.mouseDirection.x * PROPS.velocity
    this.material.uniforms.tMousePosition.value.y -= this.mouseDirection.y * PROPS.velocity

    // Direction
    this.material.uniforms.tMouseDirection.value.copy(this.mouseDirection);


    // Strength
    const magnitude = Math.min(1.0, this.mouseDirection.length() * 0.0000015);
    this.material.uniforms.tMouseStrength.value = Math.min(1, this.material.uniforms.tMouseStrength.value + magnitude);
    this.material.uniforms.tMouseStrength.value *= 0.98;
  }
}