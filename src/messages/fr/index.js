import navBar from './navBar.json';
import homePage from './homePage.json';
import hero from './hero.json';
import languageBar from './languageBar.json';
import teachersTestimonial from './teachersTestimonial.json';
import fqa from './fqa.json';
import Footer from './footer.json';
import testimonialStudents from './testimonialStudents.json';
import studentsTestimonial from './studentsTestimonial.json';
import whyChooseUs from './whyChooseUs.json';
import ourCourses from './ourCourses.json';
import ParentReviews from './parentReviews.json';
import howItWorks from './howItWorks.json';
import worksTestimonial from './worksTestimonial.json';
import placementTest from './placementTest.json';
import register from './register.json'; // Fixed casing to match convention
import beTeacher from './beTeacher.json';
import conditions from './conditions.json'; // Fixed casing to match convention


export default {
  ...navBar,
  ...homePage,
  ...hero,
  ...languageBar,
  ...fqa,
  ...Footer,
  ...teachersTestimonial,
  ...testimonialStudents,
  ...studentsTestimonial, // Fixed: removed .json suffix
  ...whyChooseUs,
  ...ourCourses,
  ...ParentReviews,
  ...howItWorks,
  ...worksTestimonial,
  ...placementTest,
  ...register,
  ...beTeacher,
  ...conditions,
  // Add hero button translations
  Hero: {
    ...hero.Hero,
    primaryButton: "Commencer maintenant",
    secondaryButton: "Regarder la démo",
    bulletPoint1: "Apprenez avec des professeurs natifs expérimentés",
    bulletPoint2: "Cours en direct et interactifs en petit groupe",
    bulletPoint3: "Horaires flexibles adaptés à votre emploi du temps",
    typingText: "Exchange Lab fait partie des 5 % des meilleures écoles en ligne dans le monde"
  }
};

