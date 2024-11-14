let sound;
let osc;
let mic;
let amp, fft;
const levels = [];

const sources = ["mic", "file", "sine", "triangle", "sawtooth", "square"];

let currentSource = 0;

function preload() {
  sound = loadSound("media/late-night.mp3");
}

function setup() {
  createCanvas(1024, 600);
  // sources
  osc = new p5.Oscillator();
  mic = new p5.AudioIn();

  // analysis
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  setSource(sources[currentSource]);

  stroke(255);
  noFill();
}

function draw() {
  background(0);

  osc.freq(map(mouseX, 0, width, 100, 2000));

  let level = amp.getLevel();
  levels.push(level);
  if (levels.length > width) {
    levels.shift();
  }

  stroke(255);
  noFill();
  beginShape();
  levels.forEach((level, i) => {
    const x = i;
    const y = map(level, 0, 1, 125, 10);
    vertex(x, y);
  });

  endShape();

  let waveform = fft.waveform();

  beginShape();

  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 275, 150);
    vertex(x, y);
  }
  endShape();

  let spectrum = fft.analyze();

  noStroke();
  fill(255, 255, 255);
  const largest = spectrum.reduce((acc, val) => Math.max(acc, val), 0);

  for (let i = 0; i < spectrum.length / 2; i++) {
    let x = map(i, 0, spectrum.length / 2, 0, width) + 1;
    let h = map(spectrum[i], 0, 255, 0, height - 300);

    rect(x, height - h, ceil(width / spectrum.length), h);
  }
}

function connect(source) {
  source.connect(amp);
  source.connect(fft);
}

function setSource(source) {
  sound.pause();
  osc.stop();
  mic.stop();

  if (source === "file") {
    sound.play();
    sound.amp(1);
    connect(sound);
  } else if (source === "sine") {
    osc.setType("sine");
    osc.start();
    connect(osc);
  } else if (source === "triangle") {
    osc.setType("triangle");
    osc.start();
    connect(osc);
  } else if (source === "sawtooth") {
    osc.setType("sawtooth");
    osc.start();
    connect(osc);
  } else if (source === "square") {
    osc.setType("square");
    osc.start();
    connect(osc);
  } else if (source === "mic") {
    mic.start();
    connect(mic);
  }
}

function keyPressed() {
  if (key === " ") {
    currentSource = (currentSource + 1) % sources.length;
    setSource(sources[currentSource]);
    console.log(sources[currentSource]);
  } else if (key === "p") {
    if (isLooping()) {
      sound.pause();
      osc.stop();
      mic.stop();
      noLoop();
    } else {
      setSource(sources[currentSource]);
      loop();
    }
  }
}
