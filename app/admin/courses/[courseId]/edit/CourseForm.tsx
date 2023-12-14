"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { CourseFormSchema } from "../../../../../src/schema/course.schema";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  courseActionEdit,
  courseActionCreate,
} from "../../../../../src/action/course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        const { data, serverError } = defaultValue?.id
          ? await courseActionEdit({
              courseId: defaultValue.id,
              data: values,
            })
          : await courseActionCreate(values);

        if (data) {
          toast.success(data.message);
          router.push(`/admin/courses/${data.course.id}`);
          router.refresh();
          return;
        }
        toast.error("Some error occured", {
          description: serverError,
        });
      }}
    >
      <FormField
        control={form.control}
        name="img"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Host and use an image. You can use{" "}
              <Link href="https://imgur.com">imgur</Link>.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="NextReact" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea placeholder="## Some title" {...field} />
            </FormControl>
            <FormDescription>Markdown is supported.</FormDescription>
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
