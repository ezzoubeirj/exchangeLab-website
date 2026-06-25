import { getAllPosts } from '@/lib/posts';
import BlogPageClient from '@/components/blog/BlogPageClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'المدونة | Exchange Lab' : 'Blog | Exchange Lab',
    description: isAr
      ? 'نصائح وموارد لتعلم اللغات مع Exchange Lab'
      : "Conseils, ressources et actualités pour apprendre les langues avec Exchange Lab.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      // Articles are only written in French today. Declaring a separate
      // "ar" alternate when the content served there is identical French
      // text creates a hreflang/content mismatch, so we only advertise
      // the language that actually has translated content.
      languages: {
        fr: `${BASE_URL}/fr/blog`,
        'x-default': `${BASE_URL}/fr/blog`,
      },
    },
    // No Arabic translation exists yet for blog content — keep the route
    // crawlable for users (so it doesn't 404) but out of the index until
    // real Arabic articles are written. Remove this once translated.
    ...(isAr ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: isAr ? 'المدونة | Exchange Lab' : 'Blog | Exchange Lab',
      description: isAr
        ? 'نصائح وموارد لتعلم اللغات'
        : "Conseils et ressources pour apprendre les langues.",
      url: `${BASE_URL}/${locale}/blog`,
      siteName: 'Exchange Lab',
    },
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} locale={locale} />;
}
