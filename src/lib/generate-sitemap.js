import fs from "fs";
import path from "path";
import matter from "gray-matter";

import config from "../../site.config.mjs";

const contentDirectory = path.join(process.cwd(), "content");

const sitemapLocation = path.join(process.cwd(), "content", "sitemap.json");

function getMetadata(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  // Use gray-matter to parse the post metadata section
  const metadata = matter(fileContents).data;
  if (metadata.dates && !metadata.date) {
    metadata.date = metadata.dates[0];
  }
  return metadata;
}

function getOrderedPageList(directory) {
  // Get file names under the directory
  const fileNames = fs.readdirSync(directory);
  let allPageData = fileNames.map((fileName) => {
    // Remove '.md' from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const metadata = getMetadata(path.join(directory, fileName));

    // Combine the data with the id
    return {
      id,
      ...metadata,
    };
  });

  // allPageData = allPageData.filter((page) => page.published);

  // Sort posts by date
  return allPageData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else if (a.date === b.date) {
      return a.name.localeCompare(b.name);
    } else {
      return -1;
    }
  });
}

const makeNode = (name, path, metadata) => ({
  ...metadata,
  name,
  type: "node",
  path,
});

const makeDirectory = (name, children) => ({
  name,
  type: "directory",
  children,
});

function generateSitemap() {
  const sitemap = [];
  const { content } = config;

  Object.entries(content).forEach(([route, name]) => {
    const filePath = path.join(contentDirectory, route);
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
      const contents = getOrderedPageList(filePath).map((sp) =>
        makeNode(sp.name, path.join("/", route, sp.id), sp),
      );
      if (contents.length > 0) {
        sitemap.push(makeDirectory(name, contents));
      }
    } else if (fs.existsSync(`${filePath}.md`)) {
      const metadata = getMetadata(`${filePath}.md`);
      sitemap.push(makeNode(name, `/${route}`, metadata));
    } else {
      // handle endpoints in the pages directory
      sitemap.push(makeNode(name, `/${route}`, { published: true }));
    }
  });

  const data = JSON.stringify(sitemap);
  fs.writeFileSync(sitemapLocation, data);
}

generateSitemap();
