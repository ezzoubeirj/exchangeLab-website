// JavaScript
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

// Skeletons
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

// Lazy components with fallbacks (only for language & reason)
const LanguageSelection = dynamic(
    () => import("@/components/language-selection"),
  { loading: () => <StepSkeleton /> }
  )
  const ReasonSelection = dynamic(
      () => import("@/components/reason-selection"),
    { loading: () => <StepSkeleton /> }
    )
    
    // Normal imports for other components
import ProgressBar from "@/components/progress-bar"
  import UserTypeSelection from "@/components/user-type-selection"
    import ParentForm from "@/components/parent-form"
      import StudentForm from "@/components/student-form"
        import FinalOptions from "@/components/final-options"
          
// Helper: fire a Meta Pixel event safely
function trackPixel(event, params = {}) {
    if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', event, params);
    }
}

export default function RegistrationPage() {
    const searchParams = useSearchParams()
        const languageFromUrl = searchParams.get("language") || ""
          
            const [isLoading, setIsLoading] = useState(true)
                useEffect(() => {
                      const timer = setTimeout(() => setIsLoading(false), 500)
                            return () => clearTimeout(timer)
                }, [])
                  
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
                                      
                                        // Fires Lead event and advances to next step
    const handleFormSubmit = () => {
          trackPixel('Lead', {
                  content_name: formData.language,
                  content_category: formData.userType,
          });
          nextStep();
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
                                                    childInfo={{
                                                                    ...formData.childInfo,
                                                                    language: formData.language,
                                                                    userType: formData.userType,
                                                                    reason: formData.reason
                                                    }}
                                                    onParentInfoChange={(info) => updateFormData("parentInfo", info)}
                                                    onChildInfoChange={(info) => updateFormData("childInfo", info)}
                                                    onSubmit={handleFormSubmit}
                                                  />
                                    ) : (
                                      <StudentForm
                                                    studentInfo={{
                                                                    ...formData.studentInfo,
                                                                    language: formData.language,
                                                                    userType: formData.userType,
                                                                    reason: formData.reason
                                                    }}
                                                    onStudentInfoChange={(info) => updateFormData("studentInfo", info)}
                                                    onSubmit={handleFormSubmit}
                                                  />
                                    )
                case 5:
                          return <FinalOptions formData={formData} onOptionSelect={() => {}} />
                default:
                          return null
              }
        }
          
            if (isLoading) {
                  return <StepSkeleton />
            }
  
    return (
          <div className="min-h-[100vh] bg-gray-50 mt-10">
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                <div className="container mx-auto px-4 py-8">{renderCurrentStep()}</div>
          </div>div>
        )
}
