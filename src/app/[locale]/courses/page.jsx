"use client";
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Enhanced decorative SVG components
const DecorativeDots = ({ className }) => (
  <svg className={`absolute opacity-20 ${className}`} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="5" fill="#1E76B5" />
    <circle cx="40" cy="10" r="5" fill="#1E76B5" />
    <circle cx="70" cy="10" r="5" fill="#1E76B5" />
    <circle cx="100" cy="10" r="5" fill="#1E76B5" />
    <circle cx="10" cy="40" r="5" fill="#1E76B5" />
    <circle cx="40" cy="40" r="5" fill="#1E76B5" />
    <circle cx="70" cy="40" r="5" fill="#1E76B5" />
    <circle cx="100" cy="40" r="5" fill="#1E76B5" />
    <circle cx="10" cy="70" r="5" fill="#1E76B5" />
    <circle cx="40" cy="70" r="5" fill="#1E76B5" />
    <circle cx="70" cy="70" r="5" fill="#1E76B5" />
    <circle cx="100" cy="70" r="5" fill="#1E76B5" />
  </svg>
);

const DecorativeWave = ({ className }) => (
  <svg className={`absolute opacity-15 ${className}`} width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50C40 20 60 80 100 50C140 20 160 80 200 50" stroke="#1E76B5" strokeWidth="2" />
    <path d="M0 70C40 40 60 100 100 70C140 40 160 100 200 70" stroke="#1E76B5" strokeWidth="2" />
    <path d="M0 30C40 0 60 60 100 30C140 0 160 60 200 30" stroke="#1E76B5" strokeWidth="2" />
  </svg>
);

const DecorativeCircle = ({ className }) => (
  <div className={`absolute rounded-full bg-gradient-to-r from-[#1E76B5]/20 to-[#777777]/10 ${className}`}></div>
);

const AccentShape = ({ className }) => (
  <div className={`absolute rounded-lg bg-gradient-to-br from-[#cd1822]/10 to-[#cd1822]/5 ${className}`}></div>
);

export default function CoursesPage() {
  const t = useTranslations('ourCourses');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const sectionRef = useRef(null);
  
  // Create refs for each course section
  const courseRefs = useRef([]);
  
  // Setup intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.style.opacity = 1;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe the section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Observe each course section
    courseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      courseRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  // Course data - from translations
  const courses = [
    {
      id: 1,
      title: t('course1.title'),
      description: t('course1.description'),
      image: t('course1.image'),
      features: [
        t('course1.feature1'),
        t('course1.feature2'),
        t('course1.feature3'),
      ],
    },
    {
      id: 2,
      title: t('course2.title'),
      description: t('course2.description'),
      image: t('course2.image'),
      features: [
        t('course2.feature1'),
        t('course2.feature2'),
        t('course2.feature3'),
      ],
    },
    {
      id: 3,
      title: t('course3.title'),
      description: t('course3.description'),
      image: t('course3.image'),
      features: [
        t('course3.feature1'),
        t('course3.feature2'),
        t('course3.feature3'),
      ],
    },
    {
      id: 4,
      title: t('course4.title'),
      description: t('course4.description'),
      image: t('course4.image'),
      features: [
        t('course4.feature1'),
        t('course4.feature2'),
        t('course4.feature3'),
      ],
    },
    {
      id: 5,
      title: t('course5.title'),
      description: t('course5.description'),
      image: t('course5.image'),
      features: [
        t('course5.feature1'),
        t('course5.feature2'),
        t('course5.feature3'),
      ],
    },
    {
      id: 6,
      title: t('course6.title'),
      description: t('course6.description'),
      image: t('course6.image'),
      features: [
        t('course6.feature1'),
        t('course6.feature2'),
        t('course6.feature3'),
      ],
    },
    {
      id: 7,
      title: t('course7.title'),
      description: t('course7.description'),
      image: t('course7.image'),
      features: [
        t('course7.feature1'),
        t('course7.feature2'),
        t('course7.feature3'),
      ],
    }
  ];

  return (
    <section className="py-40 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Decorative elements */}
      <div className="absolute left-6 md:left-12 top-0 h-full z-10 pointer-events-none">
        <svg width="60" height="100%" viewBox="0 0 60 1200" preserveAspectRatio="none" className="opacity-30">
          <path
            d="M30,0 C60,150 10,300 30,450 C50,600 10,750 30,900 C40,1050 20,1150 30,1200"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0,0"
            className="animate-drawLine"
          />
          
          <path
            d="M30,1200 L20,1180 M30,1200 L40,1180"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          <circle cx="30" cy="150" r="4" fill="var(--color-primary)" className="animate-pulse" />
          <circle cx="30" cy="300" r="6" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="30" cy="450" r="4" fill="var(--color-primary)" className="animate-pulse" />
          <circle cx="30" cy="600" r="6" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="30" cy="750" r="4" fill="var(--color-primary)" className="animate-pulse" />
          <circle cx="30" cy="900" r="6" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="30" cy="1050" r="4" fill="var(--color-primary)" className="animate-pulse" />
          
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
          
          <path
            d="M20,800 C25,810 35,810 40,800"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          <defs>
            <linearGradient id="courseLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <path
            d="M30,0 C60,150 10,300 30,450 C50,600 10,750 30,900 C40,1050 20,1150 30,1200"
            fill="none"
            stroke="url(#courseLineGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3,3"
            opacity="0.6"
          />
        </svg>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <DecorativeCircle className="-z-10 w-96 h-96 -top-48 -left-48 opacity-30 animate-gentle-float" />
        <DecorativeCircle className="-z-10 w-80 h-80 bottom-20 -right-40 opacity-20" />
        <AccentShape className="-z-10 w-64 h-64 top-1/3 -right-32 rotate-45" />
        <DecorativeWave className="-z-10 bottom-10 left-0 opacity-10 w-full" />
      </div>
      
      <div className="px-4 relative">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-20 relative opacity-0"
          style={{ transition: 'all 0.8s ease-out' }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isRTL ? 'tajawal-bold' : 'ubuntu-bold'} text-[#1E76B5]`}>
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1E76B5] to-[#777777] mx-auto mb-6 rounded-full"></div>
          <p className={`text-lg text-[#777777] max-w-3xl mx-auto ${isRTL ? 'tajawal-regular' : 'open-sans-regular'}`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Courses List */}
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {courses.map((course, index) => (
            <div 
              key={course.id}
              ref={(el) => (courseRefs.current[index] = el)}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center relative opacity-0`}
              style={{ transition: 'all 0.8s ease-out', transitionDelay: `${index * 0.2}s` }}
            >
              {/* Decorative elements */}
              {index % 2 === 0 ? (
                <>
                  <DecorativeDots className="-z-10 -top-16 -left-10" />
                  <AccentShape className="-z-10 w-40 h-40 -bottom-20 -right-20 rotate-12" />
                </>
              ) : (
                <>
                  <DecorativeWave className="-z-10 -bottom-16 -right-10" />
                  <DecorativeCircle className="-z-10 w-40 h-40 -top-10 -left-5" />
                </>
              )}
              
              {/* Image Section - ensure proper spacing */}
              <div className={`md:w-1/2 relative ${index % 2 === 0 ? 'md:mr-36' : 'md:ml-18'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-xl">
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E76B5]/30 to-transparent z-10"></div>
                  
                  {/* Course image */}
                  <div className="overflow-hidden h-[350px] md:h-[500px]">
                    <Image 
                      src={course.image}
                      alt={course.title}
                      width={500}
                      height={650}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E76B5] to-[#cd1822]/70"></div>
                </div>
                
                {/* Corner accent */}
                <div 
                  className={`absolute ${index % 2 === 0 ? '-right-4' : '-left-4'} -bottom-4 w-16 h-16 rounded-full bg-[#1E76B5]/10 -z-5 animate-pulse-subtle`}
                ></div>
              </div>
              
              {/* Content Section - decreased width with better internal constraints */}
              <div className={`md:w-1/2 ${isRTL ? 'text-right md:pl-0' : 'text-left md:pr-0'}`}>
                <div className={`relative ${isRTL ? 'md:pl-6' : 'md:pr-6'} max-w-md mx-auto md:mx-0`}>
                  {/* Small decorative accent */}
                  <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} -top-2 w-10 h-1 bg-[#cd1822]/70 rounded-full`}></div>
                  
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-[#1E76B5] ${isRTL ? 'tajawal-bold' : 'ubuntu-bold'}`}>
                    {course.title}
                  </h3>
                  
                  <p className={`text-[#777777] mb-8 ${isRTL ? 'tajawal-regular' : 'open-sans-regular'} text-sm md:text-base`}>
                    {course.description}
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {course.features.map((feature, i) => (
                      <li 
                        key={i} 
                        className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 group`}
                      >
                        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1E76B5]/20 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6673 3.5L5.25065 9.91667L2.33398 7" stroke="#1E76B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className={`${isRTL ? 'tajawal-medium' : 'open-sans-medium'} transition-all duration-300 group-hover:text-[#1E76B5] flex-1`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Two buttons side by side */}
                  <div className={`flex gap-4 mt-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <button 
                      className={`px-6 py-3 rounded-lg shadow-md 
                      bg-gradient-to-r from-[#1E76B5] to-[#777777] text-white 
                      transform transition-all duration-300
                      hover:shadow-xl hover:translate-y-[-2px]
                      active:translate-y-[1px] 
                      ${isRTL ? 'tajawal-medium' : 'open-sans-medium'}`}
                    >
                      {t('learnMore')}
                    </button>
                    
                    <button 
                      className={`px-6 py-3 rounded-lg shadow-md 
                      bg-white border border-[#1E76B5] text-[#1E76B5] 
                      transform transition-all duration-300
                      hover:shadow-lg hover:translate-y-[-2px] hover:bg-blue-50
                      active:translate-y-[1px] 
                      ${isRTL ? 'tajawal-medium' : 'open-sans-medium'}`}
                    >
                      {t('register')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
