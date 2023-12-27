"use client"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Order } from "@prisma/client"
import axios from "axios"
import { Minus, Plus } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  guest_num: z.number().min(1),
	date: z.date(),
})

export const BookForm = ({
  order,
}: {
  order: Pick<Order, "userId" | "eventId" | "date">
}) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
			date: order.date,
      guest_num: 1,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await axios.post(
        `/api/stores/${params.storeId}/events/${order.eventId}/orders`,
        values,
      )
      router.refresh()
      router.push(`/client/orders`)
      toast.success("Success")
    } catch (e) {
      console.log(e)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={"Book reservation"}
          description={"book reservation for this event"}
        />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="guest_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Number of guests
                  </FormLabel>
                  <div className="grid grid-cols-3">
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="rounded-full"
                      type="button"
                      onClick={() =>
                        form.setValue(
                          "guest_num",
                          form.getValues("guest_num") - 1,
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="text-lg font-bold">
                      {form.getValues("guest_num")}
                    </div>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="rounded-full"
                      type="button"
                      onClick={() =>
                        form.setValue(
                          "guest_num",
                          form.getValues("guest_num") + 1,
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            Pay
          </Button>
        </form>
      </Form>
    </>
  )
}
