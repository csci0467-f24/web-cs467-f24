const tiles = [];
const TILE_SIZE = 30;

function setup() {
  createCanvas(600, 600);
  noLoop();
  loadTiles();
}

function draw() {
  background(0);
  stroke(255);

  for (x = 0; x < width; x += TILE_SIZE) {
    for (let y = 0; y < height; y += TILE_SIZE) {
      const tile = random(tiles);
      image(tile, x, y);
    }
  }
}

function loadTiles() {
  const halfSize = TILE_SIZE / 2;
  for (let i = 0; i < 4; i++) {
    const ctx = createGraphics(TILE_SIZE, TILE_SIZE);
    ctx.background(255, 255, 150);
    ctx.noStroke();
    ctx.angleMode(DEGREES);
    ctx.translate(halfSize, halfSize);
    ctx.rotate(i * 90);
    ctx.fill("blue");
    ctx.triangle(-halfSize, -halfSize, -halfSize, halfSize, halfSize, halfSize);
    tiles.push(ctx);
  }
}
