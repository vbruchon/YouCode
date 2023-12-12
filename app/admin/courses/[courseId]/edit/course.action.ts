"use server";
import { ServerError, authentificatedAction } from "@/lib/safe-action";
import { CourseFormSchema } from "./course.schema";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});
export const courseActionEdit = authentificatedAction(
  CourseActionEditProps,
  async (props, { userId }) => {
    await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });
    return "Course update successfully";
  }
);

/*async (formData: FormData) => {
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
    redirect(`/admin/courses/${course.id}/edit?${searchParams.toString()}`);
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
};*/
