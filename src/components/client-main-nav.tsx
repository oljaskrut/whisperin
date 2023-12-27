"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const ClientMainNav = () => {
  const pathname = usePathname()
  const params = useParams()
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Home",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/`,
      label: "Featured Events",
      active: pathname === `/${params.storeId}/events`,
    },
    {
      href: `/${params.storeId}/`,
      label: "FAQ",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/`,
      label: "About",
      active: pathname === `/${params.storeId}/dates`,
    },
  ]
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
