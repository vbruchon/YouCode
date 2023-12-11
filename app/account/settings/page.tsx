import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRequiredAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function SettingProfilPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const user = session.user;

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>SettingProfilPage</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="mt-8 bg-background">
          <CardContent className="p-4">
            <form
              className="flex flex-col gap-6"
              action={async (formData: FormData) => {
                "use server";
                const userSession = await getRequiredAuthSession();

                const image = formData.get("image");
                const name = formData.get("name");

                const safeData = FormSchema.safeParse({
                  name,
                  image,
                });

                if (!safeData.success) {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    "error",
                    "Invalid data. Image muse be an URL and name bust be between 3 and 40 characters"
                  );
                  redirect(`/account/settings?${searchParams.toString()}`);
                }

                await prisma.user.update({
                  where: {
                    id: userSession.user.id,
                  },
                  data: safeData.data,
                });
                revalidatePath("/account");
                redirect("/account");
              }}
            >
              <div className="flex flex-col gap-3">
                <label htmlFor="image">Profil image :</label>
                <Input
                  type="url"
                  name="image"
                  placeholder={user.image}
                  defaultValue={user.image}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Name :</label>
                <Input
                  type="text"
                  name="name"
                  placeholder={user.name}
                  defaultValue={user.name}
                />
              </div>
              {searchParams.error && (
                <Typography>Error: {searchParams.error as string}</Typography>
              )}
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
