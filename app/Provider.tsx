"use client";

import { Toaster, toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
};
