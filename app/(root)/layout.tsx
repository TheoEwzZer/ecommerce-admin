import { ReactElement, ReactNode } from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store: Store | null = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
