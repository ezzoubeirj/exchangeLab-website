import CoursParticuliersClient from './CoursParticuliersClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title = 'Cours particuliers de langues en ligne pour enfants | Exchange Lab';
  const description =
    "Cours particuliers en ligne pour enfants : anglais, espagnol, arabe ou français. Un professeur dédié, un rythme adapté au niveau et aux objectifs de votre enfant. Suivi mensuel des progrès.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/cours-particuliers`,
      languages: {
        fr: `${BASE_URL}/fr/cours-particuliers`,
        ar: `${BASE_URL}/ar/cours-particuliers`,
        'x-default': `${BASE_URL}/fr/cours-particuliers`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/cours-particuliers`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function CoursParticuliersPage() {
  return <CoursParticuliersClient />;
}
