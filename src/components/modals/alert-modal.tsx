"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../ui/modal"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(1),
})

import { useEffect, useState } from "react"

import { create } from "zustand"

interface useStoreModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
  loading: boolean
}) => {
  const [loading, setLoading] = useState(false)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      title="Are you sure?"
      description="Deleting store cannot be undone"
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant={"outline"} disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"destructive"} disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}
