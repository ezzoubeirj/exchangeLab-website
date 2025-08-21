"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, useAnimation } from "framer-motion";

export default function YoutubeTestimonials() {
  const scrollerRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const sectionRef = useRef(null);
  
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const t = useTranslations("howItWorks.homeVideo");
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  const videos = [
    { id: "k1", youtubeId: "C6KylmEh6tU", title: t("readingchallenge"), blurb: t("kidsReadingDescription"), audience: t("kids") },
    { id: "a1", youtubeId: "mu04GA47C0g", title: t("readinganddiscussion"), blurb: t("kidsDescription"), audience: t("adults") },
    { id: "k2", youtubeId: "mCYSGMAkTrM", title: t("examplecources"), blurb: t("adultsReadingDescription"), audience: t("kids") },
    { id: "a2", youtubeId: "HrZa0aDUyjA", title: t("communication"), blurb: t("adultsDescription"), audience: t("adults") },
    { id: "k3", youtubeId: "LMPuRab2L_4", title: t("grammer"), blurb: t("adultsGrammarDescription"), audience: t("kids") }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const root = scrollerRef.current;
    const startEl = startRef.current;
    const endEl = endRef.current;
    if (!root || !startEl || !endEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === startEl) setAtStart(e.isIntersecting);
          if (e.target === endEl) setAtEnd(e.isIntersecting);
        }
      },
      { root, threshold: 0.99 }
    );

    io.observe(startEl);
    io.observe(endEl);
    return () => io.disconnect();
  }, []);

  const scrollByStep = (forward = true) => {
    const el = scrollerRef.current;
    if (!el) return;
    
    const containerWidth = el.clientWidth;
    const gap = 16;
    
    const isMobile = window.innerWidth < 640;
    const step = isMobile 
      ? containerWidth
      : (containerWidth - (2 * gap)) / 3 + gap;
    
    const sign = isRTL ? -1 : 1;
    const amount = (forward ? 1 : -1) * sign * step;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onKey = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.key === "ArrowLeft") {
      scrollByStep(isRTL ? true : false);
    } else {
      scrollByStep(isRTL ? false : true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-white max-w-7xl mx-auto px-4  "
    >
      <motion.div 
        variants={itemVariants}
        className=" bg-[#F2F7FD] rounded-3xl sm:rounded-[80px] md:rounded-[100px] lg:rounded-[100px] px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16"
      >
        <motion.div 
          variants={itemVariants}
          className="space-y-2 text-left"
        >
          <motion.h2 
            variants={itemVariants}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-[var(--color-title)]">{t("title")}</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className={`text-sm sm:text-lg text-[#777777] ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative mt-6"
        >
          {/* Navigation Buttons */}
          <div className="pointer-events-none absolute inset-y-0 -left-2 sm:-left-11 -right-2 sm:-right-10 flex items-center justify-between px-2 z-40">
            <motion.button
              type="button"
              onClick={() => scrollByStep(false)}
              aria-label={t.prev}
              disabled={atStart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: atStart ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={[
                "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full ",
                "text-slate-700 hover:bg-white focus:outline-none hover:shadow",
                "transition-all duration-200",
                atStart ? "pointer-events-none" : ""
              ].join(" ")}
            >
              {isRTL ? (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollByStep(true)}
              aria-label={t.next}
              disabled={atEnd}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: atEnd ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={[
                "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full ",
                "text-slate-700 hover:bg-white focus:outline-none hover:shadow",
                "transition-all duration-200",
                atEnd ? "pointer-events-none" : ""
              ].join(" ")}
            >
              {isRTL ? (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 19l7-7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Video Scroller */}
          <motion.div
            variants={itemVariants}
            ref={scrollerRef}
            dir={isRTL ? "rtl" : "ltr"}
            tabIndex={0}
            onKeyDown={onKey}
            aria-label="Video testimonials"
            aria-orientation="horizontal"
            className={[
              "flex snap-x snap-mandatory gap-4 relative",
              "overflow-x-auto scroll-smooth no-scrollbar",
              "[-webkit-overflow-scrolling:touch]"
            ].join(" ")}
          >
            <div ref={startRef} className="flex-none w-px" aria-hidden="true" />
            {videos.map((v, index) => (
              <VideoCard key={v.id} video={v} index={index} />
            ))}
            <div ref={endRef} className="flex-none w-px" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function VideoCard({ video, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  const iframeSrc = `https://www.youtube.com/embed/${video.youtubeId}?rel=0&playsinline=1&modestbranding=1`;

  return (
    <div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="group relative flex-none snap-start w-full sm:w-[calc((100%-2rem)/3)]"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200 shadow-sm">
        <iframe
          title={video.title}
          src={iframeSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />

        <div
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-2 md:p-4",
            "bg-gradient-to-t from-white/95 via-white/80 to-transparent",
            "transition-all duration-300",
            "opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0"
          ].join(" ")}
        >
          <div className="mb-2 sm:mb-1 md:mb-2 flex items-center gap-2">
            <span
              className={[
                "inline-flex items-center rounded-full px-2 sm:px-1.5 md:px-2 py-0.5 text-xs sm:text-[10px] md:text-[11px] font-semibold",
                video.audience === "Adults" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
              ].join(" ")}
            >
              {video.audience}
            </span>
          </div>
          <h3 className="text-base sm:text-sm md:text-base font-semibold leading-tight">
            {video.title}
          </h3>
          <p className="mt-1 text-sm sm:text-[10px] md:text-xs text-slate-600">
            {video.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}