"use client"

import { useState, useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ChevronUp, ChevronDown, ChevronRight, ChevronLeft, MessageCircle } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import SvgQuation from "./SvgQuation"

export default function FAQ() {
  const t = useTranslations("faq")
  const [expandedItems, setExpandedItems] = useState(new Set([0]))
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const locale = useLocale()
  const isRTL = locale === "ar"
  
  const faqData = [
    {
      id: 1,
      question: t("questions.howItWorks.question"),
      answer: t("questions.howItWorks.answer"),
    },
    {
      id: 2,
      question: t("questions.lessonsPerWeek.question"),
      answer: t("questions.lessonsPerWeek.answer"),
    },
    {
      id: 3,
      question: t("questions.worthIt.question"),
      answer: t("questions.worthIt.answer"),
    },
    {
      id: 4,
      question: t("questions.becomeTeacher.question"),
      answer: t("questions.becomeTeacher.answer"),
    },
    {
      id: 5,
      question: t("questions.howToPay.question"),
      answer: t("questions.howToPay.answer"),
    },
    {
      id: 6,
      question: t("questions.manual.question"),
      answer: t("questions.manual.answer"),
    },
  ]

  const toggleItem = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set();
      if (!prev.has(id)) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "+212663244841"; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/212663244841`;
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.7
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-12 sm:py-16 bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
     <div className="relative flex items-center justify-left px-4">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[var(--color-title)] mb-12 z-10"
          variants={titleVariants}
        >
          {t("title")}
        </motion.h2>
      </div>

      <motion.div 
        className="space-y-4"
        variants={containerVariants}
      >
        {faqData.map((item, index) => (
          <motion.div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`rounded-lg p-6 transition-all duration-300 cursor-pointer ${
              expandedItems.has(item.id) 
                ? "bg-white shadow-md" 
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            custom={index}
          >
            <motion.button
              className={`w-full flex items-center justify-between focus:outline-none rounded-lg ${isRTL ? "text-right" : "flex-left"}`}
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.span 
                className={`text-sm md:text-lg font-medium text-gray-700 ${isRTL ? "text-right" : "text-left"}`}
                animate={{ 
                  color: expandedItems.has(item.id) ? "var(--color-title)" : "#374151" 
                }}
              >
                {item.question}
              </motion.span>
              <motion.div 
                className="flex-shrink-0"
                animate={{ 
                  rotate: expandedItems.has(item.id) ? 0 : 180 
                }}
                transition={{ duration: 0.3 }}
              >
                <ChevronUp className="w-5 h-5 text-[var(--color-desc)]" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {expandedItems.has(item.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ 
                    opacity: { duration: 0.2 },
                    height: { duration: 0.3 }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className=" mt-4"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <p className="text-[var(--color-desc)] leading-relaxed text-sm md:text-md">{item.answer}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* WhatsApp Contact Button */}
      <motion.div 
        className="mt-12 text-center"
        variants={buttonVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.p 
            className="text-[#777777] text-sm md:text-base font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {isRTL ? "لديك المزيد من الأسئلة؟" : "Vous avez d’autres questions ?"}
          </motion.p>
          
          <motion.button 
            onClick={handleWhatsAppContact}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20  transition-opacity duration-300"
            />
            
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className={isRTL ? "ml-3" : "mr-3"}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
            
            <span className="relative z-10 text-sm md:text-base">
              {isRTL ? "تواصل معنا عبر واتساب" : "Contactez-nous sur WhatsApp"}
            </span>
            
            <motion.div
              animate={{ x: isRTL ? [-2, 2, -2] : [2, -2, 2] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className={isRTL ? "mr-3" : "ml-3"}
            >
              {isRTL ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </motion.div>
          </motion.button>
          
          <motion.div
            className="flex items-center space-x-2 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{isRTL ? "متوفرون للرد فوراً" : "En ligne maintenant"}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}