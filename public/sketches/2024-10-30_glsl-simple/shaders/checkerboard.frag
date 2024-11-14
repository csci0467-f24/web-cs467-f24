precision highp float;

  // coordinates, given from the vertex shader, ranging from 0.0 - 1.0
  varying vec2 vTexCoord;

  void main() {

    vec2 coord = vTexCoord * 10.0;

    float state = mod(floor(coord.x) + floor(coord.y), 2.0);

    vec4 color = vec4(0.98, 0.91, 0.54, 1.0) * state 
    + vec4(0.2, 0.2, 1.0, 1.0) * (1.0 - state);

    gl_FragColor = color;
  }