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
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      // Same reasoning as the blog index: post content is French-only
      // right now, so we don't claim an Arabic alternate that resolves
      // to identical French text.
      languages: {
        fr: `${BASE_URL}/fr/blog/${slug}`,
      },
    },
    // Stopgap until articles are actually translated: keep /ar/blog/[slug]
    // reachable (it currently renders the French article so Arabic
    // visitors aren't met with a 404) but excluded from indexing so it
    // doesn't compete with the French original as duplicate content.
    ...(isAr ? { robots: { index: false, follow: true } } : {}),
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [`${BASE_URL}${post.coverImage}`] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author || 'Exchange Lab',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Exchange Lab',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PostPageClient post={post} locale={locale} />
    </>
  );
}
