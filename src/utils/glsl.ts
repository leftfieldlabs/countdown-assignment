
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

export const horizontalTwist = `
  vec4 horizontalTwist(vec4 pos, float t) {
    float st = sin(t);
    float ct = cos(t);

    vec4 new_pos = pos;
    new_pos.z = pos.z * ct - pos.y * st;
    new_pos.y = pos.z * st + pos.y * ct;

    return(new_pos);
  }
`;