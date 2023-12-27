import { format } from "date-fns"
import { EventClient } from "./client"
import { prisma } from "@/lib/db"

const Events = async ({ params }: { params: { storeId: string } }) => {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EventClient
          events={events.map((e) => ({
            ...e,
            date: format(e.date, "MMMM do"),
          }))}
        />
      </div>
    </div>
  )
}
export default Events
