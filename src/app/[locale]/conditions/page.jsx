// SERVER COMPONENT — exports metadata, renders the client component below.
// ACTION REQUIRED: rename the existing page.jsx → ConditionsClient.jsx before deploying.

import ConditionsClient from './ConditionsClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = (await import(`@/messages/${locale}/seo.json`)).default;
  const { title, description } = seo.conditions;

  return {
    title,
    description,
    // Legal pages are typically noindexed or at least not actively promoted
    alternates: {
      canonical: `${BASE_URL}/${locale}/conditions`,
      languages: {
        fr: `${BASE_URL}/fr/conditions`,
        ar: `${BASE_URL}/ar/conditions`,
        'x-default': `${BASE_URL}/fr/conditions`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/conditions`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
    },
  };
}

export default function ConditionsPage() {
  return <ConditionsClient />;
}
