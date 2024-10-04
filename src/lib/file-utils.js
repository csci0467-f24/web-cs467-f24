import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Returns all paths found in the content directory
 * Note that this allows for infinite recursion, which the sidebar doesn't
 * support currently.
 *
 * This is used in getStaticPaths to enumerate valid paths
 */

export function getAllPaths() {
  const extractPaths = (directory) => {
    const paths = [];
    const entries = fs.readdirSync(path.join(contentDirectory, directory));

    const directories = entries.filter((name) =>
      fs.lstatSync(path.join(contentDirectory, directory, name)).isDirectory(),
    );

    directories.forEach((dir) => {
      paths.push(...extractPaths(path.join(directory, dir)));
    });

    const files = entries.filter((name) => name.endsWith(".md"));

    files.forEach((name) => {
      paths.push(path.join(directory, name.replace(/\.md$/, "")));
    });

    return paths;
  };

  return extractPaths("/");
}

/**
 * Read in the content file.
 *
 * @param {[string]} routeData - a list of path elements to the resource
 */
export function getPageData(routeData) {
  let fullPath = path.join(contentDirectory, ...routeData) + ".md";
  if (!fs.existsSync(fullPath)) {
    fullPath += "x";
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // get the metadata
  const matterResult = matter(fileContents);
  const stats = fs.statSync(fullPath);
  matterResult.data.mtime = stats.mtime.toISOString();
  matterResult.data.path = path.join("/", ...routeData);
  if (matterResult.data.dates && !matterResult.data.date) {
    matterResult.data.date = matterResult.data.dates[0];
  }

  return {
    markdown: matterResult.content,
    ...matterResult.data,
  };
}
