"use client";

import Image from 'next/image';
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TeacherLive = () => {
    const t = useTranslations();
    const locale = useLocale();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-fit py-8 sm:py-12 md:py-16 bg-white overflow-hidden">
      {/* Background decorative elements - responsive sizes */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.5 : 0 }}
        transition={{ duration: 1.5 }}
      >
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center max-w-[1340px] mx-auto">
          
          {/* Left Side - Content */}
          <motion.div 
            className="space-y-6 md:space-y-8 relative z-10 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
            transition={{ duration: 0.7 }}
          >
            {/* Main heading */}
            <motion.div 
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#3189c5] font-bold leading-tight text-center lg:text-left">
                {t("heroTeacher.title")}
                </h1>
            </motion.div>

            {/* Description with glass effect */}
            <motion.div 
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-md relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
                {/* Glass shine effect */}
                <motion.div 
                  className="absolute "
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"] 
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 8
                  }}
                ></motion.div>
                
                <div className="relative z-10 space-y-4 sm:space-y-6  md:lg:text-justify text-center lg:text-center"> 
                <motion.p 
                  className="text-base sm:text-lg text-[#777777] leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                    {t("heroTeacher.description1")}
                </motion.p>
                
                <motion.p 
                  className="text-base sm:text-lg text-[#777777] leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                    {t("heroTeacher.description2")}
                </motion.p>
                
                <motion.p 
                  className="text-base sm:text-lg text-[#777777] leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                    {t("heroTeacher.description3")}
                </motion.p>
                </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div 
            className="relative w-full max-w-md mx-auto lg:max-w-none order-1 lg:order-2 mb-6 lg:mb-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Image container with glass effect */}
            <div className="relative aspect-[4/3] sm:aspect-video md:aspect-auto">
              {/* Background glow */}
              <motion.div 
                className="absolute -inset-2 sm:-inset-3 md:-inset-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5
                }}
              ></motion.div>
              
              {/* Main image */}
              <motion.div 
                className="relative z-10  overflow-hidden h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                 <Image 
                  src="/live2.jpg" 
                  alt="Live English Class" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 600px"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeacherLive;