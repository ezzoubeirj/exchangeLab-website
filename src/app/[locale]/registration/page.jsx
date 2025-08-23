// JavaScript
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

// Skeletons
function ProgressBarSkeleton() {
  return (
    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mt-10">
      <div className="h-full bg-gray-300 animate-pulse w-1/3" />
    </div>
  )
}

function StepSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded w-2/3" />
        <div className="h-48 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

// Lazy components with fallbacks
const ProgressBar = dynamic(() => import("@/components/progress-bar"), {
  loading: () => <ProgressBarSkeleton />,
})
const LanguageSelection = dynamic(
  () => import("@/components/language-selection"),
  { loading: () => <StepSkeleton /> }
)
const ReasonSelection = dynamic(
  () => import("@/components/reason-selection"),
  { loading: () => <StepSkeleton /> }
)
const UserTypeSelection = dynamic(
  () => import("@/components/user-type-selection"),
  { loading: () => <StepSkeleton /> }
)
const ParentForm = dynamic(() => import("@/components/parent-form"), {
  loading: () => <StepSkeleton />,
})
const StudentForm = dynamic(() => import("@/components/student-form"), {
  loading: () => <StepSkeleton />,
})
const FinalOptions = dynamic(() => import("@/components/final-options"), {
  loading: () => <StepSkeleton />,
})

export default function RegistrationPage() {
  const searchParams = useSearchParams()
  const languageFromUrl = searchParams.get("language") || ""

  const [currentStep, setCurrentStep] = useState(languageFromUrl ? 2 : 1)
  const [formData, setFormData] = useState({
    language: languageFromUrl,
    reason: "",
    userType: "",
    parentInfo: { parentName: "", whatsappNumber: "", email: "", country: "" },
    childInfo: { firstName: "", lastName: "", age: "" },
    studentInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
    },
  })

  const totalSteps = 6

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LanguageSelection
            selectedLanguage={formData.language}
            onLanguageSelect={(language) => {
              updateFormData("language", language)
              nextStep()
            }}
          />
        )
      case 2:
        return (
          <ReasonSelection
            selectedLanguage={formData.language}
            selectedReason={formData.reason}
            onReasonSelect={(reason) => {
              updateFormData("reason", reason)
              nextStep()
            }}
          />
        )
      case 3:
        return (
          <UserTypeSelection
            selectedType={formData.userType}
            onTypeSelect={(type) => {
              updateFormData("userType", type)
              nextStep()
            }}
          />
        )
      case 4:
        return formData.userType === "parent" ? (
          <ParentForm
            parentInfo={formData.parentInfo}
            childInfo={formData.childInfo}
            onParentInfoChange={(info) => updateFormData("parentInfo", info)}
            onChildInfoChange={(info) => updateFormData("childInfo", info)}
            onSubmit={nextStep}
          />
        ) : (
          <StudentForm
            studentInfo={formData.studentInfo}
            onStudentInfoChange={(info) => updateFormData("studentInfo", info)}
            onSubmit={nextStep}
          />
        )
      case 5:
        return <FinalOptions formData={formData} onOptionSelect={() => {}} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-[100vh] bg-gray-50 mt-10">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="container mx-auto px-4 py-8">{renderCurrentStep()}</div>
    </div>
  )
}