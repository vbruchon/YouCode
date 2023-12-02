"use client";
import { LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

const LogOutButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });
  return (
    <Button
      variant="destructive"
      onClick={() => {
        mutation.mutate();
      }}
    >
      <LogOut className="mr-2" size={18} />
      Logout
    </Button>
  );
};

export default LogOutButton;
