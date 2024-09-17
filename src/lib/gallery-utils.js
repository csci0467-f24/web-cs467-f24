import fs from "fs";
import path from "path";
import config from "../../public/galleryItems/config.json";
import { log } from "console";

const galleryDirectory = path.join(process.cwd(), "public", "galleryItems");

export function getGalleryData() {
  const data = [...config];

  data.forEach((item) => {
    let pieces = fs.readdirSync(path.join(galleryDirectory, item.path));

    pieces = pieces.filter(
      (name) =>
        name[0] !== "." &&
        fs
          .lstatSync(path.join(galleryDirectory, item.path, name))
          .isDirectory(),
    );
    item.pieces = pieces;
  });

  return data;
}
