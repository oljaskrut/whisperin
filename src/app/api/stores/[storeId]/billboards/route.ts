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

    const { label, imageUrl } = await req.json()

    if (!label || !imageUrl)
      return new NextResponse("No lable of imageurl", { status: 400 })

    const store = await prisma.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[STORES_POST]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  return NextResponse.json({ msg: "i think therefore i am", ...params })
}
