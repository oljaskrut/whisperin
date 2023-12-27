import { UserButton, auth } from "@clerk/nextjs"
import { ClientMainNav } from "./client-main-nav"

export const ClientNavbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="text-2xl border border-foreground px-2 py-0.5 rounded-sm">
          INOMAD
        </div>
        <ClientMainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
