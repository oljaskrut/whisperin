"use client"

import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

export const Modal = ({
  title,
  children,
  description,
  onClose,
  isOpen,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
