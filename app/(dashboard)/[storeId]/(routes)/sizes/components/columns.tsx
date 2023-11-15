"use client";

import { CellContext, ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ReactElement } from "react";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }: CellContext<SizeColumn, unknown>): ReactElement => (
      <CellAction data={row.original} />
    ),
  },
];
