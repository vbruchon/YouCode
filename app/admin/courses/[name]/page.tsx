import { prisma } from "@/lib/db/prisma";
import { useRouter } from "next/router";
import React from "react";

async function CoursePage({ params }: { params: { name: string } }) {
  return <div>Page de la formation {params.name} </div>;
}

export default CoursePage;
