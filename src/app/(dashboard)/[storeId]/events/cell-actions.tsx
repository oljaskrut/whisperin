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
import {
  Check,
  CopyIcon,
  EditIcon,
  MinusCircle,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

export const CellAction = ({ data }: { data: EventColumn }) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Billboard id is copied")
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}/events/${data.id}`)
      router.refresh()
      router.push("/")
      toast.success("Billboard deleted")
    } catch (e) {
      console.log(e)
      toast.error("Make sure you removed all dependant entities")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const toggle = async () => {
    try {
      await axios.patch(`/api/stores/${params.storeId}/events/${data.id}`, {
        active: !data.active,
      })
      router.refresh()
      toast.success("Updated")
    } catch (e) {
      console.log(e)
      toast.error("Something wrong")
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />
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
            {data.active ? (
              <DropdownMenuItem onClick={toggle}>
                <MinusCircle className="mr-2 h-4 w-4" /> Disable
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={toggle}>
                <Check className="mr-2 h-4 w-4" /> Activate
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() =>
                router.push(`/${params.storeId}/events/${data.id}`)
              }
            >
              <EditIcon className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <TrashIcon className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </>
  )
}
