import { ReactElement, ReactNode } from "react";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}): Promise<ReactElement> {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const store: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>This will be a Navbar</div>
      {children}
    </>
  );
}
