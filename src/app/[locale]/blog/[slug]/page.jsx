import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import PostPageClient from '@/components/blog/PostPageClient';

const BASE_URL = 'https://www.xchangelab.info';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article non trouvé' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/blog/${slug}`,
        ar: `${BASE_URL}/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      siteName: 'Exchange Lab',
      type: 'article',
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <PostPageClient post={post} locale={locale} />;
}
