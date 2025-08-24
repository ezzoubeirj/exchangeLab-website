import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: {
      ...(await import(`@/messages/${locale}/homePage.json`)).default,
      ...(await import(`@/messages/${locale}/navBar.json`)).default,
      ...(await import(`@/messages/${locale}/hero.json`)).default,
      ...(await import(`@/messages/${locale}/fqa.json`)).default,
      ...(await import(`@/messages/${locale}/footer.json`)).default,
      ...(await import(`@/messages/${locale}/teachersTestimonial.json`)).default,
      ...(await import(`@/messages/${locale}/testimonialStudents.json`)).default,
      ...(await import(`@/messages/${locale}/languageBar.json`)).default,
      ...(await import(`@/messages/${locale}/studentsTestimonial.json`)).default,
      ...(await import(`@/messages/${locale}/ourCourses.json`)).default,
      ...(await import(`@/messages/${locale}/parentReviews.json`)).default,
      ...(await import(`@/messages/${locale}/howItWorks.json`)).default,
      ...(await import(`@/messages/${locale}/worksTestimonial.json`)).default,
      ...(await import(`@/messages/${locale}/placementTest.json`)).default,
      ...(await import(`@/messages/${locale}/register.json`)).default,
      ...(await import(`@/messages/${locale}/beTeacher.json`)).default,
      ...(await import(`@/messages/${locale}/conditions.json`)).default,
    }
  };
});