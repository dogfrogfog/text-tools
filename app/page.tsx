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

    // If in count mode, update the result immediately
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

    // Split text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]

    // Capitalize first letter of each sentence
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

    // Capitalize first letter of each word
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

    // Alternate between uppercase and lowercase for each character
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

    // Capitalize first letter of each word except for small words
    const smallWords = [
      "a",
      "an",
      "and",
      "as",
      "at",
      "but",
      "by",
      "for",
      "if",
      "in",
      "nor",
      "of",
      "on",
      "or",
      "so",
      "the",
      "to",
      "up",
      "yet",
    ]

    const titleCaseText = text
      .toLowerCase()
      .split(" ")
      .map((word, index) => {
        // Always capitalize the first word and words that aren't in the smallWords list
        if (index === 0 || !smallWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1)
        }
        return word
      })
      .join(" ")

    setText(titleCaseText)
    setMode("input")
  }

  const convertToInverseCase = () => {
    if (!text) return

    // Invert the case of each character
    const inverseText = text
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase()
        } else {
          return char.toUpperCase()
        }
      })
      .join("")

    setText(inverseText)
    setMode("input")
  }

  const clearText = () => {
    setText("")
    setResult("")
    setMode("input")
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const copyToClipboard = () => {
    if (!text) return

    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Could add a toast notification here
        console.log("Text copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  const downloadText = () => {
    if (!text) return

    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "transformed-text.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-[15vh]">
      {/* Fixed text area and buttons section */}
      <div className="w-full max-w-2xl">
        <Card className="p-4 shadow-lg bg-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <Textarea
                ref={textareaRef}
                placeholder="Enter or paste your text here..."
                className="min-h-[200px] w-full p-4 text-gray-800 resize-none border rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 focus:outline-none"
                value={text}
                onChange={handleTextChange}
              />
            </div>

            <div className="w-full">
              <div className="mb-2 font-medium">Convert Case</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  onClick={convertToSentenceCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Sentence Case
                </Button>
                <Button
                  onClick={convertToLowerCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Lower Case
                </Button>
                <Button
                  onClick={convertToUpperCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Upper Case
                </Button>
                <Button
                  onClick={convertToCapitalizedCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Capitalized Case
                </Button>
                <Button
                  onClick={convertToAlternatingCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Alternating Case
                </Button>
                <Button
                  onClick={convertToTitleCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Title Case
                </Button>
                <Button
                  onClick={convertToInverseCase}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  Inverse Case
                </Button>
                <Button
                  onClick={() => countWords(text)}
                  variant="outline"
                  className={`${mode === "count" ? "bg-yellow-400" : "bg-yellow-300"} hover:bg-yellow-400 text-black border-yellow-400`}
                >
                  Count Words
                </Button>
              </div>
            </div>

            <div className="w-full">
              <div className="mb-2 font-medium">Actions</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Button
                  onClick={downloadText}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Text
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={clearText}
                  variant="outline"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Separate result section that appears without affecting layout */}
      {mode === "count" && (
        <div className="w-full max-w-2xl mt-8">
          <Card className="p-4 shadow-lg bg-white">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Word Count</h2>
            <div className="text-gray-800 min-h-[100px] w-full p-4 bg-gray-50 rounded-lg">{result}</div>
          </Card>
        </div>
      )}
    </div>
  )
}
