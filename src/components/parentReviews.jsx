// JavaScript (React / Next.js)
"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { motion } from "framer-motion"

const STORAGE_KEY = "parentReviews.progress"

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #1a5c9e, #3189c5)",
  "linear-gradient(135deg, #b45309, #f59e0b)",
  "linear-gradient(135deg, #be123c, #f43f5e)",
  "linear-gradient(135deg, #3730a3, #6366f1)",
]

function getInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("")
}

// Deterministic waveform bar heights from an integer seed
function genBars(seed, n = 22) {
  const out = []
  let v = seed | 0
  for (let i = 0; i < n; i++) {
    v = Math.imul(v, 1664525) + 1013904223
    out.push(0.18 + ((v >>> 0) / 0xffffffff) * 0.78)
  }
  return out
}

const ParentReviews = () => {
  const t = useTranslations("ParentReviews")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null)

  const reviews = [
    { id: 1, parentName: t("parent1.name"), audioSrc: "/audio/Adultes-Madame-Amal.wav", durationLabel: "0:30", type: t("parent1.type") },
    { id: 2, parentName: t("parent3.name"), audioSrc: "/audio/Maman-de-Mariem.mp3",    durationLabel: "0:46", type: t("parent2.type") },
    { id: 3, parentName: t("parent2.name"), audioSrc: "/audio/Adultes-Madame-Ikram.wav",durationLabel: "0:31", type: t("parent1.type") },
    { id: 4, parentName: t("parent4.name"), audioSrc: "/audio/Papa-de-Ghali.mp3",       durationLabel: "0:41", type: t("parent2.type") },
  ]

  const sectionRef = useRef(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <motion.section
      ref={sectionRef}
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
                  y: -6,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <AudioCard
                  review={r}
                  isRTL={isRTL}
                  currentlyPlayingId={currentlyPlayingId}
                  onPlayChange={setCurrentlyPlayingId}
                  avatarGradient={AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]}
                  barSeed={r.id * 7919}
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

const AudioCard = ({ review, isRTL, currentlyPlayingId, onPlayChange, avatarGradient, barSeed }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [bufferedEnd, setBufferedEnd] = useState(0)
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const seekingRef = useRef(false)
  const restoredRef = useRef(false)
  const lastSaveTsRef = useRef(0)

  const initials = getInitials(review.parentName)
  const bars = genBars(barSeed)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateBuffered = () => {
      try {
        if (!audio.buffered.length) return
        const last = audio.buffered.length - 1
        setBufferedEnd(Math.min(audio.buffered.end(last), duration))
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
      onPlayChange(null)
    }

    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("loadeddata", handleLoaded)
    audio.addEventListener("durationchange", handleLoaded)
    audio.addEventListener("progress", updateBuffered)
    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("ended", onEnded)

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
    const pct = getSeekPercentFromClientX(clientX)
    if (pct === null) return
    const t = pct * duration
    try {
      if (audioRef.current) audioRef.current.currentTime = t
    } catch {}
    setCurrentTime(t)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      onPlayChange(review.id)
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const fmt = (s) => {
    const t = isFinite(s) ? Math.floor(s) : 0
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`
  }

  const progress = duration > 0 ? currentTime / duration : 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header: colored initials avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white select-none"
          style={{ background: avatarGradient }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-slate-800 text-sm truncate">{review.parentName}</div>
          <div className="text-xs text-slate-500 truncate">{review.type}</div>
        </div>
      </div>

      {/* Waveform + controls */}
      <div className="flex items-center gap-2">
        {/* Play / Pause button */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3189c5] text-white hover:bg-[#276c9a] transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Waveform bars + seek area */}
        <div
          ref={progressRef}
          className="relative flex-1 h-8 flex items-end gap-[2px] cursor-pointer select-none"
          onMouseDown={(e) => { seekingRef.current = true; seekToClientX(e.clientX) }}
          onMouseMove={(e) => { if (seekingRef.current) seekToClientX(e.clientX) }}
          onMouseUp={() => { seekingRef.current = false }}
          onMouseLeave={() => { seekingRef.current = false }}
          onTouchStart={(e) => { seekingRef.current = true; seekToClientX(e.touches[0].clientX) }}
          onTouchMove={(e) => { if (seekingRef.current) seekToClientX(e.touches[0].clientX) }}
          onTouchEnd={() => { seekingRef.current = false }}
        >
          {bars.map((h, i) => {
            const barProgress = i / bars.length
            const isFilled = barProgress <= progress
            const isBuffered = barProgress <= (duration > 0 ? bufferedEnd / duration : 0)
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-colors duration-100"
                style={{
                  height: `${Math.round(h * 100)}%`,
                  background: isFilled
                    ? "#3189c5"
                    : isBuffered
                    ? "#c7dff0"
                    : "#e2e8f0",
                }}
              />
            )
          })}
        </div>

        {/* Time */}
        <span className="flex-shrink-0 text-xs tabular-nums text-slate-400 w-8 text-right">
          {duration > 0 ? fmt(currentTime) : review.durationLabel}
        </span>
      </div>

      <audio ref={audioRef} src={review.audioSrc} preload="metadata" />
    </div>
  )
}

export default ParentReviews
