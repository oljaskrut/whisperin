import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "./main-nav"
import { StoreSwitcher } from "./store-switcher"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"

export const Navbar = async () => {
  const { userId } = auth()
  if (!userId) redirect("/sign-in")

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  })
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}
        <div className="text-2xl border border-foreground px-2 py-0.5 rounded-sm">
          INOMAD
        </div>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
