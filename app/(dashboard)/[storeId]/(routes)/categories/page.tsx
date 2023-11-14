import { ReactElement } from "react";

import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./components/columns";
import { Billboard, Category } from "@prisma/client";
import { CategoriesClient } from "./components/client";

interface CombinedCategory extends Category {
  billboard: Billboard;
}

async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}): Promise<ReactElement> {
  const categories: CombinedCategory[] = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map(
    (item: CombinedCategory): CategoryColumn => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
}

export default CategoriesPage;
