import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    if (!params.categoriesId)
      return new NextResponse("No categoriesId", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { name, billboardId } = await req.json()

    if (!name || !billboardId)
      return new NextResponse("No name or billboardId", { status: 400 })
    const store = await prisma.category.update({
      data: {
        name,
        billboardId,
      },
      where: { storeId: params.storeId, id: params.categoriesId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[CATEGORIES_ID_PATCH]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } },
) {
  try {
    if (!params.storeId) return new NextResponse("No storeid", { status: 400 })
    if (!params.categoriesId)
      return new NextResponse("No categoriesId", { status: 400 })
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const store = await prisma.category.delete({
      where: { storeId: params.storeId, id: params.categoriesId },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log("[CATEGORIES_ID_DELETE]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}
