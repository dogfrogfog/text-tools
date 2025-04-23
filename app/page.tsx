"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Download, Copy, Trash2 } from "lucide-react"

export default function TextTransformer() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [mode, setMode] = useState<"input" | "count">("input")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (mode === "count") {
      countWords(e.target.value)
    }
  }

  const countWords = (text: string) => {
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const charCount = text.length
    setResult(`Words: ${wordCount} | Characters: ${charCount}`)
    setMode("count")
  }

  const convertToUpperCase = () => {
    setText(text.toUpperCase())
    setMode("input")
  }

  const convertToLowerCase = () => {
    setText(text.toLowerCase())
    setMode("input")
  }

  const convertToSentenceCase = () => {
    if (!text) return
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const sentenceCaseText = sentences
      .map((sentence) => {
        const trimmed = sentence.trim()
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
      })
      .join(" ")
    setText(sentenceCaseText)
    setMode("input")
  }

  const convertToCapitalizedCase = () => {
    if (!text) return
    const capitalizedText = text
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(" ")
    setText(capitalizedText)
    setMode("input")
  }

  const convertToAlternatingCase = () => {
    if (!text) return
    const alternatingText = text
      .split("")
      .map((char, index) => {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      })
      .join("")
    setText(alternatingText)
    setMode("input")
  }

  const convertToTitleCase = () => {
    if (!text) return
    const smallWords = ["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "so", "the", "to", "up", "yet"]
    const titleCaseText = text
      .split(" ")
      .map((word, index) => {
        if (index === 0 || !smallWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
        return word.toLowerCase()
      })
      .join(" ")
    setText(titleCaseText)
    setMode("input")
  }

  const convertToInverseCase = () => {
    if (!text) return
    const inverseText = text
      .split("")
      .map((char) => {
        return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      })
      .join("")
    setText(inverseText)
    setMode("input")
  }

  const clearText = () => {
    setText("")
    setResult("")
    setMode("input")
  }

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
      document.execCommand("copy")
    }
  }

  const downloadText = () => {
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "transformed-text.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="p-6 max-w-3xl mx-auto">
        <div className="space-y-4">
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your text here..."
            className="min-h-[200px] resize-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-wrap items-start gap-2">
              <p className="text-muted-foreground w-full flex-none">text style</p>
              <Button onClick={convertToUpperCase}>UPPERCASE</Button>
            <Button onClick={convertToLowerCase}>lowercase</Button>
            <Button onClick={convertToSentenceCase}>Sentence case</Button>
            <Button onClick={convertToCapitalizedCase}>Capitalized Case</Button>
            <Button onClick={convertToTitleCase}>Title Case</Button>
            <Button onClick={convertToAlternatingCase}>aLtErNaTiNg CaSe</Button>
            <Button onClick={convertToInverseCase}>Inverse Case</Button>
            <Button onClick={() => countWords(text)}>Count Words</Button>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <p className="text-muted-foreground w-full flex-none">actions</p>
            <Button variant="outline" onClick={copyToClipboard} disabled={!text}>
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" onClick={downloadText} disabled={!text}>
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="destructive" onClick={clearText} disabled={!text}>
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            </div>

          </div>
          {result && (
            <div className="text-muted-foreground">
              {result}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
