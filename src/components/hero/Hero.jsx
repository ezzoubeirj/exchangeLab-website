"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import CustomWave from "@/components/CustomWave"
import CustomWaveAr from "@/components/CustomWaveAr"
import { Whatsapp } from "@/components/Whatssap"
import { motion } from "framer-motion"

export default function HeroSection() {
  const t = useTranslations("Hero")
  const locale = useLocale()
  const isRTL = locale === "ar"

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (d = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: d },
    }),
  }

  const fadeRight = {
    hidden: { opacity: 0, x: isRTL ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
    },
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: isRTL ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
    },
  }

  return (
    <section className="relative overflow-hidden min-h-[92vh] bg-[#F2F7FD] flex flex-col mx-auto ">
      {/* SVG Wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none lg:block hidden">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="#FFFFFF"
          className="w-full h-[40px] xs:h-[60px] sm:h-[80px] lg:h-[120px]"
        >
          <path
            d="M0,40 C240,120 480,80 720,80 C960,80 1200,120 1440,40 L1440,120 L0,120 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <div className=" max-w-7xl mx-auto py-12  md:py-16 flex-1 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Content Section */}
          <motion.div
            className="space-y-6 md:space-y-8 text-left order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                className={`text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-title)] leading-tight ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                variants={fadeUp}
                custom={0}
              >
                {t("title")}
                <span className="text-[#ff7f6e]"> {t("titleHighlight")}</span>{" "}
                <div className="relative inline-block">
                  <span>{t("titleEnd")}</span>
                  {isRTL ? (
                    <CustomWaveAr className="absolute -left-2 w-[120%] h-100 -bottom-70 z-50 hidden lg:block" />
                  ) : (
                    <CustomWave className="absolute -right-12 w-[120%] h-100 -bottom-60 z-50 hidden lg:block" />
                  )}
                </div>
              </motion.h1>
              <motion.p
                className={`text-base sm:text-lg md:text-xl text-[var(--color-desc)] leading-relaxed max-w-none md:max-w-lg ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                variants={fadeUp}
                custom={0.1}
              >
                {t("subtitle")}
              </motion.p>
            </div>
            <motion.div className="flex flex-col items-start gap-4" variants={fadeUp} custom={0.2}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{t("ads")}</span>
                </div>
                <Link
                  href="https://wa.me/212663244841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors text-sm border border-green-200  relative z-60 "
                >
                  <Whatsapp className="h-5 w-5" color="#34D399" />
                  <span>{t("whatsapp")}</span>
                </Link>
              </div>
              <Link
                href="/registration"
                className="inline-flex items-center bg-[#3189c5] hover:bg-[#276c9a] text-white px-5 py-2 text-lg font-semibold rounded-xl hover:shadow-lg group transition-all duration-300 transform hover:-translate-y-0.5 z-60 relative"
              >
                {t("cta")}
                {locale === 'ar' ? (
                  <ArrowLeft className="mr-3 group-hover:-translate-x-1 h-5 w-5 transition-transform" />
                ) : (
                  <ArrowRight className="ml-3 group-hover:translate-x-1 h-5 w-5 transition-transform" />
                )}
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative flex justify-center items-center order-1 lg:order-2 mt-8 lg:mt-0 "
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
          >
            <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
              <img
                src="/herosection1.png"
                alt="Hero"
                className="relative z-10 w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
