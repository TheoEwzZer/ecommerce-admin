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

import { CategoryColumn, columns } from "./columns";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

export function CategoriesClient({ data }: CategoriesClientProps): ReactElement {
  const router: AppRouterInstance = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={(): void => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
      />
      <Heading
        title="API"
        description="API Calls for Categories"
      />
      <Separator />
      <ApiList
        entityName="categories"
        entityIdName="categoryId"
      />
    </>
  );
}
