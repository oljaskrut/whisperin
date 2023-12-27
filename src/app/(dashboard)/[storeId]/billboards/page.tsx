import { format } from "date-fns"
import { BillboardClient } from "./client"
import { prisma } from "@/lib/db"
import { BillboardColumn } from "./columns"

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: { createdAt: "desc" },
  })

  const formattedBillboards: BillboardColumn[] = billboards.map(
    ({ id, label, createdAt }) => ({
      id,
      label,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formattedBillboards} />
      </div>
    </div>
  )
}
export default Billboards
