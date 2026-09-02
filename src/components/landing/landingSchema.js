// Structured data for the English-in-Morocco landing pages.
// Uses the same schema vocabulary as the rest of the site (EducationalOrganization
// as provider, Course, FAQPage, BreadcrumbList).

const BASE_URL = 'https://www.xchangelab.info';

const PROVIDER = {
  '@type': 'EducationalOrganization',
  name: 'Exchange Lab',
  alternateName: 'XLAB',
  url: BASE_URL,
};

export function buildLandingJsonLd({ locale, slug, content, audience }) {
  const t = content[locale] || content.fr;
  const pageUrl = `${BASE_URL}/${locale}/${slug}`;

  const course = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: t.seo.title.replace(/\s*\|.*$/, ''),
    description: t.seo.description,
    url: pageUrl,
    provider: PROVIDER,
    inLanguage: 'en',
    teaches: 'English',
    courseMode: 'online',
    isAccessibleForFree: false,
    availableLanguage: ['fr', 'ar'],
    ...(audience === 'kids'
      ? { audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: 'children' } }
      : audience === 'adults'
        ? { audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: 'adults' } }
        : {}),
    offers: {
      '@type': 'Offer',
      category: 'Language course',
      availability: 'https://schema.org/InStock',
      areaServed: [{ '@type': 'Country', name: 'Morocco' }, 'International'],
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ar' ? 'الرئيسية' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.seo.title.replace(/\s*\|.*$/, ''), item: pageUrl },
    ],
  };

  return [course, faqPage, breadcrumb];
}

export function buildLandingMetadata({ locale, slug, content }) {
  const t = content[locale] || content.fr;
  const url = `${BASE_URL}/${locale}/${slug}`;
  const { title, description } = t.seo;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${BASE_URL}/fr/${slug}`,
        ar: `${BASE_URL}/ar/${slug}`,
        'x-default': `${BASE_URL}/fr/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Exchange Lab',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [{ url: `${BASE_URL}${content.image}`, width: 1536, height: 1024, alt: t.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}${content.image}`],
    },
  };
}
