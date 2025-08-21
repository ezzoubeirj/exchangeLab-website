"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import ProgressBar from "@/components/progress-bar"
import LanguageSelection from "@/components/language-selection"
import ReasonSelection from "@/components/reason-selection"
import UserTypeSelection from "@/components/user-type-selection"
import ParentForm from "@/components/parent-form"
import StudentForm from "@/components/student-form"
import FinalOptions from "@/components/final-options"

export default function RegistrationPage() {
  const searchParams = useSearchParams()
  const languageFromUrl = searchParams.get("language")

  const [currentStep, setCurrentStep] = useState(languageFromUrl ? 2 : 1)
  const [formData, setFormData] = useState({
    language: languageFromUrl || "",
    reason: "",
    userType: "", // 'parent' or 'student'
    parentInfo: {
      parentName: "",
      whatsappNumber: "",
      email: "",
      country: "",
    },
    childInfo: {
      firstName: "",
      lastName: "",
      age: "",
    },
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

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
        return (
          <FinalOptions
            formData={formData}
            onOptionSelect={() => {}}
          />
        )
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
