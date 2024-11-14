precision highp float;

  // x,y coordinates, given from the vertex shader
  varying vec2 vTexCoord;

  // the canvas contents, given from filter()
  uniform sampler2D tex0;
  // other useful information from the canvas
  uniform vec2 texelSize;
  uniform vec2 canvasSize;



  void main() {


		vec4 currentColor = texture2D(tex0, vTexCoord);
		float d = distance(vTexCoord, vec2(0.5));

    gl_FragColor = vec4(0.0, 
    (currentColor.b) * (0.8 - d), (currentColor.b)* d, 1.0 );
  }