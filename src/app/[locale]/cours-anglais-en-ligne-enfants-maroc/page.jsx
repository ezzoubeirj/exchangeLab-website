import EnglishLandingPage from '@/components/landing/EnglishLandingPage';
import { buildLandingJsonLd, buildLandingMetadata } from '@/components/landing/landingSchema';
import content from '@/content/landing/englishOnlineKidsMorocco';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildLandingMetadata({ locale, slug: content.slug, content });
}

export default async function Page({ params }) {
  const { locale } = await params;
  const jsonLd = buildLandingJsonLd({ locale, slug: content.slug, content, audience: content.audience });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnglishLandingPage
        content={content}
        locale={locale}
        image={content.image}
        audience={content.audience}
        source="landing:english-kids-morocco"
      />
    </>
  );
}
