import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import router from "next/router";
import { CoursePlaceholder } from "../../../courses/[courseId]/CoursePlaceholder";

export default function CourseDialogLoading() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-3xl max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Loading ...</DialogTitle>
        </DialogHeader>
        <CoursePlaceholder />
      </DialogContent>
    </Dialog>
  );
}
