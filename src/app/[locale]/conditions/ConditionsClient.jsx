"use client"

import { useTranslations } from "next-intl"

export default function Conditions() {
  const t = useTranslations("termsAndConditions")

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <header className="mb-8 text-center border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
            <p className="text-gray-600 mb-4">{t("introduction")}</p>
          </header>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                {t("definitions.title")}
              </h2>
              <p className="text-gray-700 mb-4">{t("definitions.subtitle")}</p>
              <ul className="space-y-2 text-gray-700">
                {t.raw("definitions.items").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-600 rounded-full mr-3"></span>
                {t("inscription.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t("inscription.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
                {t("comptes.title")}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <ul className="space-y-3 text-gray-700">
                  {t.raw("comptes.items").map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-orange-600 rounded-full mr-3"></span>
                {t("changement.title")}
              </h2>
              <ul className="space-y-4 text-gray-700">
                {t.raw("changement.items").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-red-600 rounded-full mr-3"></span>
                {t("annulation.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t("annulation.subtitle")}</p>
              <ul className="space-y-4 text-gray-700">
                {t.raw("annulation.items").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-yellow-600 rounded-full mr-3"></span>
                {t("remboursementPartiel.title")}
              </h2>
              <ul className="space-y-4 text-gray-700">
                {t.raw("remboursementPartiel.items").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-teal-600 rounded-full mr-3"></span>
                {t("remboursementComplet.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t("remboursementComplet.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-indigo-600 rounded-full mr-3"></span>
                {t("intimite.title")}
              </h2>
              <ul className="space-y-3 text-gray-700">
                {t.raw("intimite.items").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">© 2024 Exchange Lab.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
