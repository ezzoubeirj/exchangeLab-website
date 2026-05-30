"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

function LanguageTestSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded w-2/3" />
        <div className="space-y-3">
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded w-24" />
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

const LanguageTest = dynamic(() => import("@/components/LanguageTest"), {
  loading: () => <LanguageTestSkeleton />,
})

export default function Page() {
  const searchParams = useSearchParams()
  const formDataString = searchParams.get("formData")

  const formData = useMemo(() => {
    if (!formDataString) return null
    try {
      return JSON.parse(formDataString)
    } catch {
      return null
    }
  }, [formDataString])

  return <LanguageTest formData={formData} />
}