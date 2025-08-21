"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"


export default function WhyChooseUs() {
  const t = useTranslations("verbling")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white py-14 px-2 sm:py-14 sm:px-4 md:py-16 md:px-8"
    >
      <div className="flex flex-col items-center justify-center mt-5 md:mt-0">
        <div className="flex items-center gap-3 py-6">
          {/* Google Logo SVG */}
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" className="mr-2">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Rating Text */}
          <div className="text-[#777777] font-medium text-xs md:text-lg">{t("google")} </div>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-gray-500 mt-8 md:mt-0 mb-8 text-base sm:text-lg"
        >
          {t("part1")}{" "}
          <span className="text-[var(--color-title)] font-semibold">
            {t("part2")}
          </span>
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8 }}
          className="relative bg-[#F2F7FD] rounded-3xl sm:rounded-[80px] md:rounded-[120px] lg:rounded-[150px] px-2 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 overflow-hidden"
        >
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-14 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-title)] mb-3 sm:mb-4">
                {t("title")}
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-desc)] max-w-lg mx-auto">
                {t("subtitle")}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {/* Verified tutors */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative mb-5 sm:mb-6 flex justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-45 h-45 sm:w-55 sm:h-55 bg-red-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute top-2 right-2 w-3 h-3 bg-red-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className="absolute bottom-3 left-3 w-2 h-2 bg-red-300 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      ></motion.div>
                      <motion.div
                        className="absolute top-1/2 left-1 w-1.5 h-1.5 bg-red-300 rounded-full"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      ></motion.div>
                      <img
                        src="/whyus1.png"
                        alt="Why Choose Us"
                        className="icon w-35 h-35 sm:w-45 sm:h-45 object-cover rounded-lg"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-red-300 rounded-full opacity-60"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    ></motion.div>
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-200 rounded-full opacity-70"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                    ></motion.div>
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("features.verified_tutors.title")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("features.verified_tutors.description")}
                </motion.p>
              </motion.div>

              {/* Affordable */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative mb-5 sm:mb-6 flex justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-45 h-45 sm:w-55 sm:h-55 bg-blue-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute top-2 left-2 w-3 h-3 bg-blue-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3.2, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className="absolute bottom-2 right-3 w-2 h-2 bg-blue-300 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.7, repeat: Infinity, delay: 0.6 }}
                      ></motion.div>
                      <motion.div
                        className="absolute top-1/2 right-1 w-1.5 h-1.5 bg-blue-300 rounded-full"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }}
                      ></motion.div>
                      <img
                        src="/whyus2.jpg"
                        alt="Why Choose Us"
                        className="icon w-35 h-35 sm:w-45 sm:h-45 object-cover rounded-lg"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-1 -left-2 w-3 h-3 bg-blue-300 rounded-full opacity-60"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3.1, repeat: Infinity, repeatType: "reverse" }}
                    ></motion.div>
                    <motion.div
                      className="absolute -bottom-2 -right-1 w-4 h-4 bg-blue-200 rounded-full opacity-70"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse", delay: 0.7 }}
                    ></motion.div>
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("features.affordable.title")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("features.affordable.description")}
                </motion.p>
              </motion.div>

              {/* Flexible schedule */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative mb-5 sm:mb-6 flex justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-45 h-45 sm:w-55 sm:h-55 bg-red-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute top-3 right-2 w-2 h-2 bg-red-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.8, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className="absolute bottom-2 left-2 w-3 h-3 bg-red-300 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3.3, repeat: Infinity, delay: 0.8 }}
                      ></motion.div>
                      <motion.div
                        className="absolute top-1/3 left-1 w-1.5 h-1.5 bg-red-300 rounded-full"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 }}
                      ></motion.div>
                      <img
                        src="/whyus3.png"
                        alt="Why Choose Us"
                        width={45}
                        height={45}
                        className="icon w-35 h-35 sm:w-45 sm:h-45 object-cover rounded-lg"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-2 -left-1 w-4 h-4 bg-red-300 rounded-full opacity-60"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse" }}
                    ></motion.div>
                    <motion.div
                      className="absolute -bottom-1 -right-2 w-3 h-3 bg-red-200 rounded-full opacity-70"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.9, repeat: Infinity, repeatType: "reverse", delay: 0.9 }}
                    ></motion.div>
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("features.flexible_schedule.title")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("features.flexible_schedule.description")}
                </motion.p>
              </motion.div>

              {/* All-in-one platform */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative mb-5 sm:mb-6 flex justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-45 h-45 sm:w-55 sm:h-55 bg-blue-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute top-2 left-3 w-2 h-2 bg-blue-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3.4, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className="absolute bottom-3 right-2 w-3 h-3 bg-blue-300 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.6, repeat: Infinity, delay: 0.7 }}
                      ></motion.div>
                      <motion.div
                        className="absolute top-1/2 right-1 w-1.5 h-1.5 bg-blue-300 rounded-full"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.3, repeat: Infinity, delay: 1.3 }}
                      ></motion.div>
                      <img
                        src="/whyus4.png"
                        alt="Why Choose Us"
                        className="icon w-35 h-35 sm:w-45 sm:h-45 object-cover rounded-lg"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-2 w-3 h-3 bg-blue-300 rounded-full opacity-60"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3.3, repeat: Infinity, repeatType: "reverse" }}
                    ></motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-1 w-4 h-4 bg-blue-200 rounded-full opacity-70"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    ></motion.div>
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("features.all_in_one.title")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("features.all_in_one.description")}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}