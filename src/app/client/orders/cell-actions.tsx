"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { EventColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { CopyIcon, MoreHorizontalIcon } from "lucide-react"
import toast from "react-hot-toast"

export const CellAction = ({ data }: { data: EventColumn }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Billboard id is copied")
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only" />
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
              <CopyIcon className="mr-2 h-4 w-4" /> Copy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </>
  )
}
