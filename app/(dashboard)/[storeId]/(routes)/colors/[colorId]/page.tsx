import { ReactElement } from "react";

import prismadb from "@/lib/prismadb";
import { Color } from "@prisma/client";

import { ColorForm } from "./components/color-form";

async function ColorPage({
  params,
}: {
  params: { colorId: string };
}): Promise<ReactElement> {
  const color: Color | null = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}

export default ColorPage;
