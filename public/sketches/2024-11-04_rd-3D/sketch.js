let rdShader;

let buffer;

/*
A function to check if we have any shader errors.
Taken from https://stackoverflow.com/questions/75573386/p5-catch-shader-compilation-errors
*/
function checkShaderError(shaderObj, shaderText) {
  gl = shaderObj._renderer.GL;
  glFragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(glFragShader, shaderText);
  gl.compileShader(glFragShader);
  if (!gl.getShaderParameter(glFragShader, gl.COMPILE_STATUS)) {
    return gl.getShaderInfoLog(glFragShader);
  }
  return null;
}

function setup() {
  createCanvas(800, 800, WEBGL);

  fetch("shaders/reaction-diffusion.frag")
    .then((response) => response.text())
    .then((data) => {
      rdShader = createFilterShader(data);
      shaderError = checkShaderError(rdShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });

  buffer = createFramebuffer({ format: FLOAT, width: 200, height: 200 });

  buffer.begin();
  background(255, 0, 0);
  fill(0, 0, 255);
  rect(-50, -20, 100, 40);
  buffer.end();
}

function draw() {
  background(0);
  orbitControl();

  if (rdShader) {
    buffer.begin();
    for (let i = 0; i < 20; i++) {
      filter(rdShader);
    }

    fill(0, 0, 255);

    if (random(1) > 0.7) {
      if (random(1) > 0.5) {
        circle(
          random(-buffer.width / 2, buffer.width / 2),
          random(-buffer.height / 2, buffer.height / 2),
          random(5, 20),
        );
      } else {
        rect(
          random(-buffer.width / 2, buffer.width / 2),
          random(-buffer.height / 2, buffer.height / 2),
          random(15, 40),
          random(15, 40),
        );
      }
    }

    buffer.end();
    buffer.loadPixels();

    const boxSize = 5;
    const fieldSize = buffer.width * boxSize;
    push();
    translate(-fieldSize / 2 - boxSize, 0, -fieldSize / 2 - boxSize);
    for (let i = 0; i < buffer.width; i++) {
      translate(boxSize, 0, 0);
      push();
      for (let j = 0; j < buffer.height; j++) {
        translate(0, 0, boxSize);
        const index = (i + j * buffer.width) * 4;
        const boxHeight = map(buffer.pixels[index + 2], 0, 1, 0, 70);

        push();
        translate(0, -boxHeight / 2, 0);
        fill(map(boxHeight, 0, 70, 0, 255));
        box(boxSize, boxHeight, boxSize);
        pop();
      }
      pop();
    }
    pop();
  }
}

function mouseDragged(event) {
  // draw a circle where the mouse event happened
  buffer.begin();
  if (event.shiftKey) {
    fill(0, 0, 255);
  } else {
    fill(255, 0, 0);
  }

  circle(mouseX - width / 2, mouseY - height / 2, 10);
  buffer.end();
}
