import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { prisma } from "@/lib/db"
import { Navbar } from "@/components/navbar"

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()
  if (!userId) redirect("/sign-in")

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  if (!store) redirect("/")

  return (
    <>
      <Navbar />
      <div className="mt-8 mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        {children}
      </div>
    </>
  )
}
