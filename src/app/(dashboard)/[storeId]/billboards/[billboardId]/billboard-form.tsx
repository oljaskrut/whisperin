"use client"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"
import { Heading } from "@/components/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import axios from "axios"
import { Trash2Icon } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import Image from "next/image"

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

export const BillboardForm = ({
  billboard,
}: {
  billboard: Billboard | null
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard ?? {},
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (billboard) {
        await axios.patch(
          `/api/stores/${params.storeId}/billboards/${billboard?.id}`,
          values,
        )
      } else {
        await axios.post(`/api/stores/${params.storeId}/billboards`, values)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage)
    } catch (e) {
      console.log(e)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${billboard?.id}`,
      )
      router.refresh()
      router.push("/")
      toast.success("Billboard deleted")
    } catch (e) {
      console.log(e)
      toast.error("Make sure you removed all dependant entities")
    } finally {
      setLoading(false)
    }
  }

  const { title, description, toastMessage, action } = billboard
    ? {
        title: "Edit billboard",
        description: "edit edit edit edit edit",
        toastMessage: "Saved changes",
        action: "Save changes",
      }
    : {
        title: "Create billboard",
        description: "create create create create create",
        toastMessage: "Created",
        action: "Create",
      }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />

        {billboard && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Input
                    placeholder="Billboard label"
                    disabled={loading}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex-col">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <div
                      // hidden={field.value == "" || !field.value}
                      className="mb-4 flex-col items-center gap-4"
                    >
                      <div
                        hidden={field.value == "" || !field.value}
                        className="relative rounded-md overflow-hidden w-[200px] h-[200px]"
                      >
                        <div className="z-10 absolute top-2 right-2">
                          <Button
                            type="button"
                            onClick={() => form.setValue("imageUrl", "")}
                            variant={"destructive"}
                            size={"icon"}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                        <Image
                          fill
                          className="object-cover"
                          alt="image"
                          src={field.value}
                        />
                      </div>
                    </div>
                    <UploadButton
                      className="items-start"
                      endpoint="imageUploader"
                      appearance={{
                        allowedContent: {
                          display: "none",
                        },
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("imageUrl", res[0].url)
                        toast.success(`Image uploaded`)
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`Failed to upload image, ${error.message}`)
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
