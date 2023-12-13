import { z } from "zod";

//JS
export const CourseFormSchema = z.object({
  img: z.string().url(),
  name: z.string().min(3).max(40),
  presentation: z.string().min(3),
});

//TS
export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
