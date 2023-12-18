import { z } from "zod";

export const LESSON_STATE = ["HIDDEN", "PUBLIC", "PUBLISHED"] as const;

// JS
export const LessonFormSchema = z.object({
  name: z.string().min(3).max(40),
  state: z.enum(LESSON_STATE),
  courseId: z.string(),
  content: z.string(),
});

//TS
export type LessonFormSchema = z.infer<typeof LessonFormSchema>;
