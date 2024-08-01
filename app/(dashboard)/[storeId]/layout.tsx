import { ReactElement, ReactNode } from "react";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

import { Store } from "@prisma/client";
import { ClerkProvider } from "@clerk/nextjs";

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

  const store: Store | null = await prismadb.store.findFirst({
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
      <ClerkProvider afterSignOutUrl="/">
        <Navbar />
      </ClerkProvider>
      {children}
    </>
  );
}
