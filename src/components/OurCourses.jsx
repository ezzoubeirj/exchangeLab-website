// jsx
"use client"

import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"
import ArrowDown from "./ArrowDown"
import FlowerIcon from "./FlowerIcon"
import { motion, useInView } from "framer-motion"
import { Link } from "@/i18n/navigation"
import { CircleCheckBig } from "lucide-react"
import { Whatsapp } from "@/components/Whatssap"

export default function OurCourses() {
  const t = useTranslations("ourCourses")
  const lineRef = useRef(null)
  const course1Ref = useRef(null)
  const course2Ref = useRef(null)
  const course3Ref = useRef(null)
  const course4Ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const [opacity1, setOpacity1] = useState(1)
  const [opacity2, setOpacity2] = useState(0.5)
  const [opacity3, setOpacity3] = useState(0.5)
  const [opacity4, setOpacity4] = useState(0.5)
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, amount: 0.3 })
  const locale = useLocale()
  const isRTL = locale === "ar"

  useEffect(() => {
    function handleScroll() {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const lineHeight = rect.height
        const start = windowHeight - rect.top
        let scrolled = start / (windowHeight + lineHeight)
        scrolled = Math.min(1, Math.max(0, scrolled))
        setProgress(scrolled)
      }

      function getSectionProgress(ref) {
        if (!ref.current) return 0
        const rect = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top > windowHeight) return 0
        if (rect.bottom < 0) return 1
        const visible = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
        return Math.max(0, Math.min(1, visible / rect.height))
      }

      setOpacity1(getSectionProgress(course1Ref))
      setOpacity2(getSectionProgress(course2Ref))
      setOpacity3(getSectionProgress(course3Ref))
      setOpacity4(getSectionProgress(course4Ref))
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const safeT = (key) => {
    try {
      return t(key)
    } catch {
      return null
    }
  }

  const renderParts = (stepKey) => {
    const isStep4 = stepKey.endsWith("step4")
    const maxCount = isStep4 ? 7 : 9 // step4: part2..part8, others: part2..part10
    return Array.from({ length: maxCount }, (_, i) => `part${i + 2}`).map((part) => {
      const text = safeT(`${stepKey}.${part}`)
      if (!text) return null
      return (
        <li key={part} className="flex items-center gap-3">
          <span className="text-[#3189c5] w-6 flex items-center justify-center">
            <CircleCheckBig aria-hidden="true" />
          </span>
          <span className="text-[#777777]">{text}</span>
        </li>
      )
    })
  }

  return (
    <div className="min-h-screen bg-white relative max-w-7xl mx-auto">
      {/* Vertical Progress Line */}
      <div
        ref={lineRef}
        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-[320px] bottom-[120px] z-20"
        style={{ width: "4px" }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-gray-300 rounded-full"></div>
        <div
          className="absolute left-0 top-0 w-full bg-[#e3342f] rounded-full"
          style={{ height: `${progress * 100}%`, transition: "height 0.2s" }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="text-center pt-20 px-4 relative">
        <div className="flex items-center justify-center gap-4 relative z-10">
          <motion.h1
            ref={titleRef}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c58a2]"
          >
            <FlowerIcon
              style={{ width: 80, height: 80 }}
              className={`text-[#68b9e3] absolute bottom-1 transform ${isRTL ? "-translate-x-50" : "-translate-x-1/2"}`}
            />
            {t("title")}
          </motion.h1>
        </div>
        <div className="absolute top-30 right-1/7 transform -translate-x-1/2 z-10 hidden lg:block">
          <ArrowDown style={{ width: 150, height: 150 }} />
        </div>
        <p className="mt-6 text-base sm:text-lg text-[#777777] max-w-sm mx-auto relative z-10">
          {t("description")}
        </p>
      </div>

      {/* First Course */}
      <div
        ref={course1Ref}
        className="max-w-[1340px] mx-auto px-4 pt-16 mt-5"
        style={{
          transition: "opacity 0.6s, transform 0.6s",
          opacity: opacity1,
          transform: `translateY(${40 * (1 - opacity1)}px)`
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-stretch relative">
          <div className="flex items-center">
            <Image
              src="/cource1.png"
              alt="English courses for adults"
              width={1200}
              height={800}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
              className="w-full lg:w-[500px] h-auto rounded-xl object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 sm:pl-5">
            <h2 className="text-2xl md:text-3xl text-[#2c58a2] font-bold">
              {t("steps.step1.part1")}
            </h2>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-xl mb-4 text-[#595858]">{t("details")}</h3>
              <ul className="space-y-3">{renderParts("steps.step1")}</ul>
            </div>
            <Link
              href="/registration?language=English"
              className="bg-[#3189c5] text-white px-8 py-3 text-lg hover:bg-[#276c9a] transition-colors inline-block self-start z-20 hover:cursor-pointer rounded-xl"
            >
              {t("button")}
            </Link>
          </div>
        </div>
      </div>

      {/* Second Course */}
      <div
        ref={course2Ref}
        className="max-w-[1340px] mx-auto px-4 py-10"
        style={{
          transition: "opacity 0.6s, transform 0.6s",
          opacity: opacity2,
          transform: `translateY(${40 * (1 - opacity2)}px)`
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          <div className="flex flex-col justify-center space-y-6 order-2 md:order-1 pl-0 lg:pl-10 sm:pl-5">
            <h2 className="text-2xl md:text-3xl text-[var(--color-title)] font-bold">
              {t("steps.step2.part1")}
            </h2>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-xl mb-4 text-[#595858]">{t("details")}</h3>
              <ul className="space-y-3">{renderParts("steps.step2")}</ul>
            </div>
            <Link
              href="/registration?language=childEnglish"
              className="bg-[#3189c5] text-white px-8 py-3 text-lg hover:bg-[#276c9a] transition-colors inline-block self-start hover:cursor-pointer rounded-xl"
            >
              {t("button")}
            </Link>
          </div>
          <div className="flex items-center order-1 md:order-2">
            <Image
              src="/cource2.png"
              alt="English courses for children"
              width={1200}
              height={800}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
              className="w-full lg:w-[500px] h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Third Course */}
      <div
        ref={course3Ref}
        className="max-w-[1340px] mx-auto px-4"
        style={{
          transition: "opacity 0.6s, transform 0.6s",
          opacity: opacity3,
          transform: `translateY(${40 * (1 - opacity3)}px)`
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          <div className="flex items-center">
            <Image
              src="/cource3.png"
              alt="Spanish courses for children"
              width={1200}
              height={800}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
              className="w-full lg:w-[500px] h-auto rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 sm:pl-5">
            <h2 className="text-2xl md:text-3xl text-[#2c58a2] font-bold">
              {t("steps.step3.part1")}
            </h2>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-xl mb-4 text-[#595858]">{t("details")}</h3>
              <ul className="space-y-3">{renderParts("steps.step3")}</ul>
            </div>
            <Link
              href="/registration?language=Spanish"
              className="bg-[#3189c5] text-white px-8 py-3 text-lg hover:bg-[#276c9a] transition-colors inline-block self-start hover:cursor-pointer rounded-xl"
            >
              {t("button")}
            </Link>
          </div>
        </div>
      </div>

      {/* Fourth Course (Custom/Corporate) */}
      <div
        ref={course4Ref}
        className="max-w-[1340px] mx-auto px-4 py-10"
        style={{
          transition: "opacity 0.6s, transform 0.6s",
          opacity: opacity4,
          transform: `translateY(${40 * (1 - opacity4)}px)`
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          <div className="flex flex-col justify-center space-y-6 order-2 md:order-1 pl-0 lg:pl-10 sm:pl-5">
            <h2 className="text-2xl md:text-3xl text-[#2c58a2] font-bold">
              {t("steps.step4.part1")}
            </h2>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-xl mb-4 text-[#595858]">{t("details")}</h3>
              <ul className="space-y-3">{renderParts("steps.step4")}</ul>
            </div>
            <Link
                href="https://wa.me/212663244841"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3189c5] text-white px-8 py-3 text-lg hover:bg-[#276c9a] transition-colors inline-block self-start hover:cursor-pointer rounded-xl"
              >
                <div className="flex items-center gap-2">
                <Whatsapp className="h-5 w-5" color="#ffffff" />
                <span>{t("whatsapp")}</span>
                </div>
              
            </Link>
          </div>
          <div className="flex items-center order-1 md:order-2">
            <Image
              src="/cource4.png"
              alt="Custom and corporate courses"
              width={1200}
              height={800}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
              className="w-full lg:w-[500px] h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="py-20"></div>
    </div>
  )
}