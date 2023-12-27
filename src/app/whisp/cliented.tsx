"use client"

import { Button } from "@/components/ui/button"
import {
  Loader2Icon,
  MicIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "lucide-react"
// Import necessary libraries
import { useState, useEffect } from "react"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Cliented({ lang = "en" }) {
  const [result, setResult] = useState("")
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [recording, setRecording] = useState(false)
  const [audo, setAudo] = useState<any>()
  const [mediaRecorder, setMediaRecorder] = useState(null)
  // This array will hold the audio data
  let chunks: any[] = []
  // This useEffect hook sets up the media recorder when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream)
          newMediaRecorder.onstart = () => {
            chunks = []
          }
          newMediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
          }
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: "audio/webm" })
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)
            audio.onerror = function (err) {
              console.error("Error playing audio:", err)
            }
            setAudo(audio)
            // audio.play()
            try {
              const reader = new FileReader()
              reader.readAsDataURL(audioBlob)
              reader.onloadend = async function () {
                const base64Audio = (reader?.result as string).split(",")[1] // Remove the data URL prefix
                setLoading(true)

                const response = await fetch("/api", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ audio: base64Audio, language: lang }),
                })
                setLoading(false)

                const data = await response.json()
                if (!response.ok) {
                  setError(data.error)
                }
                setResult(result + "\n" + data.result)
              }
            } catch (error: any) {
              console.error(error)
              alert(error?.message)
            }
          }
          // @ts-ignore
          setMediaRecorder(newMediaRecorder)
        })
        .catch((err) =>
          setError("Error accessing microphone:" + JSON.stringify(err)),
        )
    }
  }, [])
  // Function to start recording
  const startRecording = () => {
    if (mediaRecorder) {
      // @ts-ignore
      mediaRecorder.start()
      setRecording(true)
    }
  }
  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      // @ts-ignore

      mediaRecorder.stop()
      setRecording(false)
    }
  }
  // Render the component
  return (
    <main className="">
      <div className="flex flex-col justify-center items-center">
        <div className="space-x-4">
          <Button
            className="mb-4"
            variant={"outline"}
            onClick={recording ? stopRecording : startRecording}
          >
            {recording ? <StopCircleIcon /> : <MicIcon />}
          </Button>
          {audo && (
            <Button
              className="mb-4"
              variant={"outline"}
              onClick={() => audo.play()}
            >
              <PlayCircleIcon />
            </Button>
          )}
        </div>
        {error && "Error: " + JSON.stringify(error)}
        <p className="flex max-w-3xl">{result}</p>
        {loading && <Loader2Icon className="animate-spin" />}
      </div>
    </main>
  )
}

/* <div className="space-x-4 mb-8">
          {lang}
          <RadioGroup
            defaultValue="option-one"
            orientation="horizontal"
            className="grid grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
                className="peer sr-only"
                onClick={() => setLang("en")}
              />
              <Label
                htmlFor="option-one"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                English
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
                className="peer sr-only"
                onClick={() => setLang("ru")}
              />
              <Label
                htmlFor="option-two"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Russian
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-three"
                id="option-three"
                className="peer sr-only"
                onClick={() => {
                  setLang("auto")
                  console.log("auto `d")
                }}
              />
              <Label
                htmlFor="option-three"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Auto
              </Label>
            </div>
          </RadioGroup>
        </div> */
