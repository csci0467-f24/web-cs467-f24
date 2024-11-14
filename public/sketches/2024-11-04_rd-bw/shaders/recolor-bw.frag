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
		

    gl_FragColor = currentColor.rrra;
  }