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
    ease: 'elastic.out(0.4, 0.2)'
  }
};

export default class CountDown extends Object3D {
  text: Text;
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
        fontColor: { value: new Color(0xBCBCBC) }
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

        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(fontColor, 1.);
        }
      `
    })

    this.text.sync();

    timeLeft.subscribe(this.handleTimeLeft);

    this.animateIn();
  }

  handleTimeLeft = ({ years, days, hours, min, sec, millisec }) => {
    this.text.text = `${addLeadingZeros(days)} Days
${addLeadingZeros(hours)}:${addLeadingZeros(min)}:${addLeadingZeros(sec)}`
    this.text.sync();
  }

  animateIn() {
    gsap.to(this.text.material.uniforms.twistProgression, { value : 0, ...PROPS.animateIn })
    gsap.to(this.text.material.uniforms.twistStrength, { value : 0, ...PROPS.animateIn })


  }

  update() {
    // this.text.material.uniforms.twistProgression.value += 0.1;

  }
}