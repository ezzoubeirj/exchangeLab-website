'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import LanguageBar from './LanguageBar';
import TypingAnimation from './TypingAnimation';

const Hero = () => {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  // Apply appropriate font class based on locale
  const fontClass = isRTL ? "tajawal-medium" : "montserrat-medium";
  const headingFontClass = isRTL ? "tajawal-bold" : "montserrat-bold";

  return (
    <section className="max-w-6xl mx-auto relative  pt-20 pb-2 bg-white mt-4">
      {/* Decorative Flowing Arrow Line - Left Side */}
      <div className={cn(
        "absolute top-0 h-full z-10 pointer-events-none",
        isRTL ? "left-[-50px]" : "right-[-50px]"
      )}>
      <svg width="60" height="100%" viewBox="0 0 60 800" preserveAspectRatio="none" className="opacity-30">
          {/* Main flowing curve */}
          <path
            d="M30,0 C60,100 10,200 30,300 C50,400 20,500 30,600 C40,700 20,750 30,800"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0,0"
            className="animate-drawLine"
          />
          
          {/* Arrow head at bottom */}
          <path
            d="M30,800 L20,780 M30,800 L40,780"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Decorative circles along the path */}
          <circle cx="30" cy="150" r="4" fill="var(--color-primary)" className="animate-pulse" />
          <circle cx="30" cy="300" r="6" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="30" cy="450" r="4" fill="var(--color-primary)" className="animate-pulse" />
          <circle cx="30" cy="600" r="6" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="30" cy="750" r="4" fill="var(--color-primary)" className="animate-pulse" />
          
          {/* Small decorative elements */}
          <path
            d="M20,200 C25,210 35,210 40,200"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          <path
            d="M20,500 C25,490 35,490 40,500"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Subtle gradient overlay for depth */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <path
            d="M30,0 C60,100 10,200 30,300 C50,400 20,500 30,600 C40,700 20,750 30,800"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3,3"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Full-width Background Image with gradient fade - contained strictly within the hero section */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{ top: '0', bottom: '0', left: '0', right: '0' }}
      >
        {/* Overlay to reduce image intensity */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      {/* SVG Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Wave Pattern SVG - Top */}
        <svg className="absolute top-0 right-0 w-full h-40 opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="var(--color-primary)" 
            fillOpacity=".1"
          ></path>
        </svg>
        
        {/* Circles Group - Top Left */}
        <div className="absolute top-20 left-10">
          <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-10">
            <circle cx="60" cy="60" r="40" fill="var(--color-primary)" />
            <circle cx="95" cy="30" r="15" fill="var(--color-accent)" />
            <circle cx="25" cy="90" r="10" fill="var(--color-secondary)" />
          </svg>
        </div>
        
        {/* Dots Grid Pattern - Bottom Right */}
        <div className="absolute bottom-10 right-10 opacity-10">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="var(--color-primary)" />
              </pattern>
            </defs>
            <rect width="150" height="150" fill="url(#dots)" />
          </svg>
        </div>
        
        {/* The original blur elements */}
        <div className="absolute top-10 left-6 w-16 h-16 rounded-full bg-[var(--color-primary)]/10 blur-xl"></div>
        <div className="absolute bottom-20 right-6 w-24 h-24 rounded-full bg-[var(--color-accent)]/10 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-[var(--color-primary)]/5 blur-3xl"></div>
      </div>

      <div className={cn(
        "container mx-auto px-4 relative z-10",
        isRTL ? "rtl" : "ltr"
      )}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 relative">
          
          {/* Left Column - Text Content */}
          <div className={cn(
            "w-full lg:w-1/2 relative",
            fontClass
          )}>

            {/* Main Heading */}
            <h1 className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-900",
              headingFontClass
            )}>
              {t('title')}
              <span className="text-[var(--color-accent)]">{t('titleHighlight')}</span>
            </h1>

            {/* Bullet Points with Circle Icons */}
            <div className="space-y-3 mb-6 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full flex-shrink-0"></div>
                <p className="text-base text-gray-700">
                  {t('bulletPoint1')}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full flex-shrink-0"></div>
                <p className="text-base text-gray-700">
                  {t('bulletPoint2')}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full flex-shrink-0"></div>
                <p className="text-base text-gray-700">
                  {t('bulletPoint3')}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/courses/live">
                <div className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-lg text-sm font-medium transition shadow-lg hover:shadow-xl hover:translate-y-[-2px]">
                  {t('primaryButton')}
                </div>
              </Link>
              <Link href="/courses/recorded">
                <div className="px-4 py-2 bg-white hover:bg-gray-50 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg hover:translate-y-[-2px]">
                  {t('secondaryButton')}
                </div>
              </Link>
            </div>

            {/* Add decorative SVG element to the left column */}
            {/* <div className="absolute -top-10 -left-10 w-40 h-40 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M50,5 L95,50 L50,95 L5,50 Z" 
                  fill="none" 
                  stroke="var(--color-accent)" 
                  strokeWidth="2"
                />
                <circle cx="50" cy="50" r="25" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
                <path 
                  d="M20,20 L80,80 M20,80 L80,20" 
                  stroke="var(--color-primary)" 
                  strokeWidth="1" 
                  strokeDasharray="4 2"
                />
              </svg>
            </div> */}
          </div>

          {/* Right Column - Modern Image Section */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[400px]">
  
  {/* Floating Language Greetings */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Hola */}
    <div className="absolute top-12 left-8 animate-float">
      <span className="text-2xl font-bold text-[var(--color-primary)]/20 rotate-12">
        Hola
      </span>
    </div>
    
    {/* Hello */}
    <div className="absolute top-24 right-12 animate-float-delayed">
      <span className="text-xl font-bold text-[var(--color-accent)]/25 -rotate-6">
        Hello
      </span>
    </div>
    
    {/* Bonjour */}
    <div className="absolute bottom-32 left-4 animate-float">
      <span className="text-lg font-bold text-[var(--color-primary)]/20 rotate-6">
        Bonjour
      </span>
    </div>
    
    {/* مرحبًا */}
    <div className="absolute bottom-16 right-6 animate-float-delayed">
      <span className="text-xl font-bold text-[var(--color-accent)]/25 -rotate-12">
        مرحبًا
      </span>
    </div>
    
    {/* Ciao */}
    <div className="absolute top-1/2 left-2 animate-float">
      <span className="text-lg font-bold text-[var(--color-primary)]/15 rotate-45">
        Ciao
      </span>
    </div>
  </div>

  {/* Decorative Circles */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Large background circle */}
    <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-[var(--color-accent)]/20 animate-pulse"></div>
    
    {/* Medium circles */}
    <div className="absolute bottom-12 left-12 w-16 h-16 rounded-full bg-[var(--color-primary)]/10 animate-bounce-slow"></div>
    <div className="absolute top-1/3 right-4 w-12 h-12 rounded-full border border-[var(--color-accent)]/30"></div>
    
    {/* Small decorative circles */}
    <div className="absolute top-20 left-16 w-6 h-6 rounded-full bg-[var(--color-accent)]/20"></div>
    <div className="absolute bottom-24 right-16 w-8 h-8 rounded-full bg-[var(--color-primary)]/15"></div>
    <div className="absolute top-2/3 left-8 w-4 h-4 rounded-full bg-[var(--color-accent)]/25"></div>
  </div>

  {/* X Logo Elements */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Large X logo - top right */}
    <div className="absolute top-16 right-16 opacity-10">
      <svg width="40" height="40" viewBox="0 0 40 40" className="animate-spin-slow">
        <path 
          d="M8 8 L32 32 M32 8 L8 32" 
          stroke="var(--color-primary)" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
    </div>
    
    {/* Medium X logo - bottom left */}
    <div className="absolute bottom-20 left-20 opacity-15">
      <svg width="28" height="28" viewBox="0 0 28 28" className="animate-pulse">
        <path 
          d="M6 6 L22 22 M22 6 L6 22" 
          stroke="var(--color-accent)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </svg>
    </div>
    
    {/* Small X logos scattered */}
    <div className="absolute top-1/4 left-6 opacity-20">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path 
          d="M4 4 L12 12 M12 4 L4 12" 
          stroke="var(--color-primary)" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </div>
    
    <div className="absolute bottom-1/3 right-8 opacity-15">
      <svg width="20" height="20" viewBox="0 0 20 20" className="animate-bounce-slow">
        <path 
          d="M5 5 L15 15 M15 5 L5 15" 
          stroke="var(--color-accent)" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  </div>

  {/* Geometric SVG Patterns */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Triangle pattern */}
    <div className="absolute top-1/2 right-2 opacity-10">
      <svg width="32" height="32" viewBox="0 0 32 32" className="animate-float">
        <path 
          d="M16 4 L28 24 L4 24 Z" 
          fill="none" 
          stroke="var(--color-primary)" 
          strokeWidth="2"
        />
      </svg>
    </div>
    
    {/* Diamond pattern */}
    <div className="absolute top-1/4 right-1/3 opacity-15">
      <svg width="24" height="24" viewBox="0 0 24 24" className="animate-pulse">
        <path 
          d="M12 2 L22 12 L12 22 L2 12 Z" 
          fill="none" 
          stroke="var(--color-accent)" 
          strokeWidth="1.5"
        />
      </svg>
    </div>
    
    {/* Hexagon */}
    <div className="absolute bottom-1/4 left-1/4 opacity-10">
      <svg width="28" height="28" viewBox="0 0 28 28" className="animate-spin-slow">
        <path 
          d="M14 2 L24 8 L24 20 L14 26 L4 20 L4 8 Z" 
          fill="none" 
          stroke="var(--color-primary)" 
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </div>

  {/* Main Pufa-Shaped Image Container */}
  <div className="relative w-[30rem] h-96 mx-auto z-10">
    {/* Pufa Shape */}
    {/* Inner Container with Padding */}
    <div 
      className="absolute inset-2 overflow-hidden"
      style={{
        borderRadius: '25px',
        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.6)'
      }}
    >
      {/* Inner Image Container */}
      <div className="relative w-full h-full overflow-hidden">
      <Image 
        src={isRTL ? "/herosection/leftToRight-pufa-girl.png" : "/herosection/girlpufapng.png"}
        alt="Students learning languages" 
        fill
        className="object-cover hover:scale-105 transition-transform duration-700"
        priority
      />
      </div>
    </div>
  </div>
 
</div>
        </div>
        
        {/* Language Bar */}
        <div className="mt-10">
          <LanguageBar />
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
