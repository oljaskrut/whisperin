import { Button, buttonVariants } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { format } from "date-fns"
import Link from "next/link"
import { notFound, useRouter, redirect } from "next/navigation"

const BillboardPage = async ({
  params: { eventId },
}: {
  params: { eventId: string }
}) => {
  const { userId, user } = auth()
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  })

  if (!event) return notFound()
  if (!userId) return redirect("/sign-up")

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="">
          Event:
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p className="">{event.description}</p>
        </div>

        <p className="">Date: </p>

        <p>
          User:
          {user?.firstName} {user?.lastName}
        </p>

        {/* <BookForm order={{ userId, eventId, date: event.date }} /> */}
      </div>
    </div>
  )
}
export default BillboardPage
