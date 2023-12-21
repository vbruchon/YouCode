import { Layout, LayoutContent } from "@/components/layout/layout";
import { Loader } from "@/components/ui/loader";

export default function AdminLoading() {
  return (
    <Layout>
      <LayoutContent className="flex h-full w-full items-center justify-center">
        <Loader size={32} />
      </LayoutContent>
    </Layout>
  );
}
