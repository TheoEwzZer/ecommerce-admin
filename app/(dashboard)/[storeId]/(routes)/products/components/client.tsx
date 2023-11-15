"use client";

import { ReactElement } from "react";

import { Plus } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ProductColumn, columns } from "./columns";

interface BillBoardClientProps {
  data: ProductColumn[];
}

export function ProductClient({ data }: BillBoardClientProps): ReactElement {
  const router: AppRouterInstance = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={(): void => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="label"
        columns={columns}
        data={data}
      />
      <Heading
        title="API"
        description="API Calls for Products"
      />
      <Separator />
      <ApiList
        entityName="products"
        entityIdName="productId"
      />
    </>
  );
}
