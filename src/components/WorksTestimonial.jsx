"use client"

import { useTranslations, useLocale } from "next-intl"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { motion, AnimatePresence, useInView } from "framer-motion"
import ArrowDecoration from './ArrowDecoration';

export default function WorksTestimonial() {
  const t = useTranslations("WorksTestimonial")
  const locale = useLocale()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const scrollRef = useRef(null)
  const isRTL = locale === "ar"
  
  // Refs for in-view animations
  const titleRef = useRef(null)
  const carouselRef = useRef(null)
  const dotsRef = useRef(null)
  
  // In-view hooks
  const titleInView = useInView(titleRef, { once: true, threshold: 0.3 })
  const carouselInView = useInView(carouselRef, { once: true, threshold: 0.2 })
  const dotsInView = useInView(dotsRef, { once: true, threshold: 0.5 })
  
  // Process steps data
  const processSteps = [
    {
      id: "discover",
      title: t("processStepsTitle1"),
      description: t("processStepsDes1"),
      image: "/study1.png", 
      color: "from-[var(--color-tomato)] to-[var(--color-danger)]"
    },
    {
      id: "translate",
      title: t("processStepsTitle2"),
      description: t("processStepsDes2"),
      image: "/study2.png",
      color: "from-[var(--color-primary)] to-[var(--color-dark)]"
    },
    {
      id: "review",
      title: t("processStepsTitle3"),
      description: t("processStepsDes3"),
      image: "/study3.png",
      color: "from-[var(--color-tomato)] to-[var(--color-danger)]"
    },
    {
      id: "deliver",
      title: t("processStepsTitle4"),
      description: t("processStepsDes4"),
      image: "/study4.png",
      color: "from-[var(--color-primary)] to-[var(--color-dark)]"
    }
  ]

  // For infinite carousel effect, duplicate the array
  const extendedSteps = [...processSteps, ...processSteps, ...processSteps];

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (isRTL) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + processSteps.length) % processSteps.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % processSteps.length);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (isRTL) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % processSteps.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + processSteps.length) % processSteps.length);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Calculate the starting index for the current view
  const startIdx = currentIndex + processSteps.length;

  return (
    <motion.section 
      className="py-16 max-w-[1340px] mx-auto relative overflow-hidden" 
      dir={isRTL ? "rtl" : "ltr"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <div className="text-center mb-12 px-4" ref={titleRef}>
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-[#2c58a2] mb-4 relative inline-block handwritten"
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("title")}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={titleInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
          >
            <ArrowDecoration className={`absolute -top-4 ${isRTL ? '-left-10' : '-right-10'} w-12 h-12`}/>
          </motion.div>
        </motion.h2>
      </div>

      {/* Navigation Buttons */}
      <motion.div 
        className="relative max-w-[1340px] mx-auto px-4 lg:px-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={carouselRef}
      >
        {/* Navigation buttons with in-view animations */}
        <motion.button 
          onClick={isRTL ? nextSlide : prevSlide}
          className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-blue-400 focus:outline-none`}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          animate={carouselInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 50 : -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isRTL ? "Next step" : "Previous step"}
          disabled={isAnimating}
        >
          <motion.div 
            className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center group"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
          >
            {isRTL ? <FaChevronRight className="h-5 w-5 lg:h-6 lg:w-6 relative z-10" /> : <FaChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 relative z-10" />}
          </motion.div>
        </motion.button>
        
        <motion.button 
          onClick={isRTL ? prevSlide : nextSlide}
          className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-blue-400 focus:outline-none`}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          animate={carouselInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? -50 : 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isRTL ? "Previous step" : "Next step"}
          disabled={isAnimating}
        >
          <motion.div 
            className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center group"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
          >
            {isRTL ? <FaChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 relative z-10" /> : <FaChevronRight className="h-5 w-5 lg:h-6 lg:w-6 relative z-10" />}            
          </motion.div>
        </motion.button>

        {/* Carousel container with motion */}
        <motion.div 
          className="relative overflow-hidden mx-6 lg:mx-12" 
          ref={scrollRef}
          initial={{ opacity: 0, y: 30 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {isClient && (
            <motion.div 
              className="flex"
              animate={{ 
                x: isRTL 
                  ? `${(startIdx * 100)}%`
                  : `-${(startIdx * 100)}%`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {extendedSteps.map((step, index) => {
                // Calculate if this is the currently visible step
                const isCurrentStep = index === startIdx;
                
                return (
                  <motion.div
                    key={`${step.id}-${index}`}
                    className="flex-shrink-0 w-full snap-center"
                  >
                    <div className="flex flex-col lg:flex-row items-center max-w-[1340px] mx-auto px-6 lg:px-10">
                      {/* Image with motion */}
                      <motion.div 
                        className="flex-1 flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={carouselInView ? { 
                          opacity: isCurrentStep ? 1 : 0.7, 
                          scale: isCurrentStep ? 1 : 0.9, 
                          y: 0 
                        } : { opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <motion.div 
                          className="relative xl:h-[450px] lg:h-[300px] h-[200px] xl:w-[600px] lg:w-[450px] w-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={600}
                            height={800}
                            className="w-full h-full object-cover z-10"
                          />
                        </motion.div>
                      </motion.div>
                      
                      {/* Content with staggered animations */}
                      <motion.div 
                        className={`flex-1 order-2 lg:order-1 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}
                        initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
                        animate={carouselInView ? { 
                          opacity: isCurrentStep ? 1 : 0.7, 
                          x: 0 
                        } : { opacity: 0, x: isRTL ? 60 : -60 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={carouselInView ? { 
                            opacity: isCurrentStep ? 1 : 0.6 
                          } : { opacity: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <motion.div 
                            className="flex items-center mb-6"
                            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
                            animate={carouselInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 40 : -40 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <motion.div 
                              className={`bg-gradient-to-r ${step.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              initial={{ scale: 0, rotate: 180 }}
                              animate={carouselInView ? { 
                                scale: isCurrentStep ? 1 : 0.8, 
                                rotate: 0 
                              } : { scale: 0, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.5 }}
                            >
                              {index % processSteps.length + 1}
                            </motion.div>
                            <motion.div 
                              className={`h-0.5 bg-gradient-to-r ${isRTL ? 'from-transparent to-red-800' : 'from-red-800 to-transparent'} ${isRTL ? 'mr-4' : 'ml-4'}`}
                              initial={{ width: 0 }}
                              animate={carouselInView ? { width: isCurrentStep ? 64 : 48 } : { width: 0 }}
                              transition={{ duration: 0.8, delay: 0.7 }}
                            />
                          </motion.div>
                          
                          <motion.h3 
                            className="text-3xl lg:text-4xl font-bold text-[#2c58a2] mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={carouselInView ? { 
                              opacity: isCurrentStep ? 1 : 0.7, 
                              y: 0 
                            } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                          >
                            {step.title}
                          </motion.h3>
                          
                          <motion.p 
                            className={`text-lg text-[#777777] mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={carouselInView ? { 
                              opacity: isCurrentStep ? 1 : 0.6, 
                              y: 0 
                            } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            {step.description}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Progress Indicator with motion */}
        <motion.div 
          className="flex justify-center mt-10 space-x-2"
          ref={dotsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={dotsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {processSteps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? "w-12 h-3 bg-blue-400" 
                  : "w-3 h-3 bg-gray-300"
              }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={dotsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + (index * 0.1),
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
              whileHover={{ scale: 1.2, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}