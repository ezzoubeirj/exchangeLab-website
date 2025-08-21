// jsx
"use client"

import { useTranslations, useLocale, useMessages } from "next-intl"
import { useEffect, useState } from "react"

export default function ReasonSelection({ selectedLanguage, selectedReason, onReasonSelect }) {
  const tReason = useTranslations("ReasonSelection")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const messages = useMessages()

  const [resolvedLanguage, setResolvedLanguage] = useState(null)

  useEffect(() => {
    setResolvedLanguage(selectedLanguage || null)
  }, [selectedLanguage])

  const isSynced = resolvedLanguage !== null && resolvedLanguage === selectedLanguage
  if (!isSynced) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <p className="text-gray-500">Loading…</p>
      </div>
    )
  }

  const scope = messages?.ReasonSelection || {}
  const hasTitleChild = Boolean(scope.titleChild)
  const hasTitleSpanish = Boolean(scope.titleSpanish)

  const languageDisplay = resolvedLanguage

  const title =
    resolvedLanguage === "childEnglish" && hasTitleChild
      ? tReason("titleChild", { language: languageDisplay })
      : resolvedLanguage === "Spanish" && hasTitleSpanish
      ? tReason("titleSpanish", { language: languageDisplay })
      : tReason("title", { language: languageDisplay })

  const prefersChildReasons = resolvedLanguage === "childEnglish"
  const childReasons = messages?.ReasonSelection?.reasonsChild
  const genericReasons = messages?.ReasonSelection?.reasons

  const keys = ["school", "brainExercise", "enjoyLearning", "connectFamily", "upcomingTrip"]

  const reasons = keys.map((k) => {
    if (prefersChildReasons && childReasons?.[k]) {
      return { key: k, text: tReason(`reasonsChild.${k}`) }
    }
    return { key: k, text: tReason(`reasons.${k}`) }
  })

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-12">{title}</h1>

      <div className={`space-y-4 max-w-lg mx-auto ${isRTL ? "text-right" : "text-left"}`}>
        {reasons.map((reason) => (
          <button
            key={reason.key}
            onClick={() => onReasonSelect(reason.text)}
            className={`w-full p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-lg text-gray-700">{reason.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}