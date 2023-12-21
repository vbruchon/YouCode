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
                <Skeleton className="h-4 w-12" />

                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-8 w-full" />
              </div>
              <Skeleton className="h-9 w-full" />
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
