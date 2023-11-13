"use client";

import { CellContext, ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ReactElement } from "react";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }: CellContext<BillboardColumn, unknown>): ReactElement => (
      <CellAction data={row.original} />
    ),
  },
];
