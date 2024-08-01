import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { SettingsForm } from "./components/settings-form";
import { Store } from "@prisma/client";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

async function SettingsPage({
  params,
}: SettingsPageProps): Promise<ReactElement> {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;
