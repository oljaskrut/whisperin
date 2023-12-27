"use client"
import { Heading } from "@/components/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import axios from "axios"
import { Trash2Icon } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})

export const CategoryForm = ({
  category,
  billboards,
}: {
  category: Category | null
  billboards: Billboard[]
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: category ?? {},
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (category) {
        await axios.patch(
          `/api/stores/${params.storeId}/categories/${category?.id}`,
          values,
        )
      } else {
        await axios.post(`/api/stores/${params.storeId}/categories`, values)
      }
      router.refresh()
      router.push(`/${params.storeId}/categories`)
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
        `/api/stores/${params.storeId}/categories/${category?.id}`,
      )
      router.refresh()
      router.push("/")
      toast.success("categories deleted")
    } catch (e) {
      console.log(e)
      toast.error("Make sure you removed all dependant entities")
    } finally {
      setLoading(false)
    }
  }

  const { title, description, toastMessage, action } = category
    ? {
        title: "Edit categories",
        description: "edit edit edit edit edit",
        toastMessage: "Saved changes",
        action: "Save changes",
      }
    : {
        title: "Create categories",
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

        {category && (
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Input
                    placeholder="categories label"
                    disabled={loading}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
