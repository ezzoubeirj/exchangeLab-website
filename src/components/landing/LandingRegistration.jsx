"use client"

// Registration block for the search-intent landing pages.
// Embeds the EXISTING self-contained ParentForm / StudentForm (which already
// POST to /api/register with finalChoice: 'submission'). Nothing about the
// submission pipeline is duplicated or changed here.
//
// - Kids   -> ParentForm,  pre-seeded language "English"
// - Adults -> StudentForm, pre-seeded language "English"
// - Choice -> a kids/adults toggle, then the matching form
//
// After a successful submit the form calls onSubmit(); we fire the SAME Meta
// Pixel Lead event that RegistrationClient fires, then show a confirmation
// state. A namespaced `reason` value carries the landing-page source into the
// existing `submissions.reason` column.

import { useState } from "react"
import { useLocale } from "next-intl"
import ParentForm from "@/components/parent-form"
import StudentForm from "@/components/student-form"

function trackLead(category) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { content_name: "English", content_category: category })
  }
}

function SuccessCard({ isRTL }) {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-[var(--color-title)] mb-3">
        {isRTL ? "شكراً! تم استلام طلبك." : "Merci ! Votre demande est bien reçue."}
      </h3>
      <p className="text-[var(--color-desc)]">
        {isRTL
          ? "سيتواصل معك فريق XLAB قريباً عبر واتساب أو البريد الإلكتروني لتأكيد المواعيد."
          : "L'équipe XLAB vous recontacte très vite par WhatsApp ou e-mail pour confirmer les horaires."}
      </p>
    </div>
  )
}

export default function LandingRegistration({ audience = "choice", source, content = {} }) {
  const locale = useLocale()
  const isRTL = locale === "ar"

  const reason = source || "landing:english-morocco"

  // 'kids' | 'adults' | null (null = show the choice on the general page)
  const [mode, setMode] = useState(audience === "choice" ? null : audience)
  const [submitted, setSubmitted] = useState(false)

  const [parentInfo, setParentInfo] = useState({ parentName: "", whatsappNumber: "", email: "", country: "" })
  const [childInfo, setChildInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    language: "English",
    userType: "parent",
    reason,
  })
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    language: "English",
    userType: "student",
    reason,
  })

  const c = content

  const BackToChoice = () =>
    audience === "choice" ? (
      <div className="text-center pt-6">
        <button type="button" onClick={() => setMode(null)} className="text-sm text-[#3189c5] hover:underline">
          {isRTL ? "→ تغيير الاختيار" : "← Changer de choix"}
        </button>
      </div>
    ) : null

  return (
    <section id="inscription" className="scroll-mt-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 pt-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-title)]">{c.title}</h2>
        {c.subtitle ? <p className="mt-3 text-[var(--color-desc)]">{c.subtitle}</p> : null}
      </div>

      {submitted ? (
        <SuccessCard isRTL={isRTL} />
      ) : mode === null ? (
        <div className="max-w-md mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMode("kids")}
            className="rounded-2xl border border-[#3189c5]/40 bg-white p-6 text-center font-semibold text-[#3189c5] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {c.choiceKids || (isRTL ? "لطفلي" : "Pour mon enfant")}
          </button>
          <button
            type="button"
            onClick={() => setMode("adults")}
            className="rounded-2xl border border-[#3189c5]/40 bg-white p-6 text-center font-semibold text-[#3189c5] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {c.choiceAdults || (isRTL ? "لي (بالغ)" : "Pour moi (adulte)")}
          </button>
        </div>
      ) : mode === "kids" ? (
        <>
          <BackToChoice />
          <ParentForm
            parentInfo={parentInfo}
            childInfo={childInfo}
            onParentInfoChange={setParentInfo}
            onChildInfoChange={setChildInfo}
            onSubmit={() => {
              trackLead("parent")
              setSubmitted(true)
            }}
          />
        </>
      ) : (
        <>
          <BackToChoice />
          <StudentForm
            studentInfo={studentInfo}
            onStudentInfoChange={setStudentInfo}
            onSubmit={() => {
              trackLead("student")
              setSubmitted(true)
            }}
          />
        </>
      )}
    </section>
  )
}
