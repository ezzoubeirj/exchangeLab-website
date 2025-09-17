"use client"

import { useTranslations } from "next-intl"
import { useState, useRef, useEffect } from "react"
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi"

export default function StudentForm({ studentInfo, onStudentInfoChange, onSubmit }) {
  const t = useTranslations("StudentForm")
  const tCountries = useTranslations("Countries")
  const tErrors = useTranslations("Errors")

  // Country dropdown refs and state
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const countryDropdownRef = useRef(null)
  const searchInputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  // Add error state for form fields
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: ""
  })

  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Track touched fields
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    country: false
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
      case "firstName":
      case "lastName":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (value.trim().length < 2) errorMessage = tErrors("nameMinLength")
        break
      case "email":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = tErrors("invalidEmail")
        break
      case "phoneNumber":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[0-9+\-\s]{7,15}$/.test(value)) errorMessage = tErrors("invalidPhoneNumber")
        break
      case "country":
        if (!value) errorMessage = tErrors("requiredField")
        break
      default:
        break
    }

    return errorMessage
  }

  const handleChange = (field, value) => {
    // Update validation error, but don't display until submit or blur
    const errorMessage = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
    onStudentInfoChange({ ...studentInfo, [field]: value })
  }

  const handleBlur = (field) => {
    // Mark field as touched when it loses focus
    setTouchedFields(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields before submitting
    let formIsValid = true
    const newErrors = { ...errors }
    studentInfo.language = studentInfo.language === 'childEnglish' ? "English" : studentInfo.language;
    const registrationData = {
      studentInfo,
      language: studentInfo.language,
      reason: studentInfo.reason,
      finalChoice: 'submission',
    }
    console.log("student infos: ", registrationData);
    // return; 
    setLoading(true);
    try {
      // Replace with your actual backend endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      if (!response.ok)
        throw new Error('registration failed');
    } catch (error) {
      console.error("Error submitting registration:", error)
    } finally {
      setLoading(false);
    }
    // return;
    // Validate all fields
    for (const field in studentInfo) {
      const errorMessage = validateField(field, studentInfo[field])
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
      onSubmit()
    }
  }

  const getInputClass = (fieldName) => {
    const showError = (formSubmitted || touchedFields[fieldName]) && errors[fieldName]
    return `w-full px-4 py-2.5 rounded-lg border ${showError
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
    const country = countries.find(c => c.value === studentInfo.country);
    return country ? `${country.flag} ${tCountries(country.key)}` : t("selectCountry");
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-serif text-gray-900 mb-8 text-center">{t("title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t("firstName")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  value={studentInfo.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  required
                  placeholder={t("firstnameplaceholder")}
                  className={`${getInputClass("firstName")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {studentInfo.firstName && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleChange("firstName", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("firstName") && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t("lastName")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  value={studentInfo.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  required
                  placeholder={t("lastnameplaceholder")}
                  className={`${getInputClass("lastName")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {studentInfo.lastName && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleChange("lastName", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("lastName") && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("email")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={studentInfo.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  required
                  placeholder="email@example.com"
                  className={`${getInputClass("email")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {studentInfo.email && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleChange("email", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("email") && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                {t("phoneNumber")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  type="tel"
                  value={studentInfo.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  onBlur={() => handleBlur("phoneNumber")}
                  required
                  placeholder={t("phoneplaceholder")}
                  className={`${getInputClass("phoneNumber")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {studentInfo.phoneNumber && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleChange("phoneNumber", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("phoneNumber") && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2" ref={countryDropdownRef}>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {t("country")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  onBlur={() => handleBlur("country")}
                  className={`${getInputClass("country")} text-left flex items-center justify-between transition-all duration-300 focus:scale-[1.01]`}
                >
                  <span className={studentInfo.country ? "" : "text-gray-500"}>
                    {studentInfo.country ? getSelectedCountry() : t("selectCountry")}
                  </span>
                  <FiChevronDown className={`transition-transform duration-200 ${countryDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {countryDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-2 border-b sticky top-0 bg-white">
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={countrySearchQuery}
                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                          placeholder={t("searchCountry")}
                          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-52">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.key}
                            type="button"
                            className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center space-x-2 transition-colors ${studentInfo.country === country.value ? 'bg-blue-50 font-medium' : ''
                              }`}
                            onClick={() => {
                              handleChange("country", country.value);
                              setCountryDropdownOpen(false);
                              setCountrySearchQuery("");
                            }}
                          >
                            <span className="text-xl mr-2">{country.flag}</span>
                            <span>{tCountries(country.key)}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                          {t("noCountriesFound")}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {shouldShowError("country") && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#3189c5] hover:bg-[#276c9a] text-white px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 rounded-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
              </span>
            ) : (
              t("signUp")
            )}
          </button>
        </div>
      </form>
    </div>
  )
}