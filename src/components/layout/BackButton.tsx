"use client";
import { ArrowLeftToLine } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={(e) => {
        router.back();
        props?.onClick?.(e);
      }}
    >
      <ArrowLeftToLine />
      {props.children}
    </Button>
  );
};

export default BackButton;
