import { format } from "date-fns"
import { CategoryClient } from "./client"
import { prisma } from "@/lib/db"
import { CategoryColumn } from "./columns"

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const formattedCategories: CategoryColumn[] = categories.map(
    ({ id, name, createdAt, billboard: { label: billboardLabel } }) => ({
      id,
      name,
      billboardLabel,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formattedCategories} />
      </div>
    </div>
  )
}
export default Categories
