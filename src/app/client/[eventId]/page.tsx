import { buttonVariants } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const BillboardPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await prisma.event.findUnique({
    where: {
      id: params.eventId,
    },
  })

  if (!event) return notFound()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="">{event.description}</p>
        <Image
          src={event.images.split(",")[0]}
          alt="Event Image"
          width={300}
          height={200}
          className="rounded-lg object-cover aspect-square"
        />
        <p className="">{"date"}</p>

        <Link href={`/client/${event.id}/book`} className={buttonVariants()}>
          Book
        </Link>
      </div>
    </div>
  )
}
export default BillboardPage
