"use client"

import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Star, Play, Copy } from "lucide-react"
import Image from "next/image"

export default function HowItWorks() {
  const t = useTranslations("howItWorks")
  const locale = useLocale()
  const isRTL = locale === "ar"

  const packages = [
    { key: "sPackage", color: "bg-blue-500" },
    { key: "mPackage", color: "bg-blue-600" },
    { key: "lPackage", color: "bg-blue-700" },
    { key: "xlPackage", color: "bg-blue-800" },
  ]

  const steps = [
    {
      number: t("step1.number"),
      title: t("step1.title"),
      description: t("step1.description"),
      content: "packages",
    },
    {
      number: t("step2.number"),
      title: t("step2.title"),
      description: t("step2.description"),
      content: "booking",
    },
    {
      number: t("step3.number"),
      title: t("step3.title"),
      description: t("step3.description"),
      content: "video",
    },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero.jpg" alt="Hero background" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/90 to-blue-100/90"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "lg:grid-cols-2" : ""}`}>
            <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
              {/* Discount Badge */}
              <div className="inline-block">
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {t("discount")}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{t("title")}</h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-700 max-w-2xl">{t("subtitle")}</p>

              {/* Language Selection and CTA */}
              <div className="space-y-4">
                <p className="text-sm text-[#777777] font-medium">{t("languageSelect")}</p>

                <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]">
                      <option>Français</option>
                      <option>العربية</option>
                    </select>
                    <ChevronDown
                      className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`}
                    />
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
                    {t("startButton")}
                  </Button>
                </div>
              </div>

              {/* Trustpilot Rating */}
              <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Bien</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-[#777777]">5328 {t("trustpilot")} Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-cols-2" : ""}`}
              >
                {/* Step Content */}
                <div
                  className={`space-y-6 ${isRTL ? "text-right" : "text-left"} ${index % 2 === 1 && !isRTL ? "lg:order-2" : ""}`}
                >
                  <div className="space-y-4">
                    <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">{step.number}</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{step.title}</h2>
                    <p className="text-lg text-[#777777] max-w-lg">{step.description}</p>
                  </div>
                </div>

                {/* Step Visual Content */}
                <div className={`${index % 2 === 1 && !isRTL ? "lg:order-1" : ""}`}>
                  {step.content === "packages" && (
                    <div className="space-y-6">
                      <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                        <Button variant="default" className="bg-blue-600 text-white">
                          {t("packages.groupClasses")}
                        </Button>
                        <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
                          {t("packages.oneToOneClasses")}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {packages.map((pkg, i) => (
                          <Card key={i} className="border border-gray-200 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 text-center space-y-4">
                              <h3 className="font-semibold text-gray-900">{t(`packages.${pkg.key}`)}</h3>
                              <div className={`h-12 ${pkg.color} rounded`}></div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.content === "booking" && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-white text-2xl font-bold">📅</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{t("step2.title")}</h3>
                        <p className="text-[#777777]">{t("step2.description")}</p>
                      </div>
                    </div>
                  )}

                  {step.content === "video" && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 text-center">{t("classPreview.title")}</h3>
                      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl overflow-hidden aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                              <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                            <div className="text-white space-y-2">
                              <h4 className="text-2xl font-bold">{t("classPreview.videoTitle")}</h4>
                              <p className="text-lg opacity-90">Français B1 avec Dani</p>
                            </div>
                          </div>
                        </div>
                        <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {t("classPreview.copyLink")}
                          </Button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/80 text-white px-3 py-1 rounded text-sm">Watch on YouTube</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
