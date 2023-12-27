import { prisma } from "@/lib/db"
import { CategoryForm } from "./category-form"

const BillboardPage = async ({
  params,
}: {
  params: { categoriesId: string; storeId: string }
}) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoriesId,
    },
  })

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm category={category} billboards={billboards} />
      </div>
    </div>
  )
}
export default BillboardPage
