"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"
import { Check, MinusCircle } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EventColumn = {
  id: string
  title: string
  date: string
  paid: boolean
}

export const columns: ColumnDef<EventColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "active",
    header: "Paid",
    cell: ({ row }) =>
      row.original.paid ? (
        <Check className="h-4 w-4 " />
      ) : (
        <MinusCircle className="h-4 w-4 " />
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
