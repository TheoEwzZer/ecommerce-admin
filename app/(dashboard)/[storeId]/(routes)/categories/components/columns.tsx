"use client";

import { CellContext, ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ReactElement } from "react";
export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }: CellContext<CategoryColumn, unknown>): string =>
      row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }: CellContext<CategoryColumn, unknown>): ReactElement => (
      <CellAction data={row.original} />
    ),
  },
];
