import { NotAuthenticatedCard } from "@/components/features/error/NotAuthentifiedCard";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminCourse } from "../admin-course.query";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { revalidatePath } from "next/cache";

const CourseFormSchema = z.object({
  img: z.string().url(),
  name: z.string().min(3).max(40),
  presentation: z.string().min(3),
});

export default async function EditCoursePage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  if (!session) return <NotAuthenticatedCard />;
  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
  });
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit Course Page</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <LayoutDescription>
          modifier la présentation, le nom et URL image
        </LayoutDescription>
        <Card className="mt-8 bg-background">
          <CardContent className="p-4">
            <form
              className="flex flex-col gap-6"
              action={async (formData: FormData) => {
                "use server";
                const userSession = await getRequiredAuthSession();

                const img = formData.get("image");
                const name = formData.get("name");
                const presentation = formData.get("presentation");

                const safeData = CourseFormSchema.safeParse({
                  img: img,
                  name: name,
                  presentation: presentation,
                });

                console.log(safeData);
                if (!safeData.success) {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    "error",
                    "Invalid data. Image muse be an URL and name bust be between 3 and 40 characters and presentation min 3 characters"
                  );
                  redirect(
                    `/admin/courses/${
                      course.id
                    }/edit?${searchParams.toString()}`
                  );
                }

                await prisma.course.update({
                  where: {
                    creatorId: userSession.user.id,
                    id: course.id,
                  },
                  data: safeData.data,
                });
                revalidatePath(`/admin/courses/${course.id}`);

                redirect(`/admin/courses/${course.id}`);
              }}
            >
              <div className="flex flex-col gap-3">
                <label htmlFor="image">Profil image :</label>
                <Input
                  type="url"
                  name="image"
                  placeholder={course.img}
                  defaultValue={course.img}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Name :</label>
                <Input
                  type="text"
                  name="name"
                  placeholder={course.name}
                  defaultValue={course.name}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="presentation">Presentation :</label>
                <Textarea
                  name="presentation"
                  placeholder={course.presentation}
                  defaultValue={course.presentation}
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
