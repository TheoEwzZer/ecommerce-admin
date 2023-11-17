"use client";

import { ReactElement } from "react";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OrderColumn, columns } from "./columns";

interface BillBoardClientProps {
  data: OrderColumn[];
}

export function OrderClient({ data }: BillBoardClientProps): ReactElement {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable
        searchKey="products"
        columns={columns}
        data={data}
      />
    </>
  );
}
