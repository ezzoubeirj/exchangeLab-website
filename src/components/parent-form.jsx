"use client"

import { useTranslations } from "next-intl"
import { useState, useRef, useEffect } from "react"
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi"

export default function ParentForm({ parentInfo, childInfo, onParentInfoChange, onChildInfoChange, onSubmit }) {
  const t = useTranslations("ParentForm")
  const tCountries = useTranslations("Countries")
  const tErrors = useTranslations("Errors")
  
  // Country dropdown refs and state
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const countryDropdownRef = useRef(null)
  const searchInputRef = useRef(null)
  
  // Add error state for form fields
  const [errors, setErrors] = useState({
    parentName: "",
    whatsappNumber: "",
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    age: ""
  })
  
  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // Track touched fields
  const [touchedFields, setTouchedFields] = useState({
    parentName: false,
    whatsappNumber: false,
    email: false,
    country: false,
    firstName: false,
    lastName: false,
    age: false
  })

  const countries = [
    // North America
    { key: "morocco", value: "Morocco", flag: "🇲🇦" },
    { key: "unitedStates", value: "United States", flag: "🇺🇸" },
    { key: "canada", value: "Canada", flag: "🇨🇦" },
    { key: "mexico", value: "Mexico", flag: "🇲🇽" },
    
    // Europe
    { key: "unitedKingdom", value: "United Kingdom", flag: "🇬🇧" },
    { key: "germany", value: "Germany", flag: "🇩🇪" },
    { key: "france", value: "France", flag: "🇫🇷" },
    { key: "spain", value: "Spain", flag: "🇪🇸" },
    { key: "italy", value: "Italy", flag: "🇮🇹" },
    { key: "netherlands", value: "Netherlands", flag: "🇳🇱" },
    { key: "belgium", value: "Belgium", flag: "🇧🇪" },
    { key: "portugal", value: "Portugal", flag: "🇵🇹" },
    { key: "sweden", value: "Sweden", flag: "🇸🇪" },
    { key: "denmark", value: "Denmark", flag: "🇩🇰" },
    { key: "norway", value: "Norway", flag: "🇳🇴" },
    { key: "finland", value: "Finland", flag: "🇫🇮" },
    { key: "ireland", value: "Ireland", flag: "🇮🇪" },
    { key: "austria", value: "Austria", flag: "🇦🇹" },
    { key: "switzerland", value: "Switzerland", flag: "🇨🇭" },
    { key: "greece", value: "Greece", flag: "🇬🇷" },
    { key: "poland", value: "Poland", flag: "🇵🇱" },
    { key: "czechRepublic", value: "Czech Republic", flag: "🇨🇿" },
    { key: "hungary", value: "Hungary", flag: "🇭🇺" },
    { key: "romania", value: "Romania", flag: "🇷🇴" },
    { key: "bulgaria", value: "Bulgaria", flag: "🇧🇬" },
    { key: "croatia", value: "Croatia", flag: "🇭🇷" },
    { key: "serbia", value: "Serbia", flag: "🇷🇸" },
    { key: "slovenia", value: "Slovenia", flag: "🇸🇮" },
    { key: "slovakia", value: "Slovakia", flag: "🇸🇰" },
    { key: "lithuania", value: "Lithuania", flag: "🇱🇹" },
    { key: "latvia", value: "Latvia", flag: "🇱🇻" },
    { key: "estonia", value: "Estonia", flag: "🇪🇪" },
    { key: "ukraine", value: "Ukraine", flag: "🇺🇦" },
    
    // Africa
    { key: "algeria", value: "Algeria", flag: "🇩🇿" },
    { key: "tunisia", value: "Tunisia", flag: "🇹🇳" },
    { key: "egypt", value: "Egypt", flag: "🇪🇬" },
    { key: "libya", value: "Libya", flag: "🇱🇾" },
    { key: "nigeria", value: "Nigeria", flag: "🇳🇬" },
    { key: "southAfrica", value: "South Africa", flag: "🇿🇦" },
    { key: "kenya", value: "Kenya", flag: "🇰🇪" },
    { key: "ethiopia", value: "Ethiopia", flag: "🇪🇹" },
    { key: "ghana", value: "Ghana", flag: "🇬🇭" },
    { key: "senegal", value: "Senegal", flag: "🇸🇳" },
    { key: "cameroon", value: "Cameroon", flag: "🇨🇲" },
    { key: "ivoryCoast", value: "Ivory Coast", flag: "🇨🇮" },
    { key: "uganda", value: "Uganda", flag: "🇺🇬" },
    { key: "tanzania", value: "Tanzania", flag: "🇹🇿" },
    { key: "sudan", value: "Sudan", flag: "🇸🇩" },
    { key: "rwanda", value: "Rwanda", flag: "🇷🇼" },
    
    // Middle East & Arab Countries
    { key: "saudiArabia", value: "Saudi Arabia", flag: "🇸🇦" },
    { key: "unitedArabEmirates", value: "United Arab Emirates", flag: "🇦🇪" },
    { key: "qatar", value: "Qatar", flag: "🇶🇦" },
    { key: "kuwait", value: "Kuwait", flag: "🇰🇼" },
    { key: "bahrain", value: "Bahrain", flag: "🇧🇭" },
    { key: "oman", value: "Oman", flag: "🇴🇲" },
    { key: "jordan", value: "Jordan", flag: "🇯🇴" },
    { key: "lebanon", value: "Lebanon", flag: "🇱🇧" },
    { key: "iraq", value: "Iraq", flag: "🇮🇶" },
    { key: "syria", value: "Syria", flag: "🇸🇾" },
    { key: "yemen", value: "Yemen", flag: "🇾🇪" },
    
    // Asia-Pacific
    { key: "australia", value: "Australia", flag: "🇦🇺" },
    { key: "newZealand", value: "New Zealand", flag: "🇳🇿" },
    { key: "japan", value: "Japan", flag: "🇯🇵" },
    { key: "southKorea", value: "South Korea", flag: "🇰🇷" },
    { key: "china", value: "China", flag: "🇨🇳" },
    { key: "india", value: "India", flag: "🇮🇳" },
    { key: "indonesia", value: "Indonesia", flag: "🇮🇩" },
    { key: "malaysia", value: "Malaysia", flag: "🇲🇾" },
    { key: "singapore", value: "Singapore", flag: "🇸🇬" },
    { key: "thailand", value: "Thailand", flag: "🇹🇭" },
    { key: "vietnam", value: "Vietnam", flag: "🇻🇳" },
    { key: "philippines", value: "Philippines", flag: "🇵🇭" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setCountryDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (countryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [countryDropdownOpen]);


  const validateField = (field, value) => {
    let errorMessage = ""
    
    switch (field) {
      case "parentName":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (value.trim().length < 2) errorMessage = tErrors("nameMinLength")
        break
      case "whatsappNumber":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[0-9+\-\s]{7,15}$/.test(value)) errorMessage = tErrors("invalidPhoneNumber")
        break
      case "email":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = tErrors("invalidEmail")
        break
      case "country":
        if (!value) errorMessage = tErrors("requiredField")
        break
      case "firstName":
      case "lastName":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (value.trim().length < 2) errorMessage = tErrors("nameMinLength")
        break
      case "age":
        if (!value) errorMessage = tErrors("requiredField")
        else if (isNaN(value) || value < 3 || value > 18) errorMessage = tErrors("invalidAge")
        break
      default:
        break
    }
    
    return errorMessage
  }

  const handleParentChange = (field, value) => {
    const errorMessage = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
    onParentInfoChange({ ...parentInfo, [field]: value })
  }

  const handleChildChange = (field, value) => {
    const errorMessage = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
    onChildInfoChange({ ...childInfo, [field]: value })
  }
  
  const handleBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("you should save the user here ***")
    // Validate all fields before submitting
    let formIsValid = true
    const newErrors = { ...errors }
    
    // Validate parent fields
    for (const field in parentInfo) {
      const errorMessage = validateField(field, parentInfo[field])
      newErrors[field] = errorMessage
      if (errorMessage) formIsValid = false
    }
    
    // Validate child fields
    for (const field in childInfo) {
      const errorMessage = validateField(field, childInfo[field])
      newErrors[field] = errorMessage
      if (errorMessage) formIsValid = false
    }
    
    setErrors(newErrors)
    setFormSubmitted(true)
    
    // Mark all fields as touched on submit
    const allTouched = {}
    for (const field in touchedFields) {
      allTouched[field] = true
    }
    setTouchedFields(allTouched)
    
    if (formIsValid) {
      // 🔔 META PIXEL — registration success
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq('track', 'CompleteRegistration')
        window.fbq('trackCustom', 'LeadFormSubmitted')
      }

      // Your actual submit callback
      onSubmit()
    }
  }

  const getInputClass = (fieldName) => {
    const showError = (formSubmitted || touchedFields[fieldName]) && errors[fieldName]
    return `w-full px-4 py-2.5 rounded-lg border ${
      showError
        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
        : "border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    } transition-all duration-200 outline-none`
  }
  
  const shouldShowError = (fieldName) => {
    return (formSubmitted || touchedFields[fieldName]) && errors[fieldName]
  }

  // Filter countries based on search query
  const filteredCountries = countries.filter(country => 
    country.value.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
    tCountries(country.key).toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  // Get selected country with flag
  const getSelectedCountry = () => {
    const country = countries.find(c => c.value === parentInfo.country);
    return country ? `${country.flag} ${tCountries(country.key)}` : t("selectCountry");
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-serif text-gray-900 mb-8 text-center">{t("title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Parent Information Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">{t("parentInfo")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ...inputs unchanged... */}
          </div>
        </div>

        {/* Child Information Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">{t("childInfo")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ...inputs unchanged... */}
          </div>
        </div>

        <div className="text-center pt-4">
          <button 
            type="submit" 
            className="w-full bg-[#3189c5] hover:bg-[#276c9a] text-white px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 rounded-lg"
          >
            {t("signupChild")}
          </button>
        </div>
      </form>
    </div>
  )
}
