import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import PostPageClient from '@/components/blog/PostPageClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article non trouvé' };
  const isAr = locale === 'ar';
  return {
    title: post.title,
    description: post.excerpt,
    // Articles are French-only. Arabic article routes render the French content,
    // so they stay noindex and are not advertised as hreflang alternates.
    ...(isAr ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/blog/${slug}`,
        'x-default': `${BASE_URL}/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      siteName: 'Exchange Lab',
      type: 'article',
      images: post.coverImage
        ? [{
            url: post.coverImage.startsWith('http')
              ? post.coverImage
              : `${BASE_URL}${post.coverImage}`,
            width: 1200,
            height: 630,
            alt: post.title,
          }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage
        ? [post.coverImage.startsWith('http') ? post.coverImage : `${BASE_URL}${post.coverImage}`]
        : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <PostPageClient post={post} locale={locale} />;
}
