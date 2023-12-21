import Markdown from "react-markdown";

export type MarkdownProseProps = {
  content: string;
};

export const MarkdownProse = (props: MarkdownProseProps) => {
  return (
    <Markdown className="prose dark:prose-invert lg:prose-lg">
      {props.content}
    </Markdown>
  );
};
