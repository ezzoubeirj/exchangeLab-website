import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/hero/Hero';
import FaqAccordion from '@/components/FaqAccordion';
import TestimonialVideos from '@/components/TeachersTestimonial';
// import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import StudentsTestimonial from '@/components/StudentsTestimonial';
import ParentReviews from '@/components/parentReviews';
import WhyChooseUs from '@/components/WhyChooseUs';
import OurCourses from '@/components/OurCourses';
import LanguageBar from '@/components/hero/LanguageBar';
import YoutubeTestimonials from '@/components/youtubeVideos';


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    // title: t('title'),
    description: `Learn languages online in ${locale === 'ar' ? 'العربية' : 'Français'}`
  };
}

export default function HomePage({ params }) {
 

  return (
    <div className=''>
      <div className="relative">
        <Hero />
        <div className="relative z-10 -mt-20 sm:-mt-8 md:-mt-13 lg:-mt-23 xl:-mt-22 2xl:-mt-20">
          <LanguageBar />
        </div>
      <WhyChooseUs />
      </div>
      <StudentsTestimonial />
      <OurCourses />
      <YoutubeTestimonials />
      <ParentReviews />
      <FaqAccordion />
      </div>
  );
}