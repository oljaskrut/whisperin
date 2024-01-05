import { prisma } from "@/lib/db"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const events = await prisma.event.findMany()

  return (
    <div className="grid grid-cols-3 gap-4">
      {events.map((event) => (
        <Link
          href={`/client/${event.id}`}
          key={event.id}
          className="bg-muted rounded-lg p-4 shadow-md space-y-1"
        >
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p className="">{event.description}</p>
          <Image
            src={event.images.split(",")[0]}
            alt="Event Image"
            width={300}
            height={200}
            className="rounded-lg object-cover aspect-square"
          />
          <p className="">date</p>
        </Link>
      ))}
    </div>
  )
}
