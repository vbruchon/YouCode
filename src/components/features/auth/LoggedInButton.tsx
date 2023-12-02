"use client";

import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";

export type LoggedInButtonProps = {
  user: Session["user"];
};

const DEFAULT_AVATAR = "/images/defaultAvatar.png";

export const LoggedInButton = (props: LoggedInButtonProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });

  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger>
          <div className="flex items-center p-2 bg-transparent border border-gray-500 rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground hover:cursor-pointer">
            <Avatar className="w-8 h-8 mr-4">
              <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
              {props.user.image && (
                <AvatarImage
                  src={props.user.image}
                  alt={props.user.name ?? DEFAULT_AVATAR}
                />
              )}
            </Avatar>
            {props.user.name}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center p-2">
          <DropdownMenuItem className="p-4">
            <Link href={"./account"}>My account</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="p-2 mb-2 bg-destructive">
              <LogOut size={18} className="mr-4" />
              <Typography>Logout</Typography>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={mutation.isPending}
              onClick={() => {
                mutation.mutate();
              }}
            >
              {mutation.isPending ? (
                <Loader className="mr-2" size={16} />
              ) : (
                <LogOut size={50} className="w-4 h-4 mr-2" />
              )}
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};
