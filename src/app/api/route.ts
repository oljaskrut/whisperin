// Import necessary libraries
import OpenAI from "openai"
import { exec } from "child_process"
import fs from "fs"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Promisify the exec function from child_process
const util = require("util")
const execAsync = util.promisify(exec)
// Configure the OpenAI API client

export async function GET() {
  return NextResponse.json({ msg: "sau" })
}

// This function handles POST requests to the /api/speechToText route
export async function POST(request: Request) {
  // Check if the OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
      { status: 500 },
    )
  }
  // Parse the request body
  const req = await request.json()
  // Extract the audio data from the request body
  const base64Audio = req.audio
  // Convert the Base64 audio data back to a Buffer
  const audio = Buffer.from(base64Audio, "base64")

  try {
    // Convert the audio data to text
    console.log(req.language)
    const text = await convertAudioToText(audio, req.language)
    // Return the transcribed text in the response
    return NextResponse.json({ result: text }, { status: 200 })
  } catch (error: any) {
    // Handle any errors that occur during the request
    if (error.response) {
      console.error(error.response.status, error.response.data)
      return NextResponse.json({ error: error.response.data }, { status: 500 })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}
// This function converts audio data to text using the OpenAI API
async function convertAudioToText(audioData: any, lang = "en") {
  const inputPath = "/tmp/input.webm"
  fs.writeFileSync(inputPath, audioData)
  console.log("recorded")

  // Transcribe the audio
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(inputPath),
    model: "whisper-1",
    ...(lang != "auto" && { language: lang }),
  })
  // Delete the temporary file
  fs.unlinkSync(inputPath)
  // The API response contains the transcribed text
  const transcribedText = response.text
  console.log(transcribedText)
  return transcribedText
}
