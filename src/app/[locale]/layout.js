import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

const BASE_URL = 'https://www.xchangelab.info';

// Organization structured data — same on every page, describes the
// business as a whole rather than any single page's content.
// XLAB is a language-training provider, so EducationalOrganization is the
// most accurate schema.org type (it is a subtype of Organization).
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Exchange Lab',
  alternateName: 'XLAB',
  legalName: 'Exchange Lab (XLAB) — Xlabber Sarl',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Exchange Lab (XLAB) est un organisme de formation linguistique en ligne : cours d'anglais, d'espagnol, de français et de Coran en petits groupes, ainsi que des cours particuliers, avec test de niveau et suivi personnalisé.",
  email: 'contact@xchangelab.info',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
  },
  areaServed: [
    { '@type': 'Country', name: 'Morocco' },
    'International',
  ],
  // Languages XLAB provides support/instruction in (see Footer "support").
  availableLanguage: ['fr', 'en', 'ar', 'es'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@xchangelab.info',
    contactType: 'customer support',
    availableLanguage: ['fr', 'en', 'ar'],
  },
  sameAs: [
    'https://www.instagram.com/exchange_lab/',
    'https://www.tiktok.com/@exchange_lab',
    'https://ma.linkedin.com/company/exchangelab',
    'https://www.youtube.com/@ExchangeLab',
    'https://web.facebook.com/ExchangeLabMorocco',
  ],
};

export default async function LocaleLayout({
  children,
  params
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  // Set text direction based on locale
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  
  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`@/messages/${locale}`)).default;
  } catch (error) {
    notFound();
  }

  // Set font class based on locale 97
  const fontClass = locale === 'ar' ? 'tajawal-medium' : 'nunito-medium';

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClass}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}> 
          <Navbar />
          <main className="max-w-8xl mx-auto">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
