import CoursParticuliersClient from '../CoursParticuliersClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const title = 'Cours particuliers de langues en ligne pour adultes | Exchange Lab';
  const description =
    "Cours particuliers en ligne pour adultes : anglais, espagnol, arabe ou français. Un professeur dédié et des horaires adaptés à vos objectifs.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/cours-particuliers/adultes`,
      languages: {
        fr: `${BASE_URL}/fr/cours-particuliers/adultes`,
        ar: `${BASE_URL}/ar/cours-particuliers/adultes`,
        'x-default': `${BASE_URL}/fr/cours-particuliers/adultes`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/cours-particuliers/adultes`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function AdultCoursParticuliersPage() {
  return <CoursParticuliersClient audience="adults" />;
}
