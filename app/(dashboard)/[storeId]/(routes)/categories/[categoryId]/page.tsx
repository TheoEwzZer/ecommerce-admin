import { ReactElement } from "react";

import prismadb from "@/lib/prismadb";
import { Billboard, Category } from "@prisma/client";

import { CategoryForm } from "./components/category-form";

async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}): Promise<ReactElement> {
  const category: Category | null = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards: Billboard[] = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          billboards={billboards}
          initialData={category}
        />
      </div>
    </div>
  );
}

export default CategoryPage;
