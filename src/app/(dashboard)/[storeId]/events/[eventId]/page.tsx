import { prisma } from "@/lib/db"
import { EventForm } from "./event-form"

const BillboardPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await prisma.event.findUnique({
    where: {
      id: params.eventId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EventForm event={event} />
      </div>
    </div>
  )
}
export default BillboardPage
