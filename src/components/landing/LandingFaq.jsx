"use client"

// Page-specific FAQ accordion — mirrors the visual style of
// src/components/FaqAccordion.jsx (rounded cards, 4px left border when open,
// rotating chevron, framer-motion) but takes its questions as a prop so each
// landing page can have its own set.

import { useState } from "react"
import { useLocale } from "next-intl"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LandingFaq({ title, items = [] }) {
  const locale = useLocale()
  const isRTL = locale === "ar"
  const [openIndex, setOpenIndex] = useState(0)

  if (!items.length) return null

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-12 sm:py-16 bg-white">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-title)] mb-12 ${isRTL ? "text-right" : "text-left"}`}>
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={`rounded-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                isOpen ? "bg-white shadow-md" : "bg-gray-50 hover:bg-gray-100"
              }`}
              style={{ borderLeft: isOpen ? "4px solid #3189c5" : "4px solid transparent" }}
            >
              <div className="p-6">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between focus:outline-none ${isRTL ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`text-sm md:text-lg font-medium transition-colors duration-300 ${isRTL ? "text-right" : "text-left"} ${
                      isOpen ? "text-[var(--color-title)]" : "text-gray-700"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.div className="flex-shrink-0" animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <ChevronUp className="w-5 h-5 text-[var(--color-desc)]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ opacity: { duration: 0.2 }, height: { duration: 0.3 } }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-[var(--color-desc)] leading-relaxed text-sm md:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
