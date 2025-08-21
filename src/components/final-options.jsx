"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import toast from "react-hot-toast"
import { Toaster } from 'react-hot-toast'
import { useRouter } from "@/i18n/navigation"
import { useEffect } from "react"

export default function FinalOptions({ formData, onOptionSelect }) {
  const t = useTranslations("FinalOptions")

  const router = useRouter()

  const handleOptionSelect = async (option) => {
    // Here you would send all the form data to your backend
    const registrationData = {
      ...formData,
      language: formData.language === "childEnglish" ? "English" : formData.language,
      finalChoice: 'submission',
    }
    console.log("Selected option: *** *** ** ** ***", registrationData)

    try {
      // Replace with your actual backend endpoint
      console.log("here is the api : /api/register")
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      if (response.ok) {
        if (option === "start_beginning") {
          toast.success('merci pour votre intérêt, nous vous contacterons bientôt')
          setTimeout(() => {
            router.push("/")
          }, 4000);
          return
        }
        onOptionSelect(option)
      } else {
        console.error("Registration failed")
      }
    } catch (error) {
      console.error("Error submitting registration:", error)
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {

    setTimeout(scrollToTop, 0);

  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            minWidth: '350px',
            maxWidth: '500px',
            background: '#fff',
            color: '#222',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            fontSize: '1.1rem',
            fontFamily: 'inherit',
            border: '1px solid #e5e7eb',
            padding: '18px 24px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: '#f0fdf4',
              color: '#065f46',
              border: '1px solid #bbf7d0',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
            },
          },
        }}
      />
      <div className="max-w-2xl mx-auto text-center py-40">
        <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-8">{t("title")}</h1>

        <p className="text-xl text-[#777777] mb-12">
          {t("subtitle", { language: formData.language === "childEnglish" ? "English" : formData.language })}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <Link
            onClick={() => handleOptionSelect("take_test")}
            href={{
              pathname: "/placement-test",
              query: { formData: JSON.stringify(formData) }
            }}

            className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors"
          >
            <div className="text-2xl font-semibold text-gray-900 mb-2">{t("takeTest")}</div>
            <div className="text-[#777777]">{t("takeTestDesc")}</div>
          </Link>

          <button
            onClick={() => handleOptionSelect("start_beginning")}
            className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors"
          >
            <div className="text-2xl font-semibold text-gray-900 mb-2">{t("startBeginning")}</div>
            <div className="text-[#777777]">{t("startBeginningDesc")}</div>
          </button>
        </div>
      </div>
    </>
  )
}
