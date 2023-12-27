import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { name, description } = await req.json()

    if (!name || !description)
      return new NextResponse("No name or description", { status: 400 })

    const store = await prisma.store.create({
      data: {
        name,
        description,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[STORES_POST]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}
