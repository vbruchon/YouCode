import { Button } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type ActionAcessButtonProps = {
  courseId: string;
  user: {
    id: string;
    canceled: boolean;
  };
};

export const ActionAcessButton = ({
  courseId,
  user,
}: ActionAcessButtonProps) => {
  return (
    <form>
      <Button
        key={user.id}
        variant={user.canceled ? "destructive" : undefined}
        className={user.canceled ? "bg-green-600 hover:bg-green-700" : ""}
        type="submit"
        formAction={async () => {
          "use server";

          const session = await getRequiredAuthSession();

          await prisma.courseOnUser.findMany({
            where: {
              userId: user.id,
              course: {
                id: courseId,
                creatorId: session.user.id,
              },
            },
          });
          const now = new Date();
          const data = user.canceled ? null : now;
          await prisma.courseOnUser.updateMany({
            where: {
              userId: user.id,
              courseId: courseId,
            },
            data: {
              canceledAt: data,
            },
          });
          revalidatePath(`/admin/courses/${courseId}?page=0`);
        }}
      >
        {user.canceled ? "Give Access" : "Remove Access"}
      </Button>
    </form>
  );
};
