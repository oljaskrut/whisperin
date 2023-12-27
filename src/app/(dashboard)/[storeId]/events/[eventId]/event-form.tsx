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
import { Event } from "@prisma/client"
import axios from "axios"
import { CalendarIcon, Trash2Icon } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { UploadButton } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  images: z.any(),
  date: z.date(),
})

export const EventForm = ({ event }: { event: Event | null }) => {
  // const [date, setDate] = useState<Date>()
  const [preview, setPreview] = useState<string[]>(
    event?.images.split(",") ?? [],
  )

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event ?? {
      title: "",
      images: "",
      description: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (event) {
        await axios.patch(
          `/api/stores/${params.storeId}/events/${event?.id}`,
          values,
        )
      } else {
        await axios.post(`/api/stores/${params.storeId}/events`, values)
      }
      router.refresh()
      router.push(`/${params.storeId}/events`)
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
      await axios.delete(`/api/stores/${params.storeId}/events/${event?.id}`)
      router.refresh()
      router.push("/")
      toast.success("event deleted")
    } catch (e) {
      console.log(e)
      toast.error("Make sure you removed all dependant entities")
    } finally {
      setLoading(false)
    }
  }

  const { title, description, toastMessage, action } = event
    ? {
        title: "Edit event",
        description: "edit edit edit edit edit",
        toastMessage: "Saved changes",
        action: "Save changes",
      }
    : {
        title: "Create event",
        description: "create create create create create",
        toastMessage: "Created",
        action: "Create",
      }

  useEffect(() => form.setValue("images", preview.join(",")), [preview])

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

        {event && (
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Trash2Icon className="h-4 w-4 text-destructive" />
          </Button>
        )}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Title</FormLabel>
                  <Input
                    placeholder="event title"
                    disabled={loading}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange, value } }) => (
              <>
                <FormItem>
                  <FormLabel className="text-lg font-bold">Images</FormLabel>
                  <FormControl>
                    <UploadButton
                      className="items-start"
                      endpoint="imageUploader"
                      appearance={{
                        allowedContent: {
                          display: "none",
                        },
                      }}
                      onClientUploadComplete={(res) => {
                        setPreview([...preview, ...res.map((r) => r.url)])
                        toast.success(`Image uploaded`)
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`Failed to upload image, ${error.message}`)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {preview.length > 0 && (
                  <div className="grid grid-cols-3 gap-1 w-2/3">
                    {preview.map((img, i) => (
                      <div key={img} className="relative">
                        <Image
                          className=" object-cover aspect-square rounded-xl"
                          width={300}
                          height={300}
                          src={img}
                          alt=""
                        />

                        <div className="z-10 absolute top-2 right-2">
                          <Button
                            type="button"
                            onClick={() =>
                              setPreview(preview.filter((el) => el != img))
                            }
                            variant={"ghost"}
                            size={"icon"}
                            className="bg-foreground/50"
                          >
                            <Trash2Icon className="h-4 w-4 text-destructive " />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          />
          <div className="w-3/5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about event"
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex">
            <FormField
              control={form.control}
              name="date"
              render={({ field: { onChange, value: date } }) => (
                <FormItem>
                  <div>
                    <FormLabel className="text-lg font-bold">Date</FormLabel>
                  </div>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
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
