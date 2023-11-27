import gsap from 'gsap';
import { timeLeft } from 'store/countdown';
import { Color, Object3D, ShaderMaterial } from 'three';
import { Text } from 'troika-three-text';
import { addLeadingZeros } from 'utils';
import { horizontalTwist } from 'utils/glsl';


const PROPS = {
  fontsize: 0.6,
  animateIn : {
    delay: 2,
    duration: 4,
    ease: 'elastic.out(0.4, 0.15)'
  }
};

export default class CountDown extends Object3D {
  text: Text;
  isAnimateInComplete = false;
  isAnimateClickInProgress = false;
  constructor() {
    super();

    this.text = new Text();
    this.add(this.text);

    this.text.text = "Hello World !";
    this.text.font = "https://fonts.cdnfonts.com/s/13998/ProductSans-Regular.woff";
    this.text.fontSize = PROPS.fontsize;
    this.text.lineHeight = PROPS.fontsize * 2;
    this.text.anchorX = "center";
    this.text.anchorY = -PROPS.fontsize;
    this.text.textAlign = "center";

    this.text.material = new ShaderMaterial({
      name: "FluidPass",
      uniforms: {
        twistStrength: { value: 0.8 },
        twistProgression: { value: Math.PI },
        fontColor: { value: new Color(0x202124) },
        opacity: { value: 0 }
      },
      vertexShader:`
        uniform float twistStrength;
        uniform float twistProgression;

        varying vec2 vUv;

        ${horizontalTwist}

        void main() {
          vUv = uv;

          vec4 twisted = horizontalTwist(vec4(position, 1.0), position.x * twistStrength + twistProgression);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(twisted.xyz, 1.0);
        }
      `,
      fragmentShader: `
        #include <common>

        uniform sampler2D tDiffuse;
        uniform vec3 fontColor;
        uniform float opacity;

        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(fontColor, opacity);
        }
      `
    })

    this.text.sync();

    timeLeft.subscribe(this.handleTimeLeft);

    this.animateIn();
  }

  handleTimeLeft = ({ years, days, hours, min, sec, millisec }) => {
    this.text.text = `Google I/O 2024
${addLeadingZeros(days)}:${addLeadingZeros(hours)}:${addLeadingZeros(min)}:${addLeadingZeros(sec)}`
    this.text.sync();
  }

  animateIn() {
    gsap.set(this.text.material.uniforms.opacity, { value: 1, delay: PROPS.animateIn.delay });
    gsap.to(this.text.material.uniforms.twistProgression, { value : 0, ...PROPS.animateIn })
    gsap.to(this.text.material.uniforms.twistStrength, { value : 0, ...PROPS.animateIn, onComplete: () => {
      this.isAnimateInComplete = true;
    } });
  }

  animateIDLE = () => {
    if (!this.isAnimateInComplete || this.isAnimateClickInProgress) return;
    this.isAnimateClickInProgress = true;
    gsap.to(this.text.material.uniforms.twistStrength, { value : 1, duration: 1 })
    gsap.to(this.text.material.uniforms.twistStrength, { value : 0, duration: 0.8, delay: 1.5, ease: PROPS.animateIn.ease, onComplete: () => {
      this.isAnimateClickInProgress = false;
    } });
  }

  update() {
    if (Math.random() < 0.003) {
      this.animateIDLE();
    }
    // this.text.material.uniforms.twistProgression.value += 0.1;
  }
}