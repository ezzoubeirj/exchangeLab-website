// components/VideoSection.jsx
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from "next-intl"


const VideoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef(null);
  const t = useTranslations("howItWorks")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-white relative overflow-hidden   mx-auto px-4 md:px-8 py-16  mb-25"
    >
      
      {/* Floating particles - top left */}
      <svg 
        className="absolute top-20 left-10 w-48 h-48 opacity-20"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="1" fill="#3b82f6" />
        <circle cx="30" cy="10" r="1.5" fill="#60C7EA" />
        <circle cx="40" cy="30" r="1" fill="#3b82f6" />
        <circle cx="50" cy="15" r="2" fill="#3b82f6" />
        <circle cx="65" cy="30" r="1" fill="#60C7EA" />
        <circle cx="75" cy="10" r="1.5" fill="#3b82f6" />
        <circle cx="90" cy="20" r="1" fill="#60C7EA" />
        <circle cx="10" cy="40" r="1.5" fill="#3b82f6" />
        <circle cx="30" cy="50" r="1" fill="#60C7EA" />
        <circle cx="50" cy="45" r="1.5" fill="#3b82f6" />
        <circle cx="70" cy="55" r="1" fill="#3b82f6" />
        <circle cx="85" cy="45" r="2" fill="#60C7EA" />
        <circle cx="15" cy="65" r="1" fill="#60C7EA" />
        <circle cx="35" cy="75" r="1.5" fill="#3b82f6" />
        <circle cx="55" cy="70" r="1" fill="#60C7EA" />
        <circle cx="75" cy="80" r="1.5" fill="#3b82f6" />
        <circle cx="90" cy="65" r="1" fill="#60C7EA" />
        <circle cx="20" cy="90" r="2" fill="#3b82f6" />
        <circle cx="40" cy="85" r="1" fill="#60C7EA" />
        <circle cx="60" cy="95" r="1.5" fill="#3b82f6" />
        <circle cx="80" cy="90" r="1" fill="#60C7EA" />
      </svg>

      <div className="max-w-[1340px] mx-auto px-6 md:px-10 relative">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-[#2c58a2] font-bold text-center mb-4 handwritten"> {t('videoTitle')}</h2>
          
          {/* Decorative title underline */}
          <div className="flex justify-center mb-12 md:-ml- lg:-ml-20 xl:-ml-20">
            <svg width="180" height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6C20 2 40 10 60 6C80 2 100 1 120 6C140 11 160 2 179 6" 
                stroke="url(#underline-gradient)" 
                strokeWidth="4" 
                strokeLinecap="round"/>
              <defs>
                <linearGradient id="underline-gradient" x1="1" y1="6" x2="179" y2="6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" stopOpacity="0.4"/>
                  <stop offset="0.5" stopColor="#60C7EA"/>
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            
            {!showVideo ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
                  <button 
                    onClick={handlePlayClick}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group"
                    aria-label="Play video"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-200 group-hover:text-blue-100 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="w-full aspect-video relative">
                  <Image 
                    src="/howitworks.jpg" 
                    alt="Xchange Lab class" 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </>
            ) : (
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/7TAaHsiu1D8?autoplay=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center relative">
            {/* Advanced wave pattern */}
            <svg className="absolute w-full h-16 -top-8 left-0 opacity-10" viewBox="0 0 1200 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,20 C150,80 350,0 500,40 C650,80 700,0 850,50 C1000,100 1100,20 1200,40 V100 H0 Z" fill="url(#wave-gradient)"/>
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            <p className="text-lg text-[#777777] max-w-3xl mx-auto relative z-10"> {t('videoDescription')}</p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;