"use client"

import { useTranslations, useLocale } from "next-intl"
import { useState, useEffect, useRef } from "react"
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  Newspaper,
  Users,
  GraduationCap,
  Lightbulb,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Play,
  ChevronRight,
  Globe,
  Home,
  ArrowRight,
  NotebookPen,
  Smile
} from "lucide-react"
import { cn } from "@/lib/utils";
import Image from "next/image"

const Navbar = () => {
  const t = useTranslations("NavBar")
  const tHero = useTranslations("Hero")
  const locale = useLocale()
  const isRTL = locale === "ar"
  
  // Font configuration
  const FONTS = {
    primary: {
      regular: "open-sans-regular",
      medium: "open-sans-medium", 
      semibold: "open-sans-semibold",
      bold: "open-sans-bold"
    },
    arabic: {
      regular: "tajawal-regular",
      medium: "tajawal-medium",
      semibold: "tajawal-bold",
      bold: "tajawal-extrabold"
    }
  }
  
  const getFontClass = (weight = 'medium') => {
    return isRTL ? FONTS.arabic[weight] : FONTS.primary[weight]
  }

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const hoverTimeoutRef = useRef(null)

  // Navigation structure - only existing items
  const navItems = [
    {
      type: "dropdown",
      title: t("courses"),
      id: "courses",
      icon: GraduationCap,
      items: [
        {
          category: t("liveClasses"),
          items: [
            {
              text: t("liveClassesSubItems.englishKids"), 
              href: "/registration?language=childEnglish", 
              flagCode: "english-kids",
              flagImage: "/languages/english-kids.png",
              flagBg: "bg-indigo-100",
              flagColor: "text-indigo-600",
              popular: true 
            },
            {
              text: t("liveClassesSubItems.english"), 
              href: "/registration?language=English", 
              flagCode: "english",
              flagImage: "/languages/english-kids.png",
              flagBg: "bg-blue-100",
              flagColor: "text-blue-600",
            },
            {
              text: t("liveClassesSubItems.spanish"), 
              href: "/registration?language=Spanish",
              flagCode: "spanish",
              flagImage: "/languages/spanish.png",
              flagBg: "bg-yellow-100",
              flagColor: "text-yellow-600"
            },
          ],
        },
      ],
    },
  ]

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hover handlers
  const handleMouseEnter = (id) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setActiveDropdown(id)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 100)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  // Prevent body scroll when menu is open and add dark overlay to page
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      // Add dark overlay class to body
      document.body.classList.add('sidebar-open')
    } else {
      document.body.style.overflow = 'unset'
      // Remove dark overlay class from body
      document.body.classList.remove('sidebar-open')
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('sidebar-open')
    }
  }, [isMobileMenuOpen])

  // Add styles to document head for page darkening effect
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      body.sidebar-open::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        z-index: 80;
        pointer-events: none;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <nav
      id="navbar"
       className={cn(
        "fixed top-0 left-0 right-0 transition-all duration-500 ease-out ",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-gray-200 shadow-sm z-[90]"
          : "bg-[#F2F7FD]/90 backdrop-blur-sm border-transparent shadow-none z-[90]",
        isMobileMenuOpen && "z-[120]" // Higher z-index when sidebar is open
      )}>
        <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-4 ${isMobileMenuOpen ? " bg-black/50 " : ""}`}>
          <div className={`flex items-center justify-between h-16 lg:h-20 `}>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 ">
              <Image
                src="/LOGO-XLAB.png"
                alt="Exchange Labs"
                width={160}
                height={45}
                className={`w-fit h-14 object-contain`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={cn(
                    "flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200",
                    getFontClass('medium'),
                    "text-gray-700 hover:text-gray-900 hover:bg-gray-100/60",
                    activeDropdown === item.id && "bg-blue-50 text-blue-700"
                  )}>
                    <span className="text-sm">{item.title}</span>
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      activeDropdown === item.id && "rotate-180"
                    )} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === item.id && (
                    <div className={cn(
                      "absolute top-full mt-2 w-72 bg-white backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 overflow-hidden z-50",
                      "animate-in slide-in-from-top-2 duration-200",
                      isRTL ? "right-0" : "left-0"
                    )}>
                      {item.items.map((section, idx) => (
                        <div key={idx} className="p-4 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className={cn(
                              "text-sm font-semibold text-gray-900",
                              getFontClass('semibold')
                            )}>
                              {section.category}
                            </h3>
                          </div>
                          <div className="space-y-1">
                            {section.items.map((link, linkIdx) => (
                              <Link
                                key={linkIdx}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className={cn(
                                  "group flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200",
                                )}
                              >
                                {/* Icon/Flag */}
                                <div className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center transition-colors overflow-hidden",
                                    link.flagBg || "bg-gray-100",
                                    link.flagColor || "text-[#777777]"
                                  )}>
                                    {link.flagCode === "video" ? (
                                      <Play className="w-3.5 h-3.5" />
                                    ) : link.flagImage ? (
                                      <Image
                                        src={link.flagImage}
                                        alt={link.text}
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      link.icon && <link.icon className="w-3.5 h-3.5" />
                                    )}
                                </div>
                                <div className="flex-1">
                                  <span className={cn(
                                    "text-sm text-gray-700 group-hover:text-gray-900",
                                    getFontClass('medium')
                                  )}>
                                    {link.text}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Direct Links */}
              <Link
                href="https://thexlabber.xchangelab.info/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 transition-all duration-200",
                  getFontClass('medium')
                )}
              >
                {t("blog")}
              </Link>
              <Link
                href='/how-it-works'
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 transition-all duration-200",
                  getFontClass('medium')
                )}
              >
                {t("howItWorks")}
              </Link>
              <Link
                href='/teacher'
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 transition-all duration-200",
                  getFontClass('medium')
                )}
              >
                {t("becomeTeacher")}
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              
              {/* Separator Line */}
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              
              {/* Go to Class Button */}
              <div className="hidden sm:block">
                <Link
                  href="https://www.xlabplatform.com/login/index.php"
                  className={cn(
                    "relative inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm",
                    "text-white bg-[#ff7f6e] hover:bg-[#ff6b5a] transition-all duration-300 ease-out",
                    "border border-transparent hover:border-[#ff6b5a]",
                    "backdrop-blur-sm",
                    "group",
                    getFontClass('medium')
                  )}
                >
                  Go To Class
                  
                  {/* Bottom border animation */}
                  {/* <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-out"></div> */}
                </Link>
              </div>

              {/* CTA Button */}
              <div className="hidden lg:block">
                <Link
                  href="/registration"
                  className={cn(
                    "inline-flex items-center px-6 py-2.5 rounded-lg font-medium text-sm",
                    "bg-[#3189c5] hover:bg-[#276c9a] text-white transition-colors duration-200",
                    getFontClass('semibold')
                  )}
                >
                  {tHero("getStartedNavbar")}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-colors duration-200 relative z-[200] hover:cursor-pointer"
              >
                <div className="relative w-5 h-5">
                  <Menu className={cn(
                    "absolute inset-0 transition-all duration-300 transform",
                    isMobileMenuOpen ? "rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
                  )} />
                  <X className={cn(
                    "absolute inset-0 transition-all duration-300 transform",
                    isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-75"
                  )} />
                </div>
              </button>
            </div> 
          </div>
        </div>

        {/* Modern Simple Side Drawer */}
        <ModernSideDrawer 
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          navItems={navItems}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          t={t}
          tHero={tHero}
          getFontClass={getFontClass}
          isRTL={isRTL}
        />
      </nav>

      {/* Clickable Overlay - Separate from sidebar for better click handling */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[100] cursor-pointer"
          onClick={closeMobileMenu}
          style={{ pointerEvents: 'auto' }}
        />
      )}
    </>
  )
}

// Modern Simple Side Drawer Component
const ModernSideDrawer = ({ 
  isOpen, 
  onClose, 
  navItems, 
  activeDropdown, 
  setActiveDropdown, 
  t, 
  tHero, 
  getFontClass,
  isRTL 
}) => {
  return (
    <>
      {/* Modern Simple Side Drawer */}
      <div className={cn(
        "lg:hidden fixed top-0 h-screen w-[350px] max-w-[85vw] bg-white z-[110] shadow-2xl",
        "transform transition-all duration-500 ease-out",
        // Position and border based on RTL
        isRTL 
          ? "left-0 border-r border-gray-200/50" 
          : "right-0 border-l border-gray-200/50",
        // Translation based on RTL and open state
        isOpen 
          ? "translate-x-0" 
          : isRTL 
            ? "-translate-x-full" 
            : "translate-x-full"
      )}>
        {/* Clean Header */}
        <div className="flex items-center justify-between p-6 border-b border-white">
          <div>
            <h2></h2>
            <p className="text-sm "></p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <Home className="w-5 h-5 text-[#777777]" />
              <span className={cn("text-gray-900 font-medium", getFontClass('medium'))}>
                Home
              </span>
            </Link>

            {/* Language Switcher for Mobile */}
            <div className="sm:hidden">
              <LanguageSwitcher mobile />
            </div>

            {/* Navigation Items */}
            <div className="space-y-3">
              {navItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                      activeDropdown === item.id 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className={cn("font-medium", getFontClass('medium'))}>
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === item.id && "rotate-180"
                    )} />
                  </button>

                  {/* Simple Dropdown */}
                  {activeDropdown === item.id && (
                    <div className={cn(
                      "mt-2 space-y-2 animate-in slide-in-from-top-1 duration-200",
                      isRTL ? "mr-8" : "ml-8"
                    )}>
                      {item.items.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center gap-2 py-2">
                            <span className={cn("text-xs font-semibold text-gray-500 uppercase tracking-wide", getFontClass('semibold'))}>
                              {section.category}
                            </span>
                            {section.isNew && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
                                NEW
                              </span>
                            )}
                          </div>
                          {section.items.map((link, linkIdx) => (
                            <Link
                              key={linkIdx}
                              href={link.href}
                              onClick={onClose}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200",
                                link.popular && "bg-blue-50/50"
                              )}
                            >
                              <div className={cn(
                                "w-6 h-6 rounded-md flex items-center justify-center",
                                link.flagBg || "bg-gray-100",
                                link.flagColor || "text-[#777777]"
                              )}>
                                {link.flagCode === "video" ? (
                                  <Play className="w-3 h-3" />
                                ) : link.flagImage ? (
                                  <Image
                                    src={link.flagImage}
                                    alt={link.text}
                                    width={16}
                                    height={16}
                                    className="object-contain"
                                  />
                                ) : (
                                  link.icon && <link.icon className="w-3 h-3" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className={cn("text-sm text-gray-700", getFontClass('regular'))}>
                                  {link.text}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Direct Links */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              {/* Go to Class Link for Mobile */}
              <Link
                href="https://www.xlabplatform.com/login/index.php" // Update this URL to your actual class/dashboard URL
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Play className="w-5 h-5" />
                <span className={cn("font-medium", getFontClass('medium'))}>
                  Go to Class
                </span>
              </Link>
              
              <Link
                href="https://thexlabber.xchangelab.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Newspaper className="w-5 h-5" />
                <span className={cn("font-medium", getFontClass('medium'))}>
                  {t("blog")}
                </span>
              </Link>
              
              <Link
                href='/teacher'
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <GraduationCap className="w-5 h-5" />
                <span className={cn("font-medium", getFontClass('medium'))}>
                  {t("becomeTeacher")}
                </span>
              </Link>
              
              <Link
                href='/how-it-works'
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Lightbulb className="w-5 h-5" />
                <span className={cn("font-medium", getFontClass('medium'))}>
                  {t("howItWorks")}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Simple Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100">
          <Link
            href="/registration"
            onClick={onClose}
            className={cn(
              "flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold",
              "bg-[#3189c5] hover:bg-[#276c9a] text-white transition-all duration-200",
              getFontClass('semibold')
            )}
          >
            <span>{tHero("getStartedNavbar")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}

// Simple Language Switcher Component
const LanguageSwitcher = ({ mobile = false }) => {
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const hoverTimeoutRef = useRef(null)
  const router = useRouter()

  const languages = [
    { code: 'fr', name: 'Français', shortName: 'FR', flag: '/france.svg' },
    { code: 'ar', name: 'العربية', shortName: 'AR', flag: '/maroc.svg' },
  ]

  const currentLanguage = languages.find(lang => lang.code === locale)

  const handleMouseEnter = () => {
    if (mobile) return
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (mobile) return
    hoverTimeoutRef.current = setTimeout(() => setIsOpen(false), 100)
  }

  const handleClick = () => {
    if (mobile) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
          mobile 
            ? "w-full bg-gray-50 hover:bg-gray-100 border border-gray-200" 
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
        )}
      >
        <Globe className="w-5 h-5 text-[#777777]" />
        <div className="flex-1 text-left">
          <span className="text-sm font-medium text-gray-900 block">
            {currentLanguage?.shortName}
          </span>
          {mobile && (
            <span className="text-xs text-gray-500">{currentLanguage?.name}</span>
          )}
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200 text-gray-400",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-[120]",
          "animate-in slide-in-from-top-1 duration-200",
          mobile ? "left-0 right-0" : "right-0 w-36"
        )}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={cn(
                "flex items-center gap-3 w-full p-3 hover:bg-gray-50 transition-colors duration-200",
                locale === lang.code && "bg-blue-50 text-blue-600"
              )}
              onClick={() => {
                router.push(`/${lang.code}`)
                setIsOpen(false)
              }}
            >
              <div className="w-5 h-5 relative flex-shrink-0">
                <Image 
                  src={lang.flag} 
                  alt={lang.shortName} 
                  width={20} 
                  height={20} 
                  className="object-contain rounded-sm"
                />
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-medium block">{lang.shortName}</span>
                <span className="text-xs text-gray-500 block">{lang.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Navbar