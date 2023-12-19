import { Loader, Loader2 } from "lucide-react";
import React from "react";

export default function AppLoaderPage() {
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <Loader2 size={32} />
    </div>
  );
}
