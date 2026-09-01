// SERVER COMPONENT — exports metadata, renders the client component below.
// ACTION REQUIRED: rename the existing page.jsx → CoursesClient.jsx before deploying.

import CoursesClient from './CoursesClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = (await import(`@/messages/${locale}/seo.json`)).default;
  const { title, description } = seo.courses;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/courses`,
      languages: {
        fr: `${BASE_URL}/fr/courses`,
        ar: `${BASE_URL}/ar/courses`,
        'x-default': `${BASE_URL}/fr/courses`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/courses`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CoursesPage({ params }) {
  const { locale } = await params;
  const { ourCourses } = (await import(`@/messages/${locale}/ourCourses.json`)).default;

  // Course structured data — built from the programmes actually listed on this
  // page (ourCourses.json). Rendered server-side so crawlers see it in the HTML.
  const courseKeys = ['course1', 'course2', 'course3', 'course4', 'course5', 'course6', 'course7'];
  const coursesJsonLd = courseKeys
    .filter((key) => ourCourses[key]?.title)
    .map((key) => ({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: ourCourses[key].title,
      description: ourCourses[key].description,
      inLanguage: locale,
      url: `${BASE_URL}/${locale}/courses`,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Exchange Lab',
        alternateName: 'XLAB',
        url: BASE_URL,
      },
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <CoursesClient />
    </>
  );
}
