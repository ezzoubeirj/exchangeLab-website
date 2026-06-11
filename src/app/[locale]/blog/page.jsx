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
      languages: {
        fr: `${BASE_URL}/fr/blog`,
        ar: `${BASE_URL}/ar/blog`,
        'x-default': `${BASE_URL}/fr/blog`,
      },
    },
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
