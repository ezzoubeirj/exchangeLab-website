"use client"

import { useTranslations } from "next-intl"
import "flag-icons/css/flag-icons.min.css"

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
      </div>
    </div>
  )
}