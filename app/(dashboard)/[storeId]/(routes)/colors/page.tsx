import { ReactElement } from "react";

import { format } from "date-fns";

import { ColorsClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { Color } from "@prisma/client";
import { ColorColumn } from "./components/columns";

async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}): Promise<ReactElement> {
  const colors: Color[] = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map(
    (item: Color): ColorColumn => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}

export default ColorsPage;
