import { Client } from "./client"

export default function Home() {
  return (
    <main className="mt-8 mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Client />
        </div>
      </div>
    </main>
  )
}
