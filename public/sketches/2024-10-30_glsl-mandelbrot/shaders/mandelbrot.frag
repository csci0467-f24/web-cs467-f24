
precision highp float;

// coordinates, given from the vertex shader, ranging from 0.0 - 1.0
varying vec2 vTexCoord;

// the canvas contents, given from filter()
uniform sampler2D tex0;

// other useful information from the canvas
uniform vec2 texelSize;
uniform vec2 canvasSize;


uniform float scale;
uniform vec2 center;


const int maxIterations = 300;


/*
Helper function for converting from HSB to RGB
*/
float h1(float v, float hue, float sat, float val){
  float k = mod(v + hue / 60.0, 6.0); 
  return val - val * sat * max(0.0, min(k, min(4.0 - k, 1.0)));
}


/* 
Determine the color for an input value.
This is basically treating the value as a hue and deriving the RGB value that would correspond to that color with full saturation and brightness.
*/
vec4 toColor(float value) {
  if (value <= 0.0) {
    return vec4(0.0, 0.0, 0.0, 1.0);
  }
  float r = h1(5.0, value * 3000.0, 1.0, 1.0);
  float g = h1(3.0, value * 3000.0, 1.0, 1.0);
  float b = h1(1.0, value * 3000.0, 1.0, 1.0);

  return vec4(r, g, b, 1.0);
}


void main() {
    vec2 coord = (vTexCoord -0.5) * scale + center;

    int iterations = 0;
    vec2 z = vec2(0.0, 0.0);

    for (int i = 0; i < maxIterations;i++){
        if (length(z) >= 2.0) {
            break;
        }
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + coord;
        iterations++;
    }

    vec4 color =  toColor(1.0 - float(iterations) / float(maxIterations));
    gl_FragColor = color;
}