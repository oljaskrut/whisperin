import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; eventId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    if (!params.eventId) return new NextResponse("No eventId", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { title, description, images, date, active } = await req.json()

    // if (!title || !description || !images || !date)
    // return new NextResponse("Missing parameters", { status: 400 })

    const store = await prisma.event.update({
      data: {
        title,
        description,
        images,
        date,
        active,
      },
      where: { id: params.eventId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[BILLBOARD_ID_PATCH]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; eventId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    if (!params.eventId) return new NextResponse("No eventId", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const store = await prisma.event.delete({
      where: { id: params.eventId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[BILLBOARD_ID_DELETE]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}
