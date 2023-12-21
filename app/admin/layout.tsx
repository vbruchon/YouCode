import BackButton from "@/components/utils/BackButton";
import BreadCrumb from "@/components/utils/BreadCrumb";

import { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="w-full border-b border-border/20">
        <BreadCrumb />
        <div className="mx-auto my-2 max-w-5xl px-4 py-1">
          <BackButton variant="ghost" size="sm">
            Back
          </BackButton>
        </div>
      </div>
      {children}
    </>
  );
}
