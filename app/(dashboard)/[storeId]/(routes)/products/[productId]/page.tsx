import { ReactElement } from "react";

import prismadb from "@/lib/prismadb";
import { Category, Color, Image, Product, Size } from "@prisma/client";

import { ProductForm } from "./components/product-form";

interface CombinedProduct extends Product {
  images: Image[];
}

async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}): Promise<ReactElement> {
  const product: CombinedProduct | null = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories: Category[] = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes: Size[] = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors: Color[] = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
