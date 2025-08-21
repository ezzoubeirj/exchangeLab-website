"use client"

import { useTranslations, useLocale } from "next-intl"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import WorksTestimonial from "@/components/WorksTestimonial"
import VideoSection from "@/components/VideoSection"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"



export default function HowItWorks() {
  const t = useTranslations("howItWorks")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const router = useRouter();

 
  // Add these refs at the top of your component
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  
  // Add these useInView hooks
  const sectionInView = useInView(sectionRef, { once: true, threshold: 0.1 })
  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 })
  const gridInView = useInView(gridRef, { once: true, threshold: 0.2 })
  

  const packages = [
    { key: "sPackage", color: "bg-blue-500" },
    { key: "mPackage", color: "bg-blue-600" },
    { key: "lPackage", color: "bg-blue-700" },
    { key: "xlPackage", color: "bg-blue-800" },
  ]

  const steps = [
    {
      number: t("step1.number"),
      title: t("step1.title"),
      description: t("step1.description"),
      content: "packages",
    },
    {
      number: t("step2.number"),
      title: t("step2.title"),
      description: t("step2.description"),
      content: "booking",
    },
    {
      number: t("step3.number"),
      title: t("step3.title"),
      description: t("step3.description"),
      content: "video",
    },
  ]

  return (
    <div className={`min-h-screen `}>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden py-16">
          {/* Mobile: Background image and content */}
          <div className="block md:hidden">
            <div className="relative h-[50vh] w-full">
              {isRTL ? (
                <Image
                  src="/howitworksarab.png"
                  alt="Hero background"
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <Image
                  src="/howitworks.png"
                  alt="Hero background"
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-slate-900/20" />
            </div>
            
            {/* Mobile content below image */}
            <div className="px-6 py-8 bg-white">
              {/* Title */}
              <h1 className="text-3xl font-bold text-[#2c58a2] leading-tight mb-4">
                {t("title")}
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-[#777777] mb-6 leading-relaxed">
                {t("subtitle")}
              </p>

              {/* Language Selection and CTA */}
              <div className="space-y-5">
                <p className="text-sm text-slate-600 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {t("languageSelect")}
                </p>

                <div className="space-y-4">
                  <div className="relative w-full">
                    <div className="relative">
                      <button
                        type="button"
                        className="appearance-none w-full border border-slate-200 rounded-lg pl-12 pr-10 py-3 focus:outline-none font-medium text-[#2c58a2] bg-white shadow-lg transition-all duration-300 hover:cursor-pointer hover:border-blue-300 text-left flex items-center"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <div className="flex items-center">
                          {selectedLanguage === 'english' && (
                            <>
                              <img src="/us.jpg" alt="English" className="w-5 h-4 mr-2" />
                              {t("languages.english")}
                            </>
                          )}
                          {selectedLanguage === 'englishkids' && (
                            <>
                              <img src="/us.jpg" alt="English Kids" className="w-5 h-4 mr-2" />
                              {t("languages.englishKids")}
                            </>
                          )}
                          {selectedLanguage === 'spanish' && (
                            <>
                              <img src="/es.jpg" alt="Spanish" className="w-5 h-4 mr-2" />
                              {t("languages.spanish")}
                            </>
                          )}
                        </div>
                        {isDropdownOpen ? (
                          <ChevronUp className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`} />
                        ) : (
                          <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`} />
                        )}
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg">
                          <div
                            className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 flex items-center"
                            onClick={() => {
                              setSelectedLanguage('english');
                              setIsDropdownOpen(false);
                            }}
                          >
                            <img src="/us.jpg" alt="English" className="w-5 h-4 mr-2" />
                            {t("languages.english")}
                          </div>
                          <div
                            className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 flex items-center"
                            onClick={() => {
                              setSelectedLanguage('englishkids');
                              setIsDropdownOpen(false);
                            }}
                          >
                            <img src="/us.jpg" alt="English Kids" className="w-5 h-4 mr-2" />
                            {t("languages.englishKids")}
                          </div>
                          <div
                            className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 flex items-center"
                            onClick={() => {
                              setSelectedLanguage('spanish');
                              setIsDropdownOpen(false);
                            }}
                          >
                            <img src="/es.jpg" alt="Spanish" className="w-5 h-4 mr-2" />
                            {t("languages.spanish")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={(() => {
                      const languageRoutes = {
                        english: '/registration?language=English',
                        englishkids: '/registration?language=childEnglish',
                        spanish: '/registration?language=Spanish'
                      };
                      return languageRoutes[selectedLanguage] || languageRoutes.english;
                    })()}
                    className="w-full relative overflow-hidden bg-[#3189c5] hover:bg-[#276c9a] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {t("startButton")}
                      <svg
                        className={`w-5 h-5 transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {isRTL ? (
                          <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        <div className="hidden md:flex items-center min-h-[calc(100svh)]">
          {/* Background image */}
          <div className="absolute inset-0 -z-10">
            {isRTL ? (
              <Image
                src="/howitworksarab.png"
                alt="Hero background"
                fill
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <Image
                src="/howitworks.png"
                alt="Hero background"
                fill
                className="object-cover w-full h-full"
                priority
              />
            )}

            {/* Side gradient to ensure readable content on light image (#F2F7FD) */}
            <div
              className={`absolute inset-0 `}
            />
            {/* Very subtle global scrim for extra contrast */}
            <div className="absolute inset-0 bg-slate-900/5" />
          </div>

          {/* right content */}
          <div className="container relative z-10 w-full px-6 py-20">
            <div className="max-w-xl ml-8 lg:ml-16">
              {/* Title */}
              <h1 className="text-5xl lg:text-6xl font-bold text-[#2c58a2]  leading-tight mb-6">
                {t("title")}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-[#777777] drop-shadow-md mb-8 leading-relaxed">
                {t("subtitle")}
              </p>

                  {/* Language Selection and CTA */}
                  <div className="space-y-5">
                    <p className="text-sm text-slate-600 font-medium flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {t("languageSelect")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-grow w-full sm:max-w-md">
                        <div className={`absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none ${isRTL ? "right-3" : "left-3"}`}>
                          <div className="w-6 h-6 mr-2">
                            {/* English (UK) flag SVG - default and for both English options */}
                            <svg viewBox="0 0 640 480" className="flag-icon english-flag englishkids-flag w-full h-full object-cover rounded-sm" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#012169" d="M0 0h640v480H0z"/>
                              <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                              <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                              <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                              <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
                            </svg>
                            {/* Spanish flag SVG */}
                            <svg viewBox="0 0 640 480" className="flag-icon spanish-flag w-full h-full object-cover rounded-sm hidden" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#AA151B" d="M0 0h640v480H0z"/>
                              <path fill="#F1BF00" d="M0 120h640v240H0z"/>
                              <path fill="#ad1519" d="M127.3 213.3l-11.2 8.1 4.3 13.3-11.3-8.2-11.2 8.2 4.2-13.3-11.2-8.1 13.9-.1 4.3-13.3 4.3 13.3 13.9.1z"/>
                              <path fill="#005BBF" d="M104.4 186.7c-1 9-4 14.8-8.4 17.2-4.4 2.4-11.6 1.6-16.8-5.4-3.2-4.5-8.3-20-8.3-20s-8.2-1.2-10.2 5.8c-5 16.7 7.3 27 16.6 30.7 9.3 3.7 18 1 25.1-3.3 7.1-4.4 11.8-13.5 11.8-25-5.5.8-9.8 0-9.8 0z"/>
                              <path fill="#ad1519" d="M89.8 240.1L78.6 248l4.3 13.3-11.3-8.2-11.2 8.2 4.2-13.3-11.2-8.2 13.9-.1 4.3-13.2 4.3 13.3 13.9.1z"/>
                            </svg>
                          </div>
                        </div>

                          
                        <div className="relative">
                          <button
                            type="button"
                            className="appearance-none w-full border border-slate-200 rounded-lg pl-12 pr-10 py-3 focus:outline-none  font-medium text-[#2c58a2] bg-white shadow-lg transition-all duration-300 hover:cursor-pointer hover:border-blue-300 text-left flex items-center"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <div className="flex items-center">
                              {selectedLanguage === 'english' && (
                                <>
                                  <img src="/us.jpg" alt="English" className="w-5 h-4 mr-2" />
                                  {t("languages.english")}
                                </>
                              )}
                              {selectedLanguage === 'englishkids' && (
                                <>
                                  <img src="/us.jpg" alt="English Kids" className="w-5 h-4 mr-2" />
                                  {t("languages.englishKids")}
                                </>
                              )}
                              {selectedLanguage === 'spanish' && (
                                <>
                                  <img src="/es.jpg" alt="Spanish" className="w-5 h-4 mr-2" />
                                  {t("languages.spanish")}
                                </>
                              )}
                            </div>
                            {isDropdownOpen ? (
                              <ChevronUp className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`} />
                            ) : (
                              <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`} />
                            )}
                          </button>
                          
                          {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg">
                              <div
                                className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 flex items-center"
                                onClick={() => {
                                  setSelectedLanguage('english');
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <img src="/us.jpg" alt="English" className="w-5 h-4 mr-2" />
                                {t("languages.english")}
                              </div>
                              <div
                                className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 flex items-center"
                                onClick={() => {
                                  setSelectedLanguage('englishkids');
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <img src="/us.jpg" alt="English Kids" className="w-5 h-4 mr-2" />
                                {t("languages.englishKids")}
                              </div>
                              <div
                                className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 flex items-center"
                                onClick={() => {
                                  setSelectedLanguage('spanish');
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <img src="/es.jpg" alt="Spanish" className="w-5 h-4 mr-2" />
                                {t("languages.spanish")}
                              </div>
                            </div>
                          )}
                        </div>

                        {isDropdownOpen ? (
                          <ChevronUp className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`} />
                        ) : (
                          <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${isRTL ? "left-3" : "right-3"}`} />
                        )}
                      </div>

                      <Link
                        href={(() => {
                          const languageRoutes = {
                            english: '/registration?language=English',
                            englishkids: '/registration?language=childEnglish',
                            spanish: '/registration?language=Spanish'
                          };
                          return languageRoutes[selectedLanguage] || languageRoutes.english;
                        })()}
                        className=" relative overflow-hidden bg-[#3189c5] hover:bg-[#276c9a] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {t("startButton")}
                          <svg
                            className={`w-5 h-5 transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            {isRTL ? (
                              <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                          </svg>
                        </span>
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
          </div>
        </div>

      </section>
      {/* Steps Section */}
      <section className="relative w-full overflow-hidden py-16">
            <svg 
              className="absolute inset-0 w-[90%] h-full -z-10  mx-auto rounded-2xl"
              viewBox="0 0 1440 800" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              
            {/* Middle wave pattern - keeping this curved style */}
            <path 
              d="M0,192 C240,128 480,224 720,160 C960,96 1200,160 1440,224 L1440,800 L0,800 Z" 
              fill="#F2F7FD" 
              fillOpacity=""
            />
            
            {/* Subtle dots pattern */}
            <g fill="" fillOpacity="0.07">
              <circle cx="100" cy="100" r="8" />
              <circle cx="200" cy="150" r="6" />
              <circle cx="300" cy="50" r="10" />
              <circle cx="1100" cy="130" r="12" />
              <circle cx="1200" cy="250" r="8" />
              <circle cx="1300" cy="170" r="6" />
            </g>
          </svg>

          {/* New unique tomato-colored spiral SVG in top right */}
          <svg 
            viewBox="0 0 500 500"
            className="absolute -top-30 right-10  w-40 h-40 md:w-300 md:h-300 -translate-y-10 translate-x-10 opacity-10 -z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="#FF6347" 
              d="M487.373,141.41c-3.211-5.471-8.079-9.857-13.473-13.119c-5.567-3.367-11.972-5.814-18.45-6.592
              c-3.653-0.439-7.355-0.315-10.999,0.157c-3.641,0.472-7.037,1.304-10.258,3.12c-3.077,1.735-5.896,4.01-8.554,6.324
              c-2.34,2.036-4.423,4.389-6.088,7.01c-3.479,5.478-4.843,12.079-4.422,18.514c0.477,7.287,2.97,14.427,6.741,20.655
              c3.454,5.706,8.241,10.186,14.426,12.797c6.465,2.73,13.714,3.237,20.518,1.546c6.558-1.63,12.936-4.746,17.377-9.937
              c4.234-4.949,7.174-11.162,8.686-17.481c1.584-6.619,1.337-13.861-2.031-19.91c-3.162-5.678-8.809-9.93-14.541-12.766
              c-5.967-2.953-12.48-4.712-19.143-3.717c-6.907,1.031-14.018,4.062-19.064,8.959c-2.404,2.333-4.476,5.121-5.709,8.25
              c-1.159,2.942-1.394,6.231-1.18,9.361c0.43,6.295,2.42,12.851,5.817,18.192c3.394,5.336,8.4,9.264,14.225,11.648
              c6.58,2.693,13.459,2.759,19.878-0.444c5.249-2.619,9.536-6.708,11.764-12.173c3.866-9.484,1.595-21.988-6.64-28.492
              c-9.393-7.418-27.317-9.409-33.178,3.438c-4.578,10.036,0.165,24.556,10.475,29.067c5.41,2.367,12.417,2.473,17.431-0.93
              c4.943-3.354,7.612-9.466,6.731-15.365c-0.811-5.432-4.621-9.48-9.753-11.169c-4.084-1.344-9.009-1.675-13.056-0.031
              c-4.918,1.998-6.49,6.694-5.648,11.683c0.925,5.48,5.102,10.421,10.83,10.964c4.904,0.464,10.419-2.385,9.949-7.907
              c-0.349-4.102-3.587-8.642-8.006-8.821c-2.643-0.107-4.898,1.527-5.415,4.166c-0.665,3.394,1.801,5.373,4.621,6.542
              c1.863,0.772,2.675-2.261,0.834-3.024c-1.096-0.454-2.44-1.077-2.434-2.451c0.005-1.042,0.611-1.9,1.651-2.068
              c1.489-0.241,2.851,0.663,3.8,1.728c2.083,2.337,2.928,6.569-0.541,8.025c-4.682,1.966-9.377-0.459-11.372-4.928
              c-1.53-3.428-1.805-8.363,1.849-10.499c3.095-1.809,7.253-1.604,10.615-0.78c4.248,1.042,7.708,3.659,8.797,8.074
              c1.191,4.831-0.91,10.349-5.034,13.154c-4.219,2.869-10.196,2.806-14.739,0.717c-8.574-3.943-12.854-16.75-8.594-25.151
              c5.366-10.583,21.059-8.235,28.694-1.621c6.785,5.878,8.493,16.41,5.227,24.557c-1.909,4.763-5.744,8.197-10.255,10.495
              c-5.588,2.846-11.547,2.669-17.284,0.368c-5.048-2.025-9.509-5.456-12.499-10.024c-3.023-4.616-4.907-10.255-5.494-15.73
              c-0.293-2.73-0.289-5.547,0.45-8.208c0.784-2.823,2.513-5.339,4.498-7.458c4.223-4.511,10.048-7.214,16.008-8.594
              c5.899-1.366,11.557-0.429,17.089,1.887c5.27,2.207,10.371,5.555,13.932,10.08c7.565,9.613,4.015,23.629-2.112,33.021
              c-1.495,2.291-3.266,4.397-5.35,6.176c-2.328,1.988-5.123,3.339-7.949,4.468c-5.944,2.373-12.302,3.228-18.594,1.81
              c-5.556-1.253-10.667-4.109-14.474-8.368c-4.06-4.542-6.837-10.585-8.417-16.422c-1.589-5.87-1.909-12.155-0.145-18.025
              c1.634-5.438,5.098-9.843,9.418-13.434c2.316-1.925,4.695-3.799,7.348-5.243c2.869-1.561,5.982-2.227,9.204-2.595
              c6.223-0.71,12.227-0.095,18.139,1.965c5.265,1.835,10.314,4.604,14.521,8.281c4.129,3.608,7.764,8.225,8.945,13.678
              c0.654,3.021,0.73,6.147,0.735,9.227c0.006,3.252-0.191,6.32-1.116,9.46c-1.839,6.238-4.808,11.785-9.132,16.644
              c-3.807,4.279-8.444,8.783-13.8,11.035c-5.132,2.158-10.988,2.423-16.444,1.64c-5.461-0.784-11.168-2.488-15.757-5.624
              c-2.451-1.674-4.573-3.8-6.49-6.055c-1.93-2.27-3.899-4.727-5.348-7.337c-1.399-2.519-1.813-5.349-2.883-7.989
              c-0.915-2.259-2.841-4.686-2.71-7.214c0.104-2.017-3.032-2.012-3.136,0c-0.165,3.197,2.064,5.817,3.069,8.694
              c1.162,3.324,1.87,6.629,3.888,9.592c3.777,5.543,8.194,11.051,14.165,14.334c5.532,3.041,12.058,4.67,18.334,5.047
              c6.265,0.376,12.882-0.697,18.226-4.15c5.823-3.762,11.033-8.99,14.993-14.66c1.969-2.82,3.376-5.835,4.623-9.029
              c1.457-3.73,2.565-7.589,2.639-11.62C490.941,154.15,490.83,147.3,487.373,141.41z"
            />
          </svg>
              
        <WorksTestimonial />
      </section>
      {/* // How It Works Section */}
      <section className="relative w-full py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto center text-center">
        {/* Header Section */}
        <motion.div 
          className="flex items-center justify-center mb-6 gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.svg 
            className="w-10 h-10 text-blue-500"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <path 
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.9021 3.5901 15.6665 4.59721 17.1199C4.70168 17.2707 4.7226 17.4653 4.64529 17.6317L3.42747 20.2519C3.23699 20.5853 3.47768 21 3.86159 21H12Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M8 9L16 9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <path 
              d="M8 13L13 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
          </motion.svg>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-[#2c58a2] handwritten"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t("learnLanguage")}
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-l text-[#777777] mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {t("learnLanguageDescription")}
        </motion.p>
        
        {/* Feature Cards */}
        <motion.div 
          className="flex flex-wrap justify-center gap-12 md:gap-20 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Grammar Icon */}
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05, 
              transition: { duration: 0.2 } 
            }}
          >
            <motion.div 
              className="w-20 h-20 bg-[#7444d4] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#b69de9]"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-[#2c58a2] mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
            >
              {t("grammar")}
            </motion.h3>
            <motion.p 
              className="text-slate-600 max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {t("grammerDescription")}
            </motion.p>
          </motion.div>
          
          {/* Vocabulary Icon */}
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05, 
              transition: { duration: 0.2 } 
            }}
          >
            <motion.div 
              className="w-20 h-20 bg-[#e13101] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#f5b7a6]"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.0,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-[#2c58a2] mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {t("vocabulaire")}
            </motion.h3>
            <motion.p 
              className="text-slate-600 max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
            >
              {t("vocabulaireDescription")}
            </motion.p>
          </motion.div>
          
          {/* Communication Icon */}
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05, 
              transition: { duration: 0.2 } 
            }}
          >
            <motion.div 
              className="w-20 h-20 bg-[#3d7acc] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-200"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.2,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z"></path>
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-[#2c58a2] mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
            >
              {t("communication")}
            </motion.h3>
            <motion.p 
              className="text-slate-600 max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              viewport={{ once: true }}
            >
              {t("communicationDescription")}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      </section>

      {/* Course Examples Section */}

    <motion.section 
      ref={sectionRef}
      className="bg-[#F2F7FD] relative overflow-hidden max-w-[90%] mx-auto px-4 md:px-8 py-16 rounded-2xl mb-25"
      initial={{ opacity: 0, y: 50 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div 
      ref={headerRef}
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h2 
        className="text-4xl md:text-5xl text-[#2c58a2] font-bold text-center mb-4 handwritten"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {t("cource.courseExamples") || "Course Examples"}
      </motion.h2>
      <motion.p 
        className="text-lg text-[#777777] max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {t("cource.courseExamplesDescription") || "Discover our teaching methodology through these sample lessons from our French courses"}
      </motion.p>
    </motion.div>

    {/* Video Grid */}
    <motion.div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Video 1 */}
      <motion.div 
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="relative aspect-video bg-slate-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/C6KylmEh6tU"
            title="French Lesson 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.h3 
            className="text-xl font-semibold text-[#2c58a2] mb-2 group-hover:text-blue-600 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {t("cource.challange")}
          </motion.h3>
          <motion.p 
            className="text-slate-600 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {t("cource.challangeDescription")} 
          </motion.p>
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <motion.span 
              className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#e2e8f0" }}
            >
              {t("cource.livels")}
            </motion.span>
            <span className="text-xs text-slate-500">{isRTL ? "" : "2 min"}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Video 2 */}
      <motion.div 
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="relative aspect-video bg-slate-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/mCYSGMAkTrM"
            title="French Lesson 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.h3 
            className="text-xl font-semibold text-[#2c58a2] mb-2 group-hover:text-blue-600 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {t("cource.descution")}
          </motion.h3>
          <motion.p 
            className="text-slate-600 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            {t("cource.descutionDescription")}
          </motion.p>
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          >
            <motion.span 
              className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#e2e8f0" }}
            >
              {t("cource.livels")}
            </motion.span>
            <span className="text-xs text-slate-500">{isRTL ? "" : "2 min" }</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Video 3 */}
      <motion.div 
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="relative aspect-video bg-slate-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/LMPuRab2L_4"
            title="French Lesson 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.h3 
            className="text-xl font-semibold text-[#2c58a2] mb-2 group-hover:text-blue-600 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {t("cource.grammer")}
          </motion.h3>
          <motion.p 
            className="text-slate-600 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {t("cource.grammerDescription")}
          </motion.p>
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            <motion.span 
              className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#e2e8f0" }}
            >
              {t("cource.livels")}
            </motion.span>
            <span className="text-xs text-slate-500">{isRTL ? "" : "2 min"}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</motion.section>
      {/* // Video Section */}
      {/* <section className="">
        <VideoSection />
      </section> */}

    </div>
  )
}