import Banner from "./Banner";
import { formatRelative } from "date-fns";

import useMarkdownProcessor from "../hooks/useMarkdownProcessor";

export default function Page({ pageData }) {
  const reactContent = useMarkdownProcessor(pageData.markdown);

  return (
    <>
      {!pageData.released && <Banner text="UNRELEASED" />}
      {!pageData.published && <Banner text="DRAFT" />}
      <article>
        <h1>{pageData.title}</h1>
        {reactContent}
        <hr />

        <small>
          Last updated {formatRelative(new Date(pageData.mtime), new Date())}
        </small>
      </article>
    </>
  );
}
