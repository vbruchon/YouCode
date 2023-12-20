import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function SettingProfilLoadingPage() {
  return (
    <Layout>
      <LayoutHeader>
        <Skeleton className="h-11 w-28" />
      </LayoutHeader>
      <LayoutContent>
        <Card className="mt-8 bg-background">
          <CardContent className="p-4">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Skeleton className="w-12 h-4" />

                <Skeleton className="w-full h-8" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-full h-8" />
              </div>
              <Skeleton className="w-full h-9" />
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
