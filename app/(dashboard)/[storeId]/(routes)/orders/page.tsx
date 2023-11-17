import { ReactElement } from "react";

import { format } from "date-fns";

import { OrderClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { Order, Product } from "@prisma/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface OrderItemWithProduct {
  product: Product;
}

interface OrderWithItems extends Order {
  orderItems: OrderItemWithProduct[];
}

async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}): Promise<ReactElement> {
  const orders: OrderWithItems[] = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map(
    (item: OrderWithItems): OrderColumn => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems
        .map((orderItem: OrderItemWithProduct): string => orderItem.product.name)
        .join(", "),
      totalPrice: formatter.format(
        item.orderItems.reduce((total: number, item: OrderItemWithProduct): number => {
          return total + Number(item.product.price);
        }, 0)
      ),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}

export default OrdersPage;
