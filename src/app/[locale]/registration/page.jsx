// SERVER COMPONENT — exports metadata, renders the client component below.
// ACTION REQUIRED: rename the existing page.jsx → RegistrationClient.jsx before deploying.

import RegistrationClient from './RegistrationClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = (await import(`@/messages/${locale}/seo.json`)).default;
  const { title, description } = seo.registration;

  return {
    title,
    description,
    // Registration page should not be indexed (private form)
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${BASE_URL}/${locale}/registration`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/registration`,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
    },
  };
}

export default function RegistrationPage() {
  return <RegistrationClient />;
}
