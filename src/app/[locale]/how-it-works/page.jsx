// SERVER COMPONENT — exports metadata, renders the client component below.
// ACTION REQUIRED: rename the existing page.jsx → HowItWorksClient.jsx before deploying.

import HowItWorksClient from './HowItWorksClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = (await import(`@/messages/${locale}/seo.json`)).default;
  const { title, description } = seo.howItWorks;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/how-it-works`,
      languages: {
        fr: `${BASE_URL}/fr/how-it-works`,
        ar: `${BASE_URL}/ar/how-it-works`,
        'x-default': `${BASE_URL}/fr/how-it-works`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/how-it-works`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
