"use client"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { Separator } from "@radix-ui/react-separator"
import { DataTable } from "./data-table"

export const CategoryClient = ({
  categories,
}: {
  categories: CategoryColumn[]
}) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={categories} />
    </>
  )
}
