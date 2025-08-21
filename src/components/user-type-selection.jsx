"use client"

import { useTranslations } from "next-intl"

export default function UserTypeSelection({ selectedType, onTypeSelect }) {
  const t = useTranslations("UserTypeSelection")

  return (
    <div className="max-w-2xl mx-auto text-center py-40">
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-12">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
        <button
          onClick={() => onTypeSelect("parent")}
          className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors"
        >
          <div className="text-2xl font-semibold text-gray-900 mb-2">{t("parent")}</div>
          <div className="text-[#777777]">{t("parentDesc")}</div>
        </button>

        <button
          onClick={() => onTypeSelect("student")}
          className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors"
        >
          <div className="text-2xl font-semibold text-gray-900 mb-2">{t("student")}</div>
          <div className="text-[#777777]">{t("studentDesc")}</div>
        </button>
      </div>
    </div>
  )
}
