import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

const BASE_URL = 'https://www.xchangelab.info';

// Organization structured data — same on every page, describes the
// business as a whole rather than any single page's content.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Exchange Lab',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [
    'https://www.instagram.com/exchange_lab/',
    'https://www.youtube.com/@Exchange Lab',
    'https://www.tiktok.com/@exchange_lab',
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
