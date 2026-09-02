// Shared shell for the three English-in-Morocco search-intent landing pages.
// Server component: composes page-specific original content with reused XLAB
// components. Renders in both /fr and /ar via the [locale] layout.
//
// Architecture: Hero -> trust -> benefits -> explanatory content -> program
// info -> reused evidence (WhyChooseUs / OurCourses / testimonials) -> real
// lesson videos -> page FAQ -> internal links -> registration.

import { Link } from "@/i18n/navigation"
import LandingHero from "@/components/landing/LandingHero"
import LandingFaq from "@/components/landing/LandingFaq"
import LandingRegistration from "@/components/landing/LandingRegistration"
import WhyChooseUs from "@/components/WhyChooseUs"
import OurCourses from "@/components/OurCourses"
import StudentsTestimonial from "@/components/StudentsTestimonial"
import ParentReviews from "@/components/parentReviews"
import YoutubeTestimonials from "@/components/youtubeVideos"

export default function EnglishLandingPage({ content, locale, image, audience, source }) {
  const t = content[locale] || content.fr
  const isRTL = locale === "ar"
  const align = isRTL ? "text-right" : "text-left"

  const showParentReviews = audience !== "adults"
  const showStudentsTestimonial = audience !== "kids"

  return (
    <div>
      <LandingHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image={image}
        imageAlt={t.imageAlt}
        ctaLabel={t.hero.cta}
        trustLine={t.trust.line1}
      />

      {/* Trust / results — reused approved proof points */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className={`text-xl font-bold text-[var(--color-title)] mb-6 ${align}`}>{t.trust.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[t.trust.line1, t.trust.line2, t.trust.line3].map((line, i) => (
              <div key={i} className="rounded-xl bg-blue-50/60 p-5 text-[var(--color-desc)] text-sm md:text-base">
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-[var(--color-title)] mb-10 ${align}`}>{t.benefits.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.benefits.items.map((item, i) => (
              <div key={i} className={`rounded-2xl border border-gray-200 p-6 ${align}`}>
                <h3 className="font-semibold text-lg text-[var(--color-title)] mb-2">{item.title}</h3>
                <p className="text-[var(--color-desc)] text-sm md:text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Original explanatory content */}
      <section className="bg-[#F2F7FD] py-14">
        <div className={`max-w-3xl mx-auto px-4 ${align}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-title)] mb-6">{t.explainer.title}</h2>
          {t.explainer.paragraphs.map((p, i) => (
            <p key={i} className="text-[var(--color-desc)] leading-relaxed mb-4 text-sm md:text-base">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Program information */}
      <section className="bg-white py-14">
        <div className={`max-w-3xl mx-auto px-4 ${align}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-title)] mb-6">{t.program.title}</h2>
          {t.program.paragraphs.map((p, i) => (
            <p key={i} className="text-[var(--color-desc)] leading-relaxed mb-4 text-sm md:text-base">
              {p}
            </p>
          ))}
          <ul className="mt-4 space-y-2">
            {t.program.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-desc)] text-sm md:text-base">
                <span className="mt-1 text-[#3189c5]" aria-hidden="true">
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reused evidence + program visuals */}
      <WhyChooseUs />
      <OurCourses />
      {showStudentsTestimonial ? <StudentsTestimonial /> : null}
      {showParentReviews ? <ParentReviews /> : null}
      <YoutubeTestimonials />

      {/* Page-specific FAQ */}
      <LandingFaq title={t.faq.title} items={t.faq.items} />

      {/* Contextual internal links */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className={`max-w-3xl mx-auto px-4 ${align}`}>
          <h2 className="text-lg font-bold text-[var(--color-title)] mb-4">{t.crossLinks.title}</h2>
          <ul className="space-y-2">
            {t.crossLinks.items.map((l, i) => (
              <li key={i}>
                <Link href={l.href} className="text-[#3189c5] font-semibold hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Registration — embeds the existing ParentForm / StudentForm.
          "general" shows a kids/adults choice first. */}
      <LandingRegistration
        audience={audience === 'general' ? 'choice' : audience}
        source={source}
        content={t.registration}
      />
    </div>
  )
}
