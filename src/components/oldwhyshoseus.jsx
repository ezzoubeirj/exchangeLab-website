"use client"

import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import { Users, Monitor, MessageCircle, UserCheck } from "lucide-react"
import { useState, useEffect } from "react"
import TypingAnimation from "./hero/TypingAnimation"

const WhyChooseUs = () => {
  const t = useTranslations("WhyChooseUs")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const [animateItems, setAnimateItems] = useState(false)

  // Apply appropriate font class based on locale
  const fontClass = isRTL ? "tajawal-medium" : "open-sans-medium"
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateItems(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      id: 1,
      text: t("feature1"),
      icon: 'svg1.svg',
    },
    {
      id: 2,
      text: t("feature2"),
      icon: 'svg2.svg',
    },
    {
      id: 3,
      text: t("feature3"),
      icon: 'svg3.svg',
    },
    {
      id: 4,
      text: t("feature4"),
      icon: 'svg4.svg',
    },
  ]

  return (
    <section className="py-10 bg-white relative overflow-hidden">

      <div className={cn(
        "container mx-auto px-4 relative z-10",
        isRTL ? "rtl" : "ltr"
      )}>
        <div className="mb-8 text-center">
          <TypingAnimation />
          {/* Decorative SVG divider */}
          <div className="flex justify-center my-4">
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse-subtle">
              <rect x="0" y="5" width="40" height="2" rx="1" fill="#3189c5" />
              <circle cx="60" cy="6" r="6" fill="#3189c5" />
              <rect x="80" y="5" width="40" height="2" rx="1" fill="#3189c5" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            return (
              <div
                key={feature.id}
                className={cn(
                  "flex flex-col items-center text-center p-6 rounded-xl transition-all duration-500 relative",
                  fontClass,
                  animateItems 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: `${index * 80}ms`
                }}
              >
                {/* Decorative corner SVGs */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                  className="absolute top-0 left-0 text-blue-300 opacity-70 -translate-x-3 -translate-y-3">
                  <path d="M6 2H2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 right-0 text-blue-300 opacity-70 translate-x-3 -translate-y-3">
                  <path d="M18 2H22V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-0 text-blue-300 opacity-70 -translate-x-3 translate-y-3">
                  <path d="M6 22H2V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 right-0 text-blue-300 opacity-70 translate-x-3 translate-y-3">
                  <path d="M18 22H22V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                {/* Icon */}
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 relative"
                )}>
                  <img src={feature.icon} className="w-full h-full" />
                </div>

                {/* Feature Text */}
                <p className={cn(
                  "text-gray-700 text-sm md:text-base leading-relaxed relative z-10",
                  isRTL ? "tajawal-medium" : "open-sans-medium"
                )}>
                  {feature.text}
                </p>
                
                {/* Decorative dots pattern */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`dots-${feature.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="#3189c5" opacity="0.1" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#dots-${feature.id})`} />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
