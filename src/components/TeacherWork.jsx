"use client"

import { Clock } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

export default function TeacherWork() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3189c5] mb-16">{t("teacherWork.title")}</h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="relative mb-8">
              {/* Number background */}
              <div className="absolute top-0 left-1/3 -translate-x-1/2 z-10 w-32 h-32 flex items-center justify-center">
                <div className="text-6xl font-bold text-blue-100">1</div>
              </div>
              <div className="text-8xl font-bold text-blue-200 mb-4">1</div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#3189c5] mb-4">{t("teacherWork.step1.title")}</h3>
            <p className="text-[#777777] leading-relaxed">{t("teacherWork.step1.description")}</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="relative mb-8">
              {/* Number background */}
              <div className="absolute top-0 left-1/3 -translate-x-1/2 z-10 w-32 h-32 flex items-center justify-center">
                <div className="text-6xl font-bold text-blue-100">2</div>
              </div>
              <div className="text-8xl font-bold text-blue-200 mb-4">2</div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* Browser windows */}
                  <div className="w-20 h-16 bg-blue-300 rounded-lg border-2 border-blue-400">
                    <div className="h-3 bg-blue-400 rounded-t-lg flex items-center px-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute -bottom-2 w-16 h-12 bg-purple-500 rounded-lg border-2 border-purple-600 ${isRTL ? "-left-2" : "-right-2"}`}
                  >
                    <div className="h-2.5 bg-purple-600 rounded-t-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#3189c5] mb-4">{t("teacherWork.step2.title")}</h3>
            <p className="text-[#777777] leading-relaxed">{t("teacherWork.step2.description")}</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="relative mb-8">
              {/* Number background */}
              <div className="absolute top-0 left-1/3 -translate-x-1/2 z-10 w-32 h-32 flex items-center justify-center">
                <div className="text-6xl font-bold text-blue-100">3</div>
              </div>
              <div className="text-8xl font-bold text-blue-200 mb-4">3</div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* Browser with live indicator */}
                  <div className="w-20 h-16 bg-blue-300 rounded-lg border-2 border-blue-400">
                    <div className="h-3 bg-blue-400 rounded-t-lg flex items-center px-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="flex space-x-1">
                        <div className="w-4 h-3 bg-blue-200 rounded"></div>
                        <div className="w-4 h-3 bg-blue-200 rounded"></div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-2 bg-blue-200 rounded"></div>
                        <div className="w-3 h-2 bg-blue-200 rounded"></div>
                        <div className="w-4 h-2 bg-purple-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute -bottom-1 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm ${isRTL ? "-left-3" : "-right-3"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-semibold text-blue-600">LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#3189c5] mb-4">{t("teacherWork.step3.title")}</h3>
            <p className="text-[#777777] leading-relaxed">{t("teacherWork.step3.description")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}