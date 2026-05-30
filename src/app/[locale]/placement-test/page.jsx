// SERVER COMPONENT — exports metadata, renders the client component below.
// ACTION REQUIRED: rename the existing page.jsx → PlacementTestClient.jsx before deploying.

import PlacementTestClient from './PlacementTestClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = (await import(`@/messages/${locale}/seo.json`)).default;
  const { title, description } = seo.placementTest;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/placement-test`,
      languages: {
        fr: `${BASE_URL}/fr/placement-test`,
        ar: `${BASE_URL}/ar/placement-test`,
        'x-default': `${BASE_URL}/fr/placement-test`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/placement-test`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function PlacementTestPage() {
  return <PlacementTestClient />;
}
