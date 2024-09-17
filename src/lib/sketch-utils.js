import fs from "fs";
import path from "path";

const sketchDirectory = path.join(process.cwd(), "public", "sketches");

export function getSketchPaths() {
  const entries = fs.readdirSync(sketchDirectory);
  const directories = entries.filter((name) =>
    fs.lstatSync(path.join(sketchDirectory, name)).isDirectory(),
  );

  return directories.map((d) => ({ params: { slug: d } }));
}

export function getSketchSrc(sketchName) {
  const filePath = path.join(sketchDirectory, sketchName, "sketch.js");
  let contents = "";
  if (fs.existsSync(filePath)) {
    contents = fs.readFileSync(filePath, "utf8");
  }

  return contents;
}
