import { ReactElement } from "react";

import { format } from "date-fns";

import { ProductClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { Category, Color, Product, Size } from "@prisma/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface CombinedProduct extends Product {
  category: Category;

  size: Size;

  color: Color;
}

async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}): Promise<ReactElement> {
  const products: CombinedProduct[] = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map(
    (item: CombinedProduct): ProductColumn => ({
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(item.price.toNumber()),
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}

export default ProductsPage;
