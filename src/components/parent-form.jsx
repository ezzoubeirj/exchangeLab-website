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
            <div className="space-y-2">
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
                {t("parentName")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="parentName"
                  type="text"
                  value={parentInfo.parentName}
                  onChange={(e) => handleParentChange("parentName", e.target.value)}
                  onBlur={() => handleBlur("parentName")}
                  required
                  placeholder={t("fullnameplaceholder")}
                  className={`${getInputClass("parentName")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {parentInfo.parentName && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleParentChange("parentName", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("parentName") && (
                <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                {t("whatsappNumber")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="whatsappNumber"
                  type="tel"
                  value={parentInfo.whatsappNumber}
                  onChange={(e) => handleParentChange("whatsappNumber", e.target.value)}
                  onBlur={() => handleBlur("whatsappNumber")}
                  required
                  placeholder="+1 234 567 8900"
                  className={`${getInputClass("whatsappNumber")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {parentInfo.whatsappNumber && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleParentChange("whatsappNumber", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("whatsappNumber") && (
                <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">
                {t("email")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="parentEmail"
                  type="email"
                  value={parentInfo.email}
                  onChange={(e) => handleParentChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  required
                  placeholder="email@example.com"
                  className={`${getInputClass("email")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {parentInfo.email && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleParentChange("email", "")}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
              {shouldShowError("email") && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2" ref={countryDropdownRef}>
              <label htmlFor="parentCountry" className="block text-sm font-medium text-gray-700">
                {t("country")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  onBlur={() => handleBlur("country")}
                  className={`${getInputClass("country")} text-left flex items-center justify-between transition-all duration-300 focus:scale-[1.01]`}
                >
                  <span className={parentInfo.country ? "" : "text-gray-500"}>
                    {parentInfo.country ? getSelectedCountry() : t("selectCountry")}
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
                            className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center space-x-2 transition-colors ${
                              parentInfo.country === country.value ? 'bg-blue-50 font-medium' : ''
                            }`}
                            onClick={() => {
                              handleParentChange("country", country.value);
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

        {/* Child Information Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">{t("childInfo")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700">
                {t("firstName")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="childFirstName"
                  type="text"
                  value={childInfo.firstName}
                  onChange={(e) => handleChildChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  required
                  placeholder={t("childfirstnameplaceholder")}
                  className={`${getInputClass("firstName")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {childInfo.firstName && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleChildChange("firstName", "")}
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
              <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700">
                {t("lastName")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="childLastName"
                  type="text"
                  value={childInfo.lastName}
                  onChange={(e) => handleChildChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  required
                  placeholder={t("childlastnameplaceholder")}
                  className={`${getInputClass("lastName")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
                />
                {childInfo.lastName && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleChildChange("lastName", "")}
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
              <label htmlFor="childAge" className="block text-sm font-medium text-gray-700">
                {t("age")} <span className="text-red-500">*</span>
              </label>
              <input
                id="childAge"
                type="number"
                min="3"
                max="18"
                value={childInfo.age}
                onChange={(e) => handleChildChange("age", e.target.value)}
                onBlur={() => handleBlur("age")}
                required
                placeholder="10"
                className={`${getInputClass("age")} pl-4 transition-all duration-300 focus:scale-[1.01]`}
              />
              {shouldShowError("age") && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>
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