"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Play, Pause, ChevronLeft, ChevronRight, Star, GraduationCap, Globe, Volume2, VolumeX, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TeachersTestimonial() {
  const t = useTranslations("Teachers")
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef(null)
  const intervalRef = useRef(null)

  const teachers = [
    {
      id: 1,
      name: "Sarah Martinez",
      language: t("spanish"),
      rating: 5,
      speaks: t("french") + ", " + t("arabic") + ", " + t("english"),
      quote: t("quote1"),
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // More reliable video source
      thumbnail: "/teacher1.jpg", // Using image from public folder
      flag: "/es-flag.png",
      students: 700
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      language: t("english"),
      rating: 5,
      speaks: t("arabic") + ", " + t("english"),
      quote: t("quote2"),
      videoSrc: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // Alternative video source
      thumbnail: "/teacher2.jpg", // Using image from public folder
      flag: "/gb-flag.png",
      students: 1500
    },
    {
      id: 3,
      name: "Jasmine Dupont",
      language: t("french"),
      rating: 5,
      speaks: t("french") + ", " + t("english"),
      quote: t("quote3"),
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Reliable Google test video
      thumbnail: "/teacher3.jpg", // Using image from public folder
      flag: "/fr-flag.png",
      students: 1000
    },
  ]

  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % teachers.length)
      }, 6000)
    }
    return () => clearInterval(intervalRef.current)
  }, [autoplay, teachers.length])

  useEffect(() => {
    // Reset video error state when changing videos
    setVideoError(false)
    
    if (videoRef.current) {
      videoRef.current.load(); // Force reload the video when changing
      
      if (isPlaying) {
        // Use promise with catch to handle autoplay issues
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch(error => {
              // Auto-play was prevented
              setIsPlaying(false);
              console.log("Video playback prevented:", error);
            });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeIndex]);

  const handleNext = () => {
    // Pause current video when switching
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setActiveIndex((prev) => (prev + 1) % teachers.length);
    setAutoplay(false);
  };

  const handlePrev = () => {
    // Pause current video when switching
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setActiveIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
    setAutoplay(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    setAutoplay(false)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoError = () => {
    setVideoError(true);
    console.log("Video failed to load");
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="relative montserrat-bold text-3xl lg:text-4xl mb-6 inline-block">
            <span className="text-[var(--color-dark)] relative z-10">{t("heading.part1")} </span>
            <span className="text-[var(--color-danger)] relative z-10 inline-block"> 
               {t("heading.part2")}
              {/* Modern underline just for part2 - higher position and 70% width */}
              <span className="absolute -bottom-2 left-0 right-0 mx-auto w-[70%] h-2 bg-[var(--color-danger)] rounded-full">
                {/* <span className="absolute top-0 left-0 w-2/3 h-full bg- opacity-30 animate-pulse"></span> */}
              </span>
            </span>
            
            {/* Remove the previous underline and keep only the highlight */}
            <span className="absolute -z-10 top-0 left-0 right-0 h-full bg-gradient-to-r from-blue-50 to-transparent opacity-50 transform -skew-x-12"></span>
          </h2>
          <p className="roboto-regular text-[var(--color-text-dark)] max-w-2xl mx-auto">
            {t("subheading")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Video Section */}
          <motion.div 
            className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-video bg-blue-900/10 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <video
                    ref={videoRef}
                    src={teachers[activeIndex].videoSrc}
                    poster={teachers[activeIndex].thumbnail} // Always show thumbnail as poster
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    onError={handleVideoError}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full bg-black/40 hover:bg-black/60 p-2 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="rounded-full bg-exchage-blue hover:bg-primary p-3 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                  </button>
                  <div className="text-white text-sm">
                    {videoError ? (
                      <span className="text-red-400">Video unavailable</span>
                    ) : (
                      <span className="font-medium nunito-medium">{teachers[activeIndex].name}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Play Button Overlay (visible when video is not playing) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="rounded-full bg-exchage-blue/80 hover:bg-primary p-5 transition-colors transform hover:scale-110 animate-pulse-subtle"
                    aria-label="Play Video"
                  >
                    <Play className="w-10 h-10 text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4">
              {teachers.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-white' : 'w-4 bg-white/50'
                  }`}
                  onClick={() => {
                    // Pause current video when switching
                    if (videoRef.current && isPlaying) {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    }
                    setActiveIndex(index);
                    setAutoplay(false);
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Teacher Info Section */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="relative mr-3">
                        <img 
                          src={teachers[activeIndex].flag} 
                          alt="Flag" 
                          className="w-10 h-10 object-cover rounded-full border-2 border-blue-100" 
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="montserrat-bold text-2xl text-gray-900">
                        {teachers[activeIndex].name}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-[#777777] space-x-4">
                      <div className="flex items-center">
                        <Globe size={16} className="mr-1 text-blue-600" />
                        <span>{teachers[activeIndex].language}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={16} className="mr-1 text-blue-600" />
                        <span>{teachers[activeIndex].speaks}</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-500" />
                        <span>{teachers[activeIndex].rating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <blockquote className="relative mt-4 mb-6">
                  <div className="absolute -top-2 -left-2 text-blue-200 text-4xl">"</div>
                  <p className="roboto-regular italic text-gray-700 relative z-10 pl-6 leading-relaxed">
                    {teachers[activeIndex].quote}
                  </p>
                  <div className="absolute -bottom-2 -right-2 text-blue-200 text-4xl">"</div>
                </blockquote>

                <div className="flex justify-between items-center mt-8">
                  <div className="flex items-center text-sm">
                    <span className="text-blue-700 font-semibold flex items-center">
                      <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2">
                        <span className="font-bold">{teachers[activeIndex].students}</span>
                        + {t("student")}
                      </span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}