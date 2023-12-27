import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { name } = await req.json()

    if (!name) return new NextResponse("No name", { status: 400 })

    const store = await prisma.store.update({
      data: {
        name,
      },
      where: { id: params.storeId, userId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[STORE_ID_PATCH]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const store = await prisma.store.delete({
      where: { id: params.storeId, userId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[STORE_ID_DELETE]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}
