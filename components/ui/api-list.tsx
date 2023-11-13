"use client";

import { ReactElement } from "react";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export function ApiList({ entityName, entityIdName }: ApiListProps): ReactElement {
  const params = useParams();
  const origin: string = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}
