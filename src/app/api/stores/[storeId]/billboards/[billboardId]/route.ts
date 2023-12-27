import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    if (!params.billboardId)
      return new NextResponse("No billboardId", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { label, imageUrl } = await req.json()

    if (!label || !imageUrl)
      return new NextResponse("No parameters", { status: 400 })

    const store = await prisma.billboard.update({
      data: {
        label,
        imageUrl,
      },
      where: { storeId: params.storeId, id: params.billboardId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[BILLBOARD_ID_PATCH]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    if (!params.billboardId)
      return new NextResponse("No billboardId", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const store = await prisma.billboard.delete({
      where: { storeId: params.storeId, id: params.billboardId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[BILLBOARD_ID_DELETE]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}
