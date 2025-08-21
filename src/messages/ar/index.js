import navBar from './navBar.json';

import homePage from './homePage.json';
import hero from './hero.json';
import languageBar from './languageBar.json';
import fqa from './fqa.json';
import footer from './footer.json';
import teachersTestimonial from './teachersTestimonial.json';
import Footer from './footer.json';
import testimonialStudents from './testimonialStudents.json';
import studentsTestimonial from './studentsTestimonial.json';
import whyChooseUs from './whyChooseUs.json';
import ourCourses from './ourCourses.json';
import parentReviews from './parentReviews.json'; // Fixed casing to match convention
import howItWorks from './howItWorks.json';
import worksTestimonial from './worksTestimonial.json';
import placementTest from './placementTest.json';
import register from './register.json';
import beTeacher from './beTeacher.json';
 // Fixed casing to match convention
import conditions from './conditions.json'; // Fixed casing to match convention


export default {
  ...navBar,
  ...homePage,
  ...hero,
  ...languageBar,
  ...fqa,
  ...footer,
  ...teachersTestimonial,
  ...Footer,
  ...testimonialStudents,
  ...studentsTestimonial, // Fixed: removed .json suffix
  ...whyChooseUs,
  ...ourCourses,
  ...parentReviews,
  ...howItWorks,
  ...worksTestimonial,
  ...placementTest,
  ...register,
  ...beTeacher,
  ...conditions,
   // Fixed casing to match convention
   // Fixed casing to match convention
  // Add hero button translations
  Hero: {
    ...hero.Hero,
    primaryButton: "ابدأ الآن",
    secondaryButton: "شاهد العرض التوضيحي",
    bulletPoint1: "تعلم مع معلمين أصليين ذوي خبرة",
    bulletPoint2: "دروس مباشرة وتفاعلية في مجموعات صغيرة",
    bulletPoint3: "مواعيد مرنة تناسب جدولك الزمني",
    typingText: "Exchange Lab من ضمن أفضل 5% من المدارس الإلكترونية في العالم"
  }
};
