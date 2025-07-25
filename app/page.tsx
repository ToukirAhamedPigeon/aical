'use client'

import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"

const banglaToEnglishDigit = (digit: string): string =>
  digit.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d).toString())

const englishToBanglaDigit = (num: string): string =>
  num.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)])

const extractAmounts = (text: string): number[] => {
  const regex = /(?<!\d)([০-৯\d,]+(?:\.\d+)?)(?=\/-)/g
  const matches = [...text.matchAll(regex)]

  return matches.map((match) => {
    let numStr = match[1]
    numStr = banglaToEnglishDigit(numStr)
    numStr = numStr.replace(/,/g, "")
    return parseFloat(numStr)
  })
}

export default function Home() {
  const { register, watch, setValue } = useForm()
  const [total, setTotal] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const text = watch("inputText")

  useEffect(() => {
    const amounts = extractAmounts(text || "")
    const sum = amounts.reduce((acc, curr) => acc + curr, 0)
    setTotal(sum)
  }, [text])

  const totalFormats = [
    {
      label: "English (comma, /-)",
      value: `${total.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}/-`,
    },
    {
      label: "Bangla (comma, /-)",
      value:
        englishToBanglaDigit(
          total.toLocaleString("en-US", { maximumFractionDigits: 2 })
        ) + "/-",
    },
    {
      label: "English (plain)",
      value: total.toFixed(2),
    },
    {
      label: "Bangla (plain)",
      value: englishToBanglaDigit(total.toFixed(2)),
    },
  ]

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    } catch (err) {
      console.error("Copy failed", err)
    }
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-6 p-4">
      <Card>
        <CardContent className="p-4">
        <form>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="inputText"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Paste Your Text Here
            </label>

            <div className="relative">
              <Textarea
                {...register("inputText")}
                id="inputText"
                placeholder="Paste Bangla or English text with amounts like ২৩০৪/- or 2,304/-"
                rows={5}
                className="resize-y overflow-auto pr-10"
              />

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setValue("inputText", "")}
                className="absolute top-2 right-2"
                title="Clear text"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {totalFormats.map((format, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md"
          >
            <span className="font-medium">{format.value}</span>

            <div className="flex items-center gap-2">
              {copiedIndex === i && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  Copied!
                </span>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(format.value, i)}
                title={`Copy ${format.label}`}
              >
                {copiedIndex === i ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
