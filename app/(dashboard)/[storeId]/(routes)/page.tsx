import prismadb from "@/lib/prismadb";
import { ReactElement } from "react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

async function DashboardPage({ params }: DashboardPageProps): Promise<ReactElement> {
  const store: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
}

export default DashboardPage;
