import useMarkdownProcessor from "../hooks/useMarkdownProcessor";

export default function SourceCode({ src }) {
  const reactContent = useMarkdownProcessor(
    "```" + src.type + "\n" + src.contents + "\n```",
  );

  return (
    <div>
      <h3>{src.name}</h3>
      {reactContent}
    </div>
  );
}
