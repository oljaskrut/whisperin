import { auth } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { SettingsForm } from "./settings-form"

const Page = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth()

  const store = await prisma.store.findUnique({
    where: {
      userId: userId!,
      id: params.storeId,
    },
  })

  return <SettingsForm store={store!} />
}
export default Page
