import { Heading } from "@/components/heading"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DataTable } from "./data-table"
import { columns } from "./columns"

const Page = async () => {
  const { userId } = auth()
  if (!userId) return redirect("/sign-in")

  const orders = (
    await prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        event: {
          select: {
            title: true,
          },
        },
      },
    })
  ).map(({ event: { title }, ...o }) => ({
    ...o,
    title,
    date: o.date.toDateString(),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Orders (${orders.length})`}
            description="Your orders"
          />
        </div>
        <Separator />

        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  )
}
export default Page
