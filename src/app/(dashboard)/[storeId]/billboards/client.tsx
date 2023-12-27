"use client"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { Separator } from "@radix-ui/react-separator"
import { DataTable } from "./data-table"

export const BillboardClient = ({
  billboards,
}: {
  billboards: BillboardColumn[]
}) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={billboards} />
    </>
  )
}
