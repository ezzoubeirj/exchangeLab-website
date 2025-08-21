'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { debounce } from 'lodash'
import { motion } from 'framer-motion'
import FlowerSvgGroup from './SvgShape'
import FlowerBackground from './SvgShape'
const videos = [
  '/videos/student20.mp4',
  '/videos/student1.mp4',
  '/videos/student4.mp4',
  '/videos/student555.mp4',
]

const thumbnails = [
  '/student2.png',
  '/student1.png',
  '/student4.png',
  '/student5.png',
]

export default function StudentsTestimonial() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [playingIndex, setPlayingIndex] = useState(null)
  const [progress, setProgress] = useState(Array(videos.length).fill(0))
  const [hasPlayed, setHasPlayed] = useState(Array(videos.length).fill(false))
  const videoRefs = useRef([])
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const debouncedSetHoveredIndex = useCallback(
    debounce((index) => setHoveredIndex(index), 100),
    []
  )

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  // Scroll to video by index (for small screens)
  const scrollToIndex = (idx) => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[idx]
    if (!child) return
  
    const left =
      child.offsetLeft - (container.clientWidth - child.clientWidth) / 2
  
    container.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }
  
  // 2) Guard the effect to avoid auto-scroll on initial load
  const didInitRef = useRef(false)
  useEffect(() => {
    if (!isSmallScreen) return
    if (!inView) return // optional: only after section is visible
  
    if (!didInitRef.current) {
      didInitRef.current = true
      return // skip first run on reload
    }
  
    scrollToIndex(currentIndex)
  }, [currentIndex, isSmallScreen, inView])

  useEffect(() => {
    if (isSmallScreen) scrollToIndex(currentIndex)
  }, [currentIndex, isSmallScreen])

  const handlePrev = () => setCurrentIndex(i => Math.max(0, i - 1))
  const handleNext = () => setCurrentIndex(i => Math.min(videos.length - 1, i + 1))

  const togglePlayPause = (index) => {
    const videoElement = videoRefs.current[index]
    if (videoElement.paused) {
      videoRefs.current.forEach((video, i) => {
        if (i !== index && video) video.pause()
      })
      videoElement.play()
      setPlayingIndex(index)
      if (!hasPlayed[index]) {
        setHasPlayed(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }
    } else {
      videoElement.pause()
      setPlayingIndex(null)
    }
  }

  const updateProgress = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      const percentage = (video.currentTime / video.duration) * 100
      setProgress(prev => {
        const newProgress = [...prev]
        newProgress[index] = percentage
        return newProgress
      })
    }
  }

  const handleSeek = (e, index) => {
    const video = videoRefs.current[index]
    if (video) {
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / progressBar.offsetWidth
      video.currentTime = pos * video.duration
      updateProgress(index)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const videoContainerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  return (
    <div
      ref={sectionRef}
      className="py-8 md:py-12 lg:py-16 bg-white relative overflow-hidden"
    >
      {/* Title Section */}
      <motion.div
        className="container mb-8 md:mb-12"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className={`${isRTL ? 'ml-auto' : 'mr-auto'} pb-16 pl-5 xl:pl-0`}
          variants={itemVariants}
        >
          <motion.h2
            className="  text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[var(--color-title)] relative z-10 "
            variants={itemVariants}
          >
            {t('title')}
            <motion.span
              className={`absolute bottom-0 left-0 h-1 bg-[#ff7f6e] rounded-full ${isRTL ? 'right-0 left-auto w-15' : 'w-20'} opacity-40`}
              initial={{ width: 0 }}
              animate={inView ? { width: isRTL ? '3.75rem' : '5rem' } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            ></motion.span>
          </motion.h2>
          <motion.p
            className="text-[var(--color-desc)] text-base sm:text-lg relative z-10 "
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Videos Section */}
      <div className="relative">
      <div className="absolute  -top-30 -right-105 w-[1800px] h-[1000px] z-0 pointer-events-none hidden lg:block opacity-50">
        <FlowerBackground className="w-full h-full" width="100%" height="100%" />
      </div>
        {isSmallScreen ? (
          <motion.div
            className="relative mb-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition disabled:opacity-40"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous video"
              style={{ display: currentIndex === 0 ? 'none' : 'block' }}
            >
              <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition disabled:opacity-40"
              onClick={handleNext}
              disabled={currentIndex === videos.length - 1}
              aria-label="Next video"
              style={{ display: currentIndex === videos.length - 1 ? 'none' : 'block' }}
            >
              <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
            {/* Scrollable videos */}
            <div
              ref={scrollRef}
              className="flex flex-nowrap gap-4 overflow-x-auto px-4 snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
            >
              {videos.map((videoSrc, index) => (
                <motion.div
                  key={index}
                  className="min-w-[200px] max-w-[200px] h-64 relative overflow-hidden rounded shadow-md snap-center flex-shrink-0"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Video element */}
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={videoSrc}
                    preload="metadata"
                    loading="lazy"
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                      hasPlayed[index] ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    onEnded={() => setPlayingIndex(null)}
                    onClick={() => togglePlayPause(index)}
                    onTimeUpdate={() => updateProgress(index)}
                    playsInline
                  />
                  {/* Thumbnail overlay */}
                  <motion.div
                    className={`absolute inset-0 cursor-pointer transition-opacity duration-300 ${
                      hasPlayed[index] && playingIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}
                    onClick={() => togglePlayPause(index)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={thumbnails[index]}
                      width={150}
                      height={150}
                      alt={`Video thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute top-4 left-4 bg-transparent group flex items-center">
                      <motion.div
                        className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 flex items-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="black"
                          className="ml-0.5"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out ml-0 group-hover:ml-2 text-black text-sm font-medium">
                          Play
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                  {/* Custom play/pause button */}
                  {hasPlayed[index] && (
                    <motion.button
                      className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-30 transition-all"
                      onClick={e => {
                        e.stopPropagation()
                        togglePlayPause(index)
                      }}
                      aria-label={playingIndex === index ? "Pause video" : "Play video"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {playingIndex === index ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      )}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="max-w-[1340px] mx-auto flex gap-4 justify-center items-center h-[27rem] px-4"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {videos.map((videoSrc, index) => (
              <motion.div
                key={index}
                className={`transition-all duration-500 ease-linear h-full relative overflow-hidden rounded-3xl shadow-md video-container ${
                  playingIndex === index
                    ? 'w-[100%]'
                    : hoveredIndex === index
                    ? 'w-[50%]'
                    : index === 0
                    ? 'w-[50%]'
                    : 'w-[20%]'
                }`}
                onMouseEnter={() => debouncedSetHoveredIndex(index)}
                onMouseLeave={() => debouncedSetHoveredIndex(null)}
                variants={videoContainerVariants}
                custom={index}
                whileHover={{
                  boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.15)",
                  y: -5
                }}
              >
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={videoSrc}
                  preload="metadata"
                  loading="lazy"
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                    hasPlayed[index] ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  onEnded={() => setPlayingIndex(null)}
                  onClick={() => togglePlayPause(index)}
                  onTimeUpdate={() => updateProgress(index)}
                  playsInline
                />
                <motion.div
                  className={`absolute inset-0 cursor-pointer transition-opacity duration-300`}
                  onClick={() => togglePlayPause(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={thumbnails[index]}
                    width={150}
                    height={150}
                    alt={`Video thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-transparent group flex items-center">
                    <motion.div
                      className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="black"
                        className="ml-0.5"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out ml-0 group-hover:ml-2 text-black text-sm font-medium">
                        Play
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
                {hasPlayed[index] && (
                  <motion.button
                    className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-30 transition-all"
                    onClick={e => {
                      e.stopPropagation()
                      togglePlayPause(index)
                    }}
                    aria-label={playingIndex === index ? "Pause video" : "Play video"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {playingIndex === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </motion.button>
                )}
                {hasPlayed[index] && (
                  <div className="absolute bottom-0 left-0 w-full pb-4 px-4 flex justify-center z-30">
                    <motion.div
                      className="w-[90%] h-3 bg-gray-700 bg-opacity-70 cursor-pointer rounded-full overflow-hidden shadow-md hover:h-4 transition-all"
                      onClick={e => {
                        e.stopPropagation()
                        handleSeek(e, index)
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${progress[index]}%` }}
                        animate={{
                          width: `${progress[index]}%`,
                          transition: { duration: 0.1 }
                        }}
                      ></motion.div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}