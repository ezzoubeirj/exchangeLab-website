"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { cn } from "@/lib/utils"

const TypingAnimation = () => {
  const t = useTranslations("Hero")
  const locale = useLocale()
  const isRTL = locale === "ar"
  
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(false)
  const [showIcon, setShowIcon] = useState(false)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false) // Track if animation has run
  
  // Apply appropriate font class based on locale
  const fontClass = isRTL ? "tajawal-regular" : "montserrat-regular"
  
  // Get the text based on locale
  const getText = () => {
    switch (locale) {
      case "fr":
        return "Exchange Lab fait partie des 5 % des meilleures écoles en ligne dans le monde"
      case "ar":
        return "Exchange Lab من ضمن أفضل 5% من المدارس الإلكترونية في العالم"
      default:
        return "Exchange Lab is among the top 5% of online schools worldwide"
    }
  }
  
  const fullText = getText()
  const words = fullText.split(' ')

  useEffect(() => {
    // Only run animation once
    if (hasAnimated) return

    // Show icon first with smooth animation
    const iconDelay = setTimeout(() => {
      setShowIcon(true)
      
      // Start animation after icon appears
      const typingDelay = setTimeout(() => {
        if (!isRTL) {
          setShowCursor(true) // Only show cursor for non-Arabic languages
        }
        
        if (isRTL) {
          // Word-by-word reveal animation for Arabic (no cursor)
          let wordIndex = 0
          const wordSpeed = 400 // milliseconds per word
          
          const revealWord = () => {
            if (wordIndex < words.length) {
              const wordsToShow = words.slice(0, wordIndex + 1).join(' ')
              setDisplayedText(wordsToShow)
              setCurrentWordIndex(wordIndex)
              wordIndex++
              setTimeout(revealWord, wordSpeed)
            } else {
              setIsTypingComplete(true)
              setHasAnimated(true) // Mark animation as complete
            }
          }
          
          revealWord()
        } else {
          // Character-by-character typing for non-Arabic languages (French/English)
          let currentIndex = 0
          const typingSpeed = 30
          
          const typeText = () => {
            if (currentIndex < fullText.length) {
              setDisplayedText(fullText.slice(0, currentIndex + 1))
              currentIndex++
              
              const randomDelay = typingSpeed + Math.random() * 20 - 10
              setTimeout(typeText, randomDelay)
            } else {
              setIsTypingComplete(true)
              // Hide cursor after typing is complete for non-Arabic
              setTimeout(() => {
                setShowCursor(false)
                setHasAnimated(true) // Mark animation as complete for French/English
              }, 2000)
            }
          }
          
          typeText()
        }
      }, 800)
      
      return () => clearTimeout(typingDelay)
    }, 1000)

    return () => clearTimeout(iconDelay)
  }, []) // Remove dependencies to prevent re-running

  return (
    <div className={cn(
      "w-full py-8 flex justify-center items-center pt-0",
      isRTL ? "rtl" : "ltr"
    )}>
      <div className="flex items-center justify-center gap-4 max-w-5xl mx-auto px-4">
        
        {/* Icon with smooth entrance animation */}
        <div className={cn(
          "transition-all duration-700 ease-out transform flex-shrink-0",
          showIcon 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-2"
        )}>
          <div className="relative">
     
            
            {/* Icon container */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <img
                src="/icon.png"
                alt="Exchange Lab"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Text with different animations based on language */}
        <div className={cn(
          "text-center transition-all duration-500 ease-out",
          fontClass,
          showIcon ? "opacity-100" : "opacity-0"
        )}>
          <p className="text-md text-gray-500 leading-relaxed tracking-wide">
            {isRTL ? (
              // Word-by-word reveal for Arabic (no cursor)
              <span className="inline-block">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block transition-all duration-500 ease-out mx-1",
                      index <= currentWordIndex ? "opacity-100 transform-none" : "opacity-0 translate-y-2"
                    )}
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ) : (
              // Character-by-character for other languages (with cursor)
              <span className="inline-block">
                {displayedText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block transition-all duration-100 ease-out",
                      index < displayedText.length ? "opacity-100 transform-none" : "opacity-0 translate-y-1"
                    )}
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: index < displayedText.length ? 'fadeInChar 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                
                {/* Smooth blinking cursor - only for non-Arabic */}
                {showCursor && (
                  <span className="inline-block w-0.5 h-5 bg-gradient-to-b from-gray-500 to-gray-600 ml-1 animate-pulse" />
                )}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Custom keyframes for character animation */}
      <style jsx>{`
        @keyframes fadeInChar {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInWord {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gentlePulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .gentle-pulse {
          animation: gentlePulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default TypingAnimation
