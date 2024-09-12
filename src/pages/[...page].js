import Page from "../components/Page";
import { getAllPaths, getPageData } from "../lib/file-utils";
import { isFuture, parseISO } from "date-fns";

export default function Resource({ pageData }) {
  const isProduction = process.env.NODE_ENV === "production";
  pageData.released = !isFuture(parseISO(pageData.date));

  if ((pageData.published && pageData.released) || !isProduction) {
    return <Page pageData={pageData} />;
  } else {
    return (
      <div>
        <h2>Unpublished</h2>
        <p>I&apos;m sorry, that page has not yet been released.</p>
      </div>
    );
  }
}

/**
 * Specifies which dynamic routes should be pre-rendered
 */
export async function getStaticPaths() {
  const paths = getAllPaths();

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
  const pageData = getPageData(params.page);

  return {
    props: { pageData },
  };
}
