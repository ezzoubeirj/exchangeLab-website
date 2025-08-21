import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

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

  // Set font class based on locale
  const fontClass = locale === 'ar' ? 'tajawal-medium' : 'nunito-medium';

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClass}`}>
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
