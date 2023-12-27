import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { prisma } from "@/lib/db"

export default async function Layout({ children }: { children: ReactNode }) {
  const { userId } = auth()
  if (!userId) redirect("/sign-in")

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  })

  if (store) redirect(`/${store.id}`)

  return <>{children}</>
}
