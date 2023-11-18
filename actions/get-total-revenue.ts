import prismadb from "@/lib/prismadb";
import { Order, Product } from "@prisma/client";

interface OrderItemWithProduct {
  product: Product;
}

interface OrderWithItemsAndProduct extends Order {
  orderItems: OrderItemWithProduct[];
}

export async function getTotalRevenue(storeId: string): Promise<number> {
  const paidOrders: OrderWithItemsAndProduct[] = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue: number = paidOrders.reduce(
    (total: number, order: OrderWithItemsAndProduct): number => {
      const orderTotal: number = order.orderItems.reduce(
        (orderSum: number, item: OrderItemWithProduct): number => {
          return orderSum + item.product.price.toNumber();
        },
        0
      );
      return total + orderTotal;
    },
    0
  );

  return totalRevenue;
}
