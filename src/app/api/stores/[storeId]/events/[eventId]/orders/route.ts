import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(
  req: Request,
  { params: { eventId } }: { params: { storeId: string; eventId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthorized", { status: 403 })

    const { guest_num, date } = await req.json()

    if (!guest_num)
      return new NextResponse("Missing parameters", { status: 400 })

    // const store = await prisma.order.create({
    //   data: {
    //     eventId,
    //     guest_num,
    //     userId,
    // 		dateId:
    //   },
    // })

    const store = { msg: "lol" }

    return NextResponse.json(store)
  } catch (e) {
    console.log("[STORES_POST]", e)
    return new NextResponse("Internal error", { status: 500 })
  }
}
