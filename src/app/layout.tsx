import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

import { ClerkProvider } from "@clerk/nextjs"
import { ModalProvider } from "@/components/providers/modal-provider"
import { ToasterProvider } from "@/components/providers/toast-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "dark relative h-full font-sans antialiased",
            fontSans.variable,
          )}
        >
          <main className="relative flex flex-col min-h-screen">
            <ModalProvider />
            <ToasterProvider />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
