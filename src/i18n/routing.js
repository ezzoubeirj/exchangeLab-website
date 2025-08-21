import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'fr'], // Supported languages
  defaultLocale: 'fr', // Default language if no locale is specified
  localePrefix: 'always', // Always prefix URLs with locale (e.g., /ar, /fr)
});