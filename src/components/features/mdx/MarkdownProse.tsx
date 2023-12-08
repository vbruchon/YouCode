import Markdown from "react-markdown";

export type MarkdownProseProps = {
  content: string;
};

export const MarkdownProse = (props: MarkdownProseProps) => {
  return (
    <Markdown className="prose lg:prose-lg dark:prose-invert">
      {props.content}
    </Markdown>
  );
};
