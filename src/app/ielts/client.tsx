"use client"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  text: z.string().min(1),
})

export const Client = () => {
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState("")
  const [time, setTime] = useState<number>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const t0 = performance.now()
      const { data } = await axios.post(`/api/ielts`, values)
      console.log(data)
      const t = performance.now() - t0
      setTime(t)
      // router.refresh()
      // router.push(`/client/orders`)
      setAnswer(data)
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
          title={"IELTS assessor"}
          description={"Check your IELTS writing task 2"}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Essay</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your essay here"
                      className="resize-none"
                      rows={12}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <Button disabled={loading} className="ml-auto" type="submit">
              Check
            </Button>
          )}
        </form>
      </Form>

      <Separator />

      <p className="indent-4">{answer}</p>
      {time && (
        <p className="text-sm">
          Time: {~~(time / 1000)}s {~~time - ~~(time / 1000)} ms
        </p>
      )}
    </>
  )
}
