"use client"

import Image from "next/image"
import { useTranslations , useLocale } from "next-intl"
import { useState } from "react"
import { Linkedin, Twitter, Youtube, Facebook, Instagram, ExternalLink, ChevronDown, ChevronUp, Phone, Clock, Globe, Mail } from 'lucide-react'
import { Link } from "@/i18n/navigation"
import { Whatsapp } from "@/components/Whatssap"
import Tiktok  from "@/components/Tiktok"
import { usePathname } from "next/navigation";



export default function Footer() {
  const t = useTranslations("Footer")
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const isRTL = locale === "ar"
  
  const pathname = usePathname();

  // List of routes where footer should be hidden
  const hideFooterRoutes = ["/fr/placement-test", '/ar/placement-test'];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  // State for collapsible sections on mobile
  const [expandedSections, setExpandedSections] = useState({
    company: false,
    languages: false,
    operations: false,
    contact: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  return (
    !shouldHideFooter &&
    <footer className="relative bg-[#F2F7FD] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-6 sm:pb-8">
        <div className="max-w-[1340px] mx-auto">
          {/* Top Section with Logo and CTA */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 mb-10 sm:mb-16 pb-6 sm:pb-8  border-b border-blue-100">
            <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8 w-full md:w-auto">
              <Image
                src="/logo.png"
                alt="Exchange Lab Logo"
                width={160}
                height={45}
                className="h-auto max-w-[160px] sm:max-w-[180px] pt-8"
              />
              <div className="h-12 w-px bg-blue-100 hidden md:block"></div>
              <p className="text-[var(--color-desc)] text-sm max-w-md text-center md:text-left font-semibold">{t("mission")}</p>
            </div>

            <Link
              href="/teacher"
              className="bg-[#3189c5] text-white px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-[#276c9a] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 group w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0"
            >
              {t("becomeTeacher")}
              {isRTL ? ( 
              <ExternalLink className="h-4 w-4 transition-transform rotate-180 scale-y-[-1]  duration-300 group-hover:rotate-[135deg]" />
              ) : (
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              )}
            </Link>
          </div>

          {/* Main Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-2 sm:gap-y-12 relative">
            {/* Company Column */}
            <div className="relative border-b sm:border-b-0 border-blue-100/50 py-4 sm:py-0">
              <div 
                className="flex justify-between items-center cursor-pointer sm:cursor-default" 
                onClick={() => toggleSection('company')}
              >
                <h3 className="text-lg font-bold mb-2 sm:mb-6 text-[var(--color-title)] relative z-10">{t("company")}</h3>
                <span className="sm:hidden">
                  {expandedSections.company ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </div>
              <ul className={`space-y-3 relative z-10 overflow-hidden transition-all duration-300 ${expandedSections.company ? 'max-h-60 opacity-100 mb-4' : 'max-h-0 opacity-0 sm:max-h-60 sm:opacity-100'}`}>
                {[ "blog", "reviews"].map((item) => (
                  <li key={item}>
                    {item === "blog" ? (
                      <a
                        href="https://thexlabber.xchangelab.info/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-desc)] transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-300 h-px bg-[#777777] mr-0 group-hover:mr-2"></span>
                        {t(item)}
                      </a>
                    ) : (
                      <Link
                        href={"#"}
                        className="text-sm text-[var(--color-desc)] transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-300 h-px bg-[#777777] mr-0 group-hover:mr-2"></span>
                        {t(item)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages Column */}
            <div className="relative border-b sm:border-b-0 border-blue-100/50 py-4 sm:py-0">
              <div 
                className="flex justify-between items-center cursor-pointer sm:cursor-default" 
                onClick={() => toggleSection('languages')}
              >
                <h3 className="text-lg font-bold mb-2 sm:mb-6 text-[var(--color-title)] relative z-10">{t("languages")}</h3>
                <span className="sm:hidden">
                  {expandedSections.languages ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </div>
              <ul className={`space-y-3 relative z-10 overflow-hidden transition-all duration-300 ${expandedSections.languages ? 'max-h-80 opacity-100 mb-4' : 'max-h-0 opacity-0 sm:max-h-80 sm:opacity-100'}`}>
                {[
                  "learnEnglish",
                  "learnEnglishKids",
                  "learnSpanish",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item === "learnEnglish" ? "/registration?language=/English" : item === "learnSpanish" ? "/registration?language=/Spanish" : "/registration?language=/childEnglish"}`}
                      className="text-sm text-[var(--color-desc)] transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-300 h-px bg-[#777777] mr-0 group-hover:mr-2"></span>
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Operation Column */}
            <div className="relative border-b sm:border-b-0 border-blue-100/50 py-4 sm:py-0">
              <div 
                className="flex justify-between items-center cursor-pointer sm:cursor-default" 
                onClick={() => toggleSection('operations')}
              >
                <h3 className="text-lg font-bold mb-2 sm:mb-6 text-[var(--color-title)] relative z-10">{t("ourOperation")}</h3>
                <span className="sm:hidden">
                  {expandedSections.operations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </div>
              <ul className={`space-y-3 relative z-10 overflow-hidden transition-all duration-300 ${expandedSections.operations ? 'max-h-60 opacity-100 mb-4' : 'max-h-0 opacity-0 sm:max-h-60 sm:opacity-100'}`}>
                {["ourPlatform"].map((item) => (
                  <li key={item}>
                    <Link
                      href={'https://www.xlabplatform.com/login/index.php'}
                      className="text-sm text-[var(--color-desc)] transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-300 h-px bg-[#777777] mr-0 group-hover:mr-2"></span>
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="relative py-4 sm:py-0">
              <div 
                className="flex justify-between items-center cursor-pointer sm:cursor-default" 
                onClick={() => toggleSection('contact')}
              >
                <h3 className="text-lg font-bold mb-2 sm:mb-6 text-[var(--color-title)] relative z-10">{t("contact")}</h3>
                <span className="sm:hidden">
                  {expandedSections.contact ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </div>
              <div className={`space-y-3 relative z-10 overflow-hidden transition-all duration-300 ${expandedSections.contact ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-96 sm:opacity-100'}`}>
                <ul className="space-y-3">
                  {["faq", "contactUs"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item === "contactUs" ? "#" : '#'}`}
                        className="text-sm text-[var(--color-desc)] transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-300 h-px bg-[#777777] mr-0 group-hover:mr-2"></span>
                        {t(item)}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* WhatsApp Contact Section */}
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
                  <div className="flex items-center gap-1 text-sm mb-1 text-[var(--color-desc)]">
                  <p className="flex items-center gap-2"><Whatsapp color="#838383" className="w-4 h-4 text-green-600"/> 00212663244841</p>
                  </div>
                  <div className="space-y-1 text-sm text-[var(--color-desc)]">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> Contact@xchangelab.info </p>                    
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {t("timee")}</p>                    
                    <p className="flex items-center gap-2"> <Globe className="w-4 h-4 "/> {t("supportt")}</p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className={`mt-6 sm:mt-8 flex flex-wrap gap-3 relative z-10 transition-all duration-300 ${expandedSections.contact ? 'opacity-100 mb-4' : 'opacity-0 sm:opacity-100'}`}>
                {[
                  { icon: Whatsapp, label: "WhatsApp", href: "https://wa.me/212663244841" },
                  { icon: Tiktok, label: "Tiktok" , href: "https://www.tiktok.com/@exchange_lab" },
                  { icon: Youtube, label: "YouTube"   , href: "https://www.youtube.com/@Exchange Lab" },
                  { icon: Facebook, label: "Facebook" , href: "https://www.facebook.com/Exchange LabMorocco?_rdc=1&_rdr" },
                  { icon: Instagram, label: "Instagram" , href: "https://www.instagram.com/exchange_lab/" }
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white border border-blue-100 text-gray-800 hover:bg-[#3189c5] hover:text-white hover:border-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <social.icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-[#3189c5] text-white w-full py-0 xs:py-6 sm:py-6 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs mb-6 md:mb-0 flex items-center text-center md:text-left">
              {/* <span className="text-lg mr-2 font-bold">×</span> */}
              © {currentYear} Exchange Lab - {t("allRightsReserved")}
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
              {["terms"].map((item) => (
                <Link
                  key={item}
                  href={`/conditions`}
                  className="text-xs text-blue-100 hover:text-white transition-colors duration-200"
                >
                  {t(item)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}