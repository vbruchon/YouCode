"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import {
  LESSON_STATE,
  LessonFormSchema,
  LessonsFormSchema,
} from "./lesson.shema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { lessonActionEdit } from "./lesson.action";
import { toast } from "sonner";

export type LessonFormProps = {
  defaultValue?: LessonsFormSchema & {
    id: string;
    courseId: string;
  };
};

export const LessonForm = ({ defaultValue }: LessonFormProps) => {
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        console.log(values);
        if (defaultValue?.id) {
          const { data, serverError } = await lessonActionEdit({
            lessonId: defaultValue.id,
            courseId: defaultValue.courseId,
            data: values,
          });

          if (data) {
            toast.success(data);
            router.push(`/admin/courses/${defaultValue.courseId}/lessons/`);
            router.refresh();
            return;
          }
          toast.error("Some error occured", {
            description: serverError,
          });
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name :</FormLabel>
            <FormControl>
              <Input placeholder="Titre de la lesson" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State :</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {LESSON_STATE.map((state) => (
                    <SelectItem value={state} className="capitalize ">
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="w-1/5 mx-auto">
        Submit
      </Button>
    </Form>
  );
};
