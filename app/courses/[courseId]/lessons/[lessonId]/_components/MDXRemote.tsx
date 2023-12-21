import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";

export type MDXProseProps = {
  markdown: string;
};

export const MDXProse = ({ markdown }: MDXProseProps) => {
  return (
    <div className="prose m-auto dark:prose-invert xl:prose-xl">
      <MDXRemote
        options={{
          mdxOptions: {
            //@ts-expect-error
            rehypePlugins: [rehypePrism],
          },
        }}
        source={markdown}
      />
    </div>
  );
};
