import { getTranslations } from 'next-intl/server';
import Hero from '@/components/hero/Hero';
import FaqAccordion from '@/components/FaqAccordion';
import StudentsTestimonial from '@/components/StudentsTestimonial';
import ParentReviews from '@/components/parentReviews';
import WhyChooseUs from '@/components/WhyChooseUs';
import OurCourses from '@/components/OurCourses';
import LanguageBar from '@/components/hero/LanguageBar';
import YoutubeTestimonials from '@/components/youtubeVideos';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = (await import(`@/messages/${locale}/seo.json`)).default;
  const { title, description } = seo.home;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        ar: `${BASE_URL}/ar`,
        'x-default': `${BASE_URL}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Exchange Lab — Cours de langues en ligne',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function HomePage() {
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
