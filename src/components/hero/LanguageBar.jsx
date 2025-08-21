"use client"

import { useLocale, useTranslations } from "next-intl"
import "flag-icons/css/flag-icons.min.css"
import { Link } from "@/i18n/navigation"

const languages = [
  {
    name: "kidsEnglish",
    learners: "5.3k",
    code: "en-business",
    flagCode: "gb",
    language: "childEnglish",
  },
  {
    name: "english",
    learners: "6.8k",
    code: "en",
    flagCode: "gb",
    language: "English",
  },
  {
    name: "spanish",
    learners: "3.3k",
    code: "es",
    flagCode: "es",
    language: "Spanish",
  },
]

export default function LanguageBar() {
  const locale = useLocale()
  const t = useTranslations("LanguageBar")
  const isRTL = locale === "ar"

  return (
    <div className="max-w-5xl mx-auto mb-8 bg-white border border-gray-200 rounded-lg p-4 hidden sm:block">
      <div className={`grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 ${isRTL ? "mr-30" : "ml-30"}`}>
        {languages.map((lang, index) => (
          <Link 
            href={`/registration?language=${lang.language}`}
            key={index} 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
          >
            <div className="relative w-8 h-8 border border-gray-200 rounded-md overflow-hidden">
              <span 
                className={`fi fi-${lang.flagCode} absolute inset-0`} 
                style={{ 
                  display: 'block',
                  width: '100%', 
                  height: '100%', 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></span>
            </div>
            <div>
              <h4 className="text-sm text-gray-800 font-medium">
                {t(`languages.${lang.name}`)}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}