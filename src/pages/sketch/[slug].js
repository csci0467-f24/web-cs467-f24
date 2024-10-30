import { getSketchPaths, getSketchSrc } from "../../lib/sketch-utils";

import SourceCode from "../../components/SourceCode";

export default function Sketch({ path, sources }) {
  const srcBlocks = sources.map((src) => {
    return (
      <div key={src.name}>
        <SourceCode src={src} />
      </div>
    );
  });

  return (
    <div>
      <iframe src={path} style={{ width: "100%", height: "700px" }}></iframe>
      <hr />
      <h2>Source</h2>
      {srcBlocks}
    </div>
  );
}

/**
 * Specifies which dynamic routes should be pre-rendered
 */
export async function getStaticPaths() {
  const paths = getSketchPaths();

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
  const sketchName = params.slug;
  const path = `../sketches/${sketchName}/index.html`;

  const sources = getSketchSrc(sketchName);
  return {
    props: { path, sources },
  };
}
