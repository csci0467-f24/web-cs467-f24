import path from "path";

import Page from "../../components/Page";
import { getAllPageIds, getPageData } from "../../lib/file-utils";

const resourcesDirectory = path.join(process.cwd(), "content", "resources");

export default function Resource({ pageData }) {
  return <Page pageData={pageData} />;
}

/**
 * Specifies which dynamic routes should be pre-rendered
 */
export async function getStaticPaths() {
  const paths = getAllPageIds(resourcesDirectory);
  return {
    paths,
    fallback: false,
  };
}

/**
 * Fetch the data for the page to be rendered.
 *
 * @param {*} param0
 */
export async function getStaticProps({ params }) {
  const pageData = await getPageData(resourcesDirectory, params.id);
  pageData.path = path.join("/resources", params.id);
  return {
    props: { pageData },
  };
}
