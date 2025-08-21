"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function WhyUs() {
  const t = useTranslations()
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
      className="bg-white  md:px-8 mb-24"
    >
      <div className="max-w-[1340px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8 }}
          className="relative bg-[#F2F7FD] rounded-3xl sm:rounded-xl px-2 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 overflow-hidden"
        >
          <div className="relative z-10">
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
                    <img
                      src="/why11.png"
                      alt="Why Choose Us"
                      className="w-35 h-35 sm:w-60 sm:h-60 object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("whyUs.title1")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("whyUs.description1")}
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
                    <img
                      src="/live111.png"
                      alt="Why Choose Us"
                      className="w-35 h-35 sm:w-60 sm:h-60 object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("whyUs.title2")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("whyUs.description2")}
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
                    <img
                      src="/why33.png"
                      alt="Why Choose Us"
                      className="w-35 h-35 sm:w-60 sm:h-60 object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("whyUs.title3")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("whyUs.description3")}
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
                    <img
                      src="/why44.png"
                      alt="Why Choose Us"
                      className="w-35 h-35 sm:w-60 sm:h-60 object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-lg sm:text-xl font-semibold text-[var(--color-title)] mb-2 sm:mb-3"
                >
                  {t("whyUs.title4")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-desc)] text-sm sm:text-base leading-relaxed"
                >
                  {t("whyUs.description4")}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}