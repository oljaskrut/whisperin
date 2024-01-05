// Import necessary libraries
import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { task, text } = await request.json()
  if (!task || !text)
    return new NextResponse("No name or description", { status: 400 })

  console.time("creation")
  const res = await openai.beta.threads.createAndRun({
    assistant_id: "asst_r6QWxycemkCdvfjiEyBGgszR",
    thread: {
      messages: [
        {
          content: `IELTS Task Question: ${task}`,
          role: "user",
        },
        {
          content: `IELTS Task Answer: ${text}`,
          role: "user",
        },
      ],
    },
  })
  console.timeEnd("creation")

  let run
  console.time("polling")
  const t0 = performance.now()
  for (let i = 0; i < 1000; i++) {
    run = await openai.beta.threads.runs.retrieve(res.thread_id, res.id)
    if (run.status !== "in_progress") break
    if (performance.now() - t0 > 1000 * 60 * 5) {
      console.timeEnd("polling")
      return NextResponse.json("Timeout", { status: 408 })
    }
  }
  console.timeEnd("polling")

  console.time("retrieving")
  const messages = (
    await openai.beta.threads.messages.list(res.thread_id)
  ).data.map(({ content, role }) => ({ content, role }))
  console.timeEnd("retrieving")
  // @ts-ignore
  return NextResponse.json(messages[0].content[0].text.value)
}
