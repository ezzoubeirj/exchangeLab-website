// JavaScript (React / Next.js)
"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

const STORAGE_KEY = "parentReviews.progress"


const ParentReviews = () => {
  const t = useTranslations("ParentReviews")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null)

  const reviews = [
    { id: 1, parentName: t("parent1.name"), parentImage: "/profele.png", audioSrc: "/audio/Adultes-Madame-Amal.wav", durationLabel: "0:30", type: t("parent1.type") },
    { id: 2, parentName: t("parent3.name"), parentImage: "/profele.png", audioSrc: "/audio/Maman-de-Mariem.mp3", durationLabel: "0:46", type: t("parent2.type") },
    { id: 3, parentName: t("parent2.name"), parentImage: "/profele.png", audioSrc: "/audio/Adultes-Madame-Ikram.wav", durationLabel: "0:31", type: t("parent1.type") },
    { id: 4, parentName: t("parent4.name"), parentImage: "/profele.png", audioSrc: "/audio/Papa-de-Ghali.mp3", durationLabel: "0:41", type: t("parent2.type") },
  ]

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

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section 
      className="bg-white px-4 sm:px-8 md:px-12 lg:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-left">
          <motion.div 
            className="flex items-center justify-left mb-8 md:mb-12"
            variants={titleVariants}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[var(--color-title)] open-sans-bold tracking-tight">
              {t("title")}
            </h2>
          </motion.div>

          <motion.div 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${isRTL ? "direction-rtl" : ""}`}
            variants={containerVariants}
          >
            {reviews.map((r, index) => (
              <motion.div
                key={r.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <AudioCard
                  review={r}
                  isRTL={isRTL}
                  currentlyPlayingId={currentlyPlayingId}
                  onPlayChange={setCurrentlyPlayingId}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

const readProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}
const writeProgress = (map) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {}
}

const AudioCard = ({ review, isRTL, currentlyPlayingId, onPlayChange }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [bufferedEnd, setBufferedEnd] = useState(0)
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const seekingRef = useRef(false)
  const lastSaveTsRef = useRef(0)
  const restoredRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateBuffered = () => {
      if (!audio.buffered || !Number.isFinite(duration) || duration <= 0) {
        setBufferedEnd(0)
        return
      }
      try {
        const last = audio.buffered.length - 1
        if (last >= 0) setBufferedEnd(Math.min(audio.buffered.end(last), duration))
      } catch {
        setBufferedEnd(0)
      }
    }

    const handleLoaded = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0
      if (dur > 0) setDuration(dur)
      if (!restoredRef.current && dur > 0) {
        const saved = readProgress()[review.audioSrc]
        if (Number.isFinite(saved) && saved > 0 && saved < dur - 1) {
          try {
            audio.currentTime = saved
            setCurrentTime(saved)
          } catch {}
        }
        restoredRef.current = true
      }
      updateBuffered()
    }

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      const now = performance.now()
      if (now - lastSaveTsRef.current > 1000) {
        const map = readProgress()
        map[review.audioSrc] = Math.floor(audio.currentTime)
        writeProgress(map)
        lastSaveTsRef.current = now
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      onPlayChange(null)
      const map = readProgress()
      if (map[review.audioSrc] != null) {
        delete map[review.audioSrc]
        writeProgress(map)
      }
    }

    // Attach listeners
    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("loadeddata", handleLoaded)
    audio.addEventListener("durationchange", handleLoaded)
    audio.addEventListener("progress", updateBuffered)
    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("ended", onEnded)

    // Handle cached metadata on reload (event may have fired before listener)
    if ((audio.readyState ?? 0) >= 1 || Number.isFinite(audio.duration)) {
      handleLoaded()
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("loadeddata", handleLoaded)
      audio.removeEventListener("durationchange", handleLoaded)
      audio.removeEventListener("progress", updateBuffered)
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("ended", onEnded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review.audioSrc, onPlayChange])

  useEffect(() => {
    if (currentlyPlayingId !== review.id && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }, [currentlyPlayingId, isPlaying, review.id])

  const getSeekPercentFromClientX = (clientX) => {
    const bar = progressRef.current
    if (!bar || !duration) return null
    const rect = bar.getBoundingClientRect()
    let x = clientX - rect.left
    x = Math.min(Math.max(x, 0), rect.width)
    return rect.width ? x / rect.width : 0
  }

  const seekToClientX = (clientX) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const percent = getSeekPercentFromClientX(clientX)
    if (percent == null) return
    const next = percent * duration
    audio.currentTime = next
    setCurrentTime(next)
    const map = readProgress()
    map[review.audioSrc] = Math.floor(next)
    writeProgress(map)
  }

  const onPointerDown = (e) => {
    e.preventDefault()
    seekingRef.current = true
    progressRef.current?.setPointerCapture?.(e.pointerId)
    seekToClientX(e.clientX)
  }
  const onPointerMove = (e) => {
    if (!seekingRef.current) return
    e.preventDefault()
    seekToClientX(e.clientX)
  }
  const onPointerUp = (e) => {
    if (!seekingRef.current) return
    e.preventDefault()
    seekingRef.current = false
    progressRef.current?.releasePointerCapture?.(e.pointerId)
  }
  const onPointerLeave = (e) => {
    if (!seekingRef.current) return
    e.preventDefault()
    seekingRef.current = false
  }

  const onSliderKeyDown = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const step = e.shiftKey ? 10 : 5
    if (e.key === "ArrowRight" || (isRTL && e.key === "ArrowLeft")) {
      e.preventDefault()
      audio.currentTime = Math.min(duration, audio.currentTime + step)
      setCurrentTime(audio.currentTime)
    } else if (e.key === "ArrowLeft" || (isRTL && e.key === "ArrowRight")) {
      e.preventDefault()
      audio.currentTime = Math.max(0, audio.currentTime - step)
      setCurrentTime(audio.currentTime)
    } else if (e.key === "Home") {
      e.preventDefault()
      audio.currentTime = 0
      setCurrentTime(0)
    } else if (e.key === "End") {
      e.preventDefault()
      audio.currentTime = duration
      setCurrentTime(duration)
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      toggle()
    }
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      onPlayChange(null)
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          onPlayChange(review.id)
        })
        .catch(() => {})
    }
  }

  const format = (t) => {
    if (!isFinite(t)) return "0:00"
    const m = Math.floor(t / 60)
    const s = String(Math.floor(t % 60)).padStart(2, "0")
    return `${m}:${s}`
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0
  const bufferedPct = duration ? (bufferedEnd / duration) * 100 : 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={review.parentImage || "/placeholder.svg"}
          alt={review.parentName}
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
        <div className="min-w-0">
          <div className="font-semibold text-slate-800 text-sm truncate">{review.parentName}</div>
          <div className="text-xs text-slate-500 truncate">{review.type}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div
            ref={progressRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
            onKeyDown={onSliderKeyDown}
            className="h-2 w-full rounded-full cursor-pointer relative select-none outline-none touch-none"
            aria-label="Seek"
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration) || 0}
            aria-valuenow={Math.floor(currentTime) || 0}
            aria-valuetext={`${format(currentTime)} of ${format(duration)}`}
          >
            <div className="absolute inset-0 bg-slate-200 rounded-full" />
            <div
              className={`h-2 rounded-full absolute top-0 ${isRTL ? "right-0" : "left-0"} bg-slate-300`}
              style={{ width: `${bufferedPct}%` }}
            />
            <div
              className={`h-2 rounded-full absolute top-0 ${isRTL ? "right-0" : "left-0"} ${
                isPlaying ? "bg-blue-600" : "bg-slate-400"
              }`}
              style={{ width: `${progressPct}%` }}
            />
            <div
              className={`absolute -top-1 ${isRTL ? "right-0" : "left-0"} transform ${
                isRTL ? "translate-x-1/2" : "-translate-x-1/2"
              }`}
              style={{ [isRTL ? "right" : "left"]: `${progressPct}%` }}
              aria-hidden="true"
            >
              <div className={`w-4 h-4 rounded-full ${isPlaying ? "bg-blue-600" : "bg-slate-400"} shadow`} />
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>{format(currentTime)}</span>
            <span>{format(duration)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={review.audioSrc} preload="metadata" />
    </div>
  )
}

export default ParentReviews