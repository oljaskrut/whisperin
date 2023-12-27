import { prisma } from "@/lib/db"

export default async function Page({
  params,
}: {
  params: { storeId: string }
}) {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return (
    <>
      <div>{store?.name}</div>
    </>
  )
}
