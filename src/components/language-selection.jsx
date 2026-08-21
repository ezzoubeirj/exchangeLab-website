"use client"

import { useTranslations } from "next-intl"
import "flag-icons/css/flag-icons.min.css"
import { Link } from "@/i18n/navigation"

export default function LanguageSelection({ selectedLanguage, onLanguageSelect }) {
  const t = useTranslations("LanguageSelection")
  const tHome = useTranslations("HomePage")

  const languages = [
    { name: "Spanish", flag: "es", key: "spanish" },
    { name: "English", flag: "gb", key: "english" },
    { name: "childEnglish", flag: "gb", key: "childEnglish" },
  ]

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-12">{t("title")}</h1>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {languages.map((language) => (
          <button
            key={language.name}
            onClick={() => onLanguageSelect(language.name)}
            className="flex items-center space-x-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors text-left w-full"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center  "> 
              <span className={`fi fi-${language.flag} text-2xl`}></span>
            </div>
            <span className="text-xl font-medium text-gray-900">{tHome(language.key)}</span>
          </button>
        ))}
        <Link
          href="/cours-particuliers"
          className="group flex items-center gap-4 p-6 bg-blue-50/70 rounded-2xl border border-blue-200 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-sm transition-all text-left w-full"
        >
          <div className="w-10 h-10 rounded-full bg-[#3a6cb4] text-white flex items-center justify-center shrink-0">
            <span className="text-lg font-bold">1:1</span>
          </div>
          <span className="flex-1 text-xl font-medium text-gray-900">{tHome("oneToOne")}</span>
          <span className="rounded-full bg-[#ef8266]/15 px-2.5 py-1 text-xs font-semibold text-[#d96549]">
            {tHome("newcomer")}
          </span>
        </Link>
      </div>
    </div>
  )
}
