import React from "react";
import MarkdownEditor from "./MarkdownEditor";
import { Layout, LayoutContent } from "@/components/layout/layout";

function MarkdownEditorPage() {
  return (
    <Layout>
      <LayoutContent>
        <MarkdownEditor />
      </LayoutContent>
    </Layout>
  );
}

export default MarkdownEditorPage;
