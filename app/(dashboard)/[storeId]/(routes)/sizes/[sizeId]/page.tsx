import { ReactElement } from "react";

import prismadb from "@/lib/prismadb";
import { Size } from "@prisma/client";

import { SizeForm } from "./components/size-form";

async function SizePage({
  params,
}: {
  params: { sizeId: string };
}): Promise<ReactElement> {
  const size: Size | null = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;
