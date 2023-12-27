import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { name, billboardId } = await req.json()

    if (!name || !billboardId)
      return new NextResponse("No name or billboardId", { status: 400 })

    const store = await prisma.category.create({
      data: {
        name,
        storeId: params.storeId,
        billboardId,
      },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[CATEGORIES_POST]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  return NextResponse.json({ msg: "i think therefore i am", ...params })
}
