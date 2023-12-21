import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import router from "next/router";
import { CoursePlaceholder } from "../../../courses/[courseId]/_components/CoursePlaceholder";

export default function CourseDialogLoading() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Loading ...</DialogTitle>
        </DialogHeader>
        <CoursePlaceholder />
      </DialogContent>
    </Dialog>
  );
}
