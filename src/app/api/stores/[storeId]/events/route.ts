import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { title, description, images, date, capacity } = await req.json()

    if (!title || !description || !images || !date || !capacity)
      return new NextResponse("Missing parameters", { status: 400 })

    const store = await prisma.event.create({
      data: {
        storeId,
        title,
        images,
        description,
        capacity,
        date: {
          connectOrCreate: {
            create:{date},
						where:{
							
						}
						
          },
        },
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
