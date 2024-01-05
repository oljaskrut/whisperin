import { format } from "date-fns"
import { EventClient } from "./client"
import { prisma } from "@/lib/db"

const Events = async ({
  params: { storeId },
}: {
  params: { storeId: string }
}) => {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { storeId },
    include: {
      date: {
        orderBy: { date: "asc" },
        take: 1,
        select: {
          date: true,
        },
      },
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EventClient
          events={events.map((e) => ({
            ...e,
            date: format(e.date[0].date, "MMMM do"),
          }))}
        />
      </div>
    </div>
  )
}
export default Events
