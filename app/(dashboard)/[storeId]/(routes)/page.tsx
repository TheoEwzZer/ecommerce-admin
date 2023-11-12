import prismadb from "@/lib/prismadb";
import { ReactElement } from "react";
import { Store } from "@prisma/client";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

async function DashboardPage({ params }: DashboardPageProps): Promise<ReactElement> {
  const store: Store | null = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
}

export default DashboardPage;
