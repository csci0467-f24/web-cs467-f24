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
  const sourceFiles = [];
  const filePath = path.join(sketchDirectory, sketchName);

  // get javascript files (assumed to be at the top level)
  const jsFiles = fs
    .readdirSync(filePath)
    .filter((file) => file.endsWith(".js"));

  jsFiles.forEach((file) => {
    const contents = fs.readFileSync(path.join(filePath, file), "utf8");
    const src = { name: "sketch.js", type: "javascript", contents: contents };
    sourceFiles.push(src);
  });

  // get shader files
  const shadersFilepath = path.join(filePath, "shaders");
  if (fs.existsSync(shadersFilepath)) {
    const shaderFiles = fs
      .readdirSync(shadersFilepath)
      .filter((file) => file.endsWith(".frag") || file.endsWith(".vert"));

    shaderFiles.forEach((file) => {
      const contents = fs.readFileSync(
        path.join(shadersFilepath, file),
        "utf8",
      );
      const src = { name: file, type: "glsl", contents: contents };
      sourceFiles.push(src);
    });
  }

  return sourceFiles;
}
