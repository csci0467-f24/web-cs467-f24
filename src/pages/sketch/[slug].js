import { getSketchPaths, getSketchSrc } from "../../lib/sketch-utils";
import useMarkdownProcessor from "../../hooks/useMarkdownProcessor";

export default function Sketch({ path, src }) {
  const reactContent = useMarkdownProcessor("```javascript\n" + src + "\n```");

  return (
    <div>
      <iframe src={path} style={{ width: "100%", height: "700px" }}></iframe>
      <hr />
      <h3>Source</h3>
      {reactContent}
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

  const src = getSketchSrc(sketchName);
  return {
    props: { path, src },
  };
}
