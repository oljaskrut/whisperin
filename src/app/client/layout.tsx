import { ClientNavbar } from "@/components/client-navbar"
import { ReactNode } from "react"

export default function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <ClientNavbar />
      <div className="mt-8 mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        {children}
      </div>
    </>
  )
}
