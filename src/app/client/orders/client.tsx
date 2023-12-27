"use client"

import { Heading } from "@/components/heading"
import { useParams, useRouter } from "next/navigation"
import { EventColumn, columns } from "./columns"
import { Separator } from "@radix-ui/react-separator"
import { DataTable } from "./data-table"

export const EventClient = ({ events }: { events: EventColumn[] }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${events.length})`}
          description="Your orders"
        />
      </div>
      <Separator />

      <DataTable columns={columns} data={events} />
    </>
  )
}
