"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, GraduationCap, Quote, Star } from "lucide-react"


export default function TestimonialsCarousel() {
  const t = useTranslations('testimonialStudents');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const testimonials = t.raw('students').map((student, index) => ({
    id: index + 1,
    name: student.name,
    role: student.role,
    course: student.course,
    courseColor: student.courseColor,
    avatar: "/placeholder.svg?height=100&width=100",
    rating: student.rating,
    content: student.content,
  }));

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)
  const animationDuration = 600 // Longer duration for smoother animation

  // Auto-rotation functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial()
      }
    }, 4000) // Rotate every 4 seconds

    return () => clearInterval(interval)
  }, [isPaused, isAnimating])

  const nextTestimonial = () => {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
      setIsAnimating(false)
    }, animationDuration)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, animationDuration)
  }

  // Calculate indices for the cards in the stack
  const getCardIndex = (offset) => {
    return (activeIndex + offset + testimonials.length) % testimonials.length
  }

  // Get card position class based on its position in the stack
  const getCardPositionClass = (index) => {
    const baseTransition = "transition-all duration-600 ease-in-out"

    if (index === activeIndex) {
      return isAnimating
        ? direction > 0
          ? `${baseTransition} translate-x-full opacity-0 scale-90 rotate-3 z-0`
          : `${baseTransition} -translate-x-full opacity-0 scale-90 -rotate-3 z-0`
        : `${baseTransition} translate-x-0 opacity-100 scale-100 rotate-0 z-30`
    }

    // Next card (right stack)
    if (index === getCardIndex(isRTL ? -1 : 1)) {
      return isAnimating && direction > 0
        ? `${baseTransition} translate-x-0 opacity-100 scale-100 rotate-0 z-30`
        : `${baseTransition} translate-x-[${isRTL ? '-15%' : '15%'}] opacity-70 scale-90 rotate-${isRTL ? '-6' : '6'} z-20 blur-[1px]`
    }

    // Second next card (rightmost stack)
    if (index === getCardIndex(isRTL ? -2 : 2)) {
      return isAnimating && direction > 0
        ? `${baseTransition} translate-x-[${isRTL ? '-15%' : '15%'}] opacity-70 scale-90 rotate-${isRTL ? '-6' : '6'} z-20 blur-[1px]`
        : `${baseTransition} translate-x-[${isRTL ? '-25%' : '25%'}] opacity-50 scale-85 rotate-${isRTL ? '-12' : '12'} z-10 blur-[2px]`
    }

    // Previous card (left stack)
    if (index === getCardIndex(isRTL ? 1 : -1)) {
      return isAnimating && direction < 0
        ? `${baseTransition} translate-x-0 opacity-100 scale-100 rotate-0 z-30`
        : `${baseTransition} translate-x-[${isRTL ? '15%' : '-15%'}] opacity-70 scale-90 rotate-${isRTL ? '6' : '-6'} z-20 blur-[1px]`
    }

    // Second previous card (leftmost stack)
    if (index === getCardIndex(isRTL ? 2 : -2)) {
      return isAnimating && direction < 0
        ? `${baseTransition} translate-x-[${isRTL ? '15%' : '-15%'}] opacity-70 scale-90 rotate-${isRTL ? '6' : '-6'} z-20 blur-[1px]`
        : `${baseTransition} translate-x-[${isRTL ? '25%' : '-25%'}] opacity-50 scale-85 rotate-${isRTL ? '12' : '-12'} z-10 blur-[2px]`
    }

    // Hidden cards
    return `${baseTransition} opacity-0 scale-75 z-0`
  }

  // Function to get the card's style based on its position
  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    
    return {
      transformOrigin: "center center",
      backfaceVisibility: "hidden",
      boxShadow: isActive 
        ? "0 15px 35px rgba(0, 86, 179, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)" 
        : "0 5px 15px rgba(0, 0, 0, 0.1)",
      transform: isActive && !isAnimating ? "translateY(-5px)" : "",
      transition: "all 0.6s ease-in-out",
      filter: isActive ? "none" : "", // Explicitly ensure no filter on active card
    };
  }

  return (
    <div className={`w-full max-w-6xl mx-auto px-4 py-10 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
          <GraduationCap className="h-6 w-6 text-[#0056B3]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* 3D Card Stack Container */}
      <div
        ref={containerRef}
        className="relative h-[450px] md:h-[400px] perspective-1200 mb-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-full h-full relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute top-0 left-0 right-0 mx-auto w-[90%] md:w-[80%] h-full ${getCardPositionClass(
                index,
              )}`}
              style={getCardStyle(index)}
            >
              <Card className={`w-full h-full overflow-hidden ${index === activeIndex ? 'border border-blue-100 shadow-lg' : 'border-0'}`}>
                <CardContent className="p-0 h-full">
                  <div className="grid md:grid-cols-5 h-full">
                    {/* Left side - Student info */}
                    <div className={`bg-gradient-to-br from-[#0056B3] to-[#003366] p-6 md:p-8 flex flex-col items-center justify-center text-white md:col-span-2 ${index === activeIndex ? 'animate-gradient' : ''}`}>
                      <div className="relative mb-6">
                        <div className={`absolute -top-3 ${isRTL ? '-right-3' : '-left-3'} w-8 h-8 rounded-full bg-[#FF6347] flex items-center justify-center`}>
                          <Quote className="h-4 w-4 text-white" />
                        </div>
                        <Avatar className={`h-20 w-20 md:h-24 md:w-24 border-4 border-white ${index === activeIndex ? 'ring-2 ring-offset-2 ring-[#FF6347]' : ''}`}>
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-200 text-[#003366] text-xl">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                      <p className="text-blue-100 mb-3">{testimonial.role}</p>
                      <Badge className={`${testimonial.courseColor} font-medium ${index === activeIndex ? 'shadow-sm' : ''}`}>{testimonial.course}</Badge>
                      <div className="flex items-center mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "fill-[#FF6347] text-[#FF6347]" : "text-blue-200"
                            } ${index === activeIndex && i < testimonial.rating ? 'animate-pulse-subtle' : ''}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right side - Testimonial content */}
                    <div className={`p-6 md:p-8 flex items-center md:col-span-3 ${index === activeIndex ? 'bg-white' : 'bg-gray-50'}`}>
                      <blockquote className="w-full">
                        <div className="relative">
                          <Quote className={`h-12 w-12 ${index === activeIndex ? 'text-gray-100' : 'text-gray-200'} absolute -top-6 ${isRTL ? '-right-2' : '-left-2'} rotate-180`} />
                          <p className={`text-base md:text-lg relative z-10 italic leading-relaxed ${
                            index === activeIndex ? 'text-gray-800 font-medium' : 'text-gray-700'
                          }`}>
                            "{testimonial.content}"
                          </p>
                          {index === activeIndex && (
                            <div className="mt-4 pt-2 border-t border-gray-100">
                              <div className="flex items-center">
                                <div className="flex-1"></div>
                                <div className="text-[#0056B3] text-sm font-semibold inline-flex items-center">
                                  <span>{t('verifiedGraduate')}</span>
                                  <svg className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'} text-blue-500`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Auto-rotation indicator */}
        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center gap-2`}>
          <div
            className={`h-1.5 bg-[#0056B3] rounded-full transition-all ${isPaused ? "w-0" : "w-12 animate-shrink"}`}
          ></div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center mt-6 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          disabled={isAnimating}
          className="rounded-full h-12 w-12 border-2 transition-all hover:bg-blue-50 hover:text-[#0056B3] hover:border-blue-200"
        >
          {isRTL ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          <span className="sr-only">{t('previous')}</span>
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return
                if (index > activeIndex) {
                  setDirection(1)
                } else if (index < activeIndex) {
                  setDirection(-1)
                } else {
                  return
                }
                setIsAnimating(true)
                setTimeout(() => {
                  setActiveIndex(index)
                  setIsAnimating(false)
                }, animationDuration)
              }}
              className={`h-3 w-3 rounded-full transition-all ${
                activeIndex === index ? "bg-[#0056B3] w-6" : "bg-gray-300 hover:bg-blue-300"
              }`}
              aria-label={t('goToTestimonial', { number: index + 1 })}
              disabled={isAnimating}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          disabled={isAnimating}
          className="rounded-full h-12 w-12 border-2 transition-all hover:bg-blue-50 hover:text-[#0056B3] hover:border-blue-200"
        >
          {isRTL ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          <span className="sr-only">{t('next')}</span>
        </Button>
      </div>
    </div>
  )
}
