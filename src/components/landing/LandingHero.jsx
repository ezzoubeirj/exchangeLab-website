"use client"

// Landing-page hero — adapted from src/components/hero/Hero.jsx.
// Same visual language (bg, bottom wave, colours, RTL arrows, WhatsApp pill)
// but driven by props and with a CTA that scrolls to the on-page
// registration form (#inscription). A single, simple entrance animation —
// the CTA must never depend on staggered orchestration.

import { ArrowRight, ArrowLeft } from "lucide-react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Whatsapp } from "@/components/Whatssap"
import { motion } from "framer-motion"

export default function LandingHero({ title, subtitle, image, imageAlt, ctaLabel, trustLine }) {
  const locale = useLocale()
  const isRTL = locale === "ar"

  const scrollToForm = (e) => {
    e.preventDefault()
    const el = document.getElementById("inscription")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="relative overflow-hidden bg-[#F2F7FD] flex flex-col mx-auto">
      {/* SVG Wave (same as Hero) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none lg:block hidden">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="#FFFFFF"
          className="w-full h-[40px] xs:h-[60px] sm:h-[80px] lg:h-[120px]"
        >
          <path d="M0,40 C240,120 480,80 720,80 C960,80 1200,120 1440,40 L1440,120 L0,120 Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-12 md:py-20 flex-1 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            className={`space-y-6 md:space-y-8 order-2 lg:order-1 ${isRTL ? "text-right" : "text-left"}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-title)] leading-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[var(--color-desc)] leading-relaxed max-w-none md:max-w-xl">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              {trustLine ? (
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{trustLine}</span>
                </div>
              ) : null}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#inscription"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center bg-[#3189c5] hover:bg-[#276c9a] text-white px-6 py-3 text-lg font-semibold rounded-xl hover:shadow-lg group transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {ctaLabel}
                  {isRTL ? (
                    <ArrowLeft className="mr-3 group-hover:-translate-x-1 h-5 w-5 transition-transform" />
                  ) : (
                    <ArrowRight className="ml-3 group-hover:translate-x-1 h-5 w-5 transition-transform" />
                  )}
                </a>
                <Link
                  href="https://wa.me/212663244841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors border border-green-200"
                >
                  <Whatsapp className="h-5 w-5" color="#34D399" />
                  <span>{isRTL ? "واتساب" : "WhatsApp"}</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative flex justify-center items-center order-1 lg:order-2"
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
              <img src={image} alt={imageAlt} className="relative z-10 w-full h-auto object-contain rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
