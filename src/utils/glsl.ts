
export const rotate = `
  mat4 rotate(float rot){
    return mat4(
      vec4(cos(rot), -sin(rot), 0.0, 0.0),
      vec4(sin(rot), cos(rot), 0.0, 0.0),
      vec4(0.0, 0.0, 1.0, 0.0),
      vec4(0.0, 0.0, 0.0, 1.0)
    );
  }
`;

// https://gist.github.com/patriciogonzalezvivo/986341af1560138dde52
export const scale = `
  mat4 scale(float x, float y, float z){
    return mat4(
      vec4(x,   0.0, 0.0, 0.0),
      vec4(0.0, y,   0.0, 0.0),
      vec4(0.0, 0.0, z,   0.0),
      vec4(0.0, 0.0, 0.0, 1.0)
    );
  }
`;