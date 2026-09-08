import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import PostPageClient from '@/components/blog/PostPageClient';

// Pick up to `limit` other articles to suggest: those sharing the most tags
// with the current one first, then the most recent, so every article links
// out to genuinely related reading.
function getRelatedPosts(current, limit = 2) {
  const currentTags = new Set(current.tags || []);
  return getAllPosts()
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      post: p,
      shared: (p.tags || []).filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, limit)
    .map(({ post }) => ({ slug: post.slug, title: post.title, coverImage: post.coverImage || '' }));
}

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

// Absolute URL for an image path that may already be absolute.
function absUrl(src) {
  if (!src) return undefined;
  return src.startsWith('http') ? src : `${BASE_URL}${src}`;
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);

  // Article structured data — only for the indexable French articles. Arabic
  // article routes render the French body and are noindex, so we do not emit
  // BlogPosting for them. Dates and author come straight from the post's own
  // data; nothing is invented. `dateModified` falls back to the publish date
  // when the post has never recorded a separate modification date.
  const isAr = locale === 'ar';
  const image = absUrl(post.coverImage);
  const blogPostingJsonLd = isAr
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/${locale}/blog/${slug}` },
        headline: post.title,
        description: post.excerpt,
        ...(image ? { image: [image] } : {}),
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: 'fr',
        author: { '@type': 'Organization', name: post.author || 'Exchange Lab', url: BASE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Exchange Lab',
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
        },
        ...(post.tags && post.tags.length ? { keywords: post.tags.join(', ') } : {}),
      };

  return (
    <>
      {blogPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <PostPageClient post={post} locale={locale} related={related} />
    </>
  );
}
