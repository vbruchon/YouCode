import { Layout, LayoutContent } from "@/components/layout/layout";
import { Loader } from "@/components/ui/loader";

export default function AdminLoading() {
  return (
    <Layout>
      <LayoutContent className="flex items-center justify-center w-full h-full">
        <Loader size={32} />
      </LayoutContent>
    </Layout>
  );
}
