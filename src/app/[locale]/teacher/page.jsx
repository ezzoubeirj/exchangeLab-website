// jsx
"use client"

import { useState, useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import TeacherLive from "@/components/TeacherLive"
import WhyUs from "@/components/WhyUs"
import TeacherWork from "@/components/TeacherWork"
import CircularTeamUI from "@/components/CircularTeamUi"
import { Check } from "lucide-react"
import { motion, useInView } from 'framer-motion';
import { useEffect } from "react"

export default function TeacherApplicationForm() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isRTL = locale === "ar"

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    motivation: "",
    cv: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const formRef = useRef(null)
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      cv: e.target.files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const data = new FormData()
      data.append("firstName", formData.firstName)
      data.append("lastName", formData.lastName)
      data.append("phone", formData.phone)
      data.append("email", formData.email)
      data.append("motivation", formData.motivation)
      if (formData.cv) {
        data.append("cv", formData.cv)
      }

      const res = await fetch("/api/teacher", {
        method: "POST",
        body: data,
      })

      const result = await res.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.message || t("formTeacher.error"))
      }
    } catch (err) {
      setError(t("formTeacher.error"))
    } finally {
      setIsSubmitting(false)
    }
  }



  const formInView = useInView(formRef, { once: true, amount: 0.3 })

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    if (submitted) {
      setTimeout(scrollToTop, 0);
    }
  }, [submitted]);
  
  if (submitted) {
    setTimeout(scrollToTop, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 max-w-full sm:max-w-md w-full text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">{t("successTeacher.title")}</h2>
          <p className="text-[#777777] text-base sm:text-lg leading-relaxed">{t("successTeacher.message")}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("successTeacher.button")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen">
        <div className="min-h-full relative">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10 min-h-screen">
            <Image src="/teacherbg.png" alt="teacher background" fill className="object-cover w-full h-full" priority />
          </div>

          {/* Content: Left info + Right CircularTeamUI */}
          <div className={`max-w-[1370px] mx-auto px-2 sm:px-4 ${isRTL ? 'md:px-20' : 'md:px-10'} py-0 md:py-0 lg:py-16 relative`}>
            <div className="flex flex-col xl:flex-row gap-0 lg:gap-0 items-stretch">
              {/* Right Side - CircularTeamUI */}
              <div className={`w-full [@media(min-width:1346px)]:w-[50%] xl:w-[60%] flex items-center justify-center mt-8 lg:mt-0 static xl:absolute  top-[-40px] ${isRTL ? 'left-20 mr-0 xs:mr-20 sm:mr-3 md:mr-10' : 'right-20 -ml-7 xs:-ml-20 sm:-ml-5 md:-ml-10'}`}> 
                  <CircularTeamUI />
              </div>
              {/* Left Side - Hero Info */}
              <div className="w-full [@media(min-width:1346px)]:w-[50%] xl:w-[40%] flex items-center">
               
                <div className="w-full flex items-center py-20 px-8 lg-px-0  lg:pl-20">
                  <div className="w-full">
                    {/* Content directly on background - no container */}
                    <div className="relative w-full">
                      {/* Main Heading */}
                      <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-4xl font-bold text-[#2c58a2] leading-tight mb-6 drop-shadow-2xl">
                        {t("newHeroTeacher.title")}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-lg sm:text-xl lg:text-lg text-[#777777]/90 mb-8 leading-relaxed drop-shadow-lg max-w-2xl">
                        {t("newHeroTeacher.description")}
                      </p>
                      {/* Feature List with Icons */}
                      <div className="space-y-1 mb-10">
                        <div className="flex items-center gap-4 text-base sm:text-lg text-[#777777]">
                          <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                            <Check className="w-5 h-5 text-[#777777]"/>
                          </div>
                          <span className="drop-shadow-lg">{t("newHeroTeacher.note1")}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-base sm:text-lg text-[#777777]">
                          <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                          <Check className="w-5 h-5 text-[#777777]"/>
                          </div>
                          <span className="drop-shadow-lg">{t("newHeroTeacher.note2")}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-base sm:text-lg text-[#777777]">
                          <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                          <Check className="w-5 h-5 text-[#777777]"/>
                          </div>
                          <span className="drop-shadow-lg">{t("newHeroTeacher.note3")}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={scrollToForm}
                        className="group relative bg-[#3189c5] backdrop-blur-md hover:bg-[#276c9a] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl  transform hover:-translate-y-1 flex items-center gap-3 border border-white/30 hover:cursor-pointer "
                      >
                        <span className="text-lg"> {t("newHeroTeacher.applyNow")}</span>
                        {/* <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg> */}
                        {isRTL ? (
                          <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 7l-5 5m0 0l5 5m-5-5h12" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        )}
                      </button>

                      {/* Languages Section */}
                      {/* <div className="pt-6 border-t border-white/20">
                        <p className="text-lg font-semibold text-white mb-4 drop-shadow-lg">
                          Languages in High Demand:
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="group flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-3 transition-all duration-200 hover:bg-white/30">
                            <span className="text-3xl group-hover:scale-110 transition-transform" role="img" aria-label="Spanish flag">🇪🇸</span>
                            <span className="text-base font-medium text-white">Spanish</span>
                          </div>
                          <div className="group flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-3 transition-all duration-200 hover:bg-white/30">
                            <span className="text-3xl group-hover:scale-110 transition-transform" role="img" aria-label="English flag">🇬🇧</span>
                            <span className="text-base font-medium text-white">English</span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeacherLive />
      <WhyUs />

    {/* Application Form - Compact & Modern */}
    <section ref={formRef} id="teacher-application-form" className="h-screen bg-white flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={formInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          {/* Header */}
          <div className="bg-[#3189c5] px-6 py-4">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-lg font-semibold text-white">{t("formTeacher.title")}</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                  {t("formTeacher.firstName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={t("formTeacher.placeholdersTeacher.firstName")}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                  {t("formTeacher.lastName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={t("formTeacher.placeholdersTeacher.lastName")}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                  {t("formTeacher.phone")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={t("formTeacher.placeholdersTeacher.phone")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                  {t("formTeacher.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={t("formTeacher.placeholdersTeacher.email")}
                />
              </div>
            </div>

            {/* Two Column Layout for Motivation and CV */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Motivation */}
              <div>
                <label htmlFor="motivation" className="block text-xs font-medium text-gray-700 mb-1">
                  {t("formTeacher.motivationTeacher.label")} <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">{t("formTeacher.motivationTeacher.description")}</p>
                <div className="relative">
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    maxLength={800}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                    placeholder={t("formTeacher.motivationTeacher.placeholder")}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-1 rounded">
                    {formData.motivation.length}/800
                  </div>
                </div>
              </div>

              {/* CV Upload and Submit */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="cv" className="block text-xs font-medium text-gray-700 mb-1">
                    {t("formTeacher.cvTeacher.label")} <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">{t("formTeacher.cvTeacher.description")}</p>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3189c5] hover:bg-[#276c9a] disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("formTeacher.submitting")}
                    </>
                  ) : (
                    <>
                      <span>{t("formTeacher.submit")}</span>
                      <svg
                        className={`${locale === "ar" ? "mr-2 rotate-180" : "ml-2"} w-4 h-4`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
    </>
  )
}