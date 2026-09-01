import { getAllPosts } from '@/lib/posts';
import { getIndexableRoutes } from '@/lib/routes';

// Re-evaluate at most once a day so the sitemap still refreshes even when a
// deploy is not triggered. New blog posts are committed to the repo (which
// does trigger a deploy), but this keeps `lastModified` and any filesystem
// changes from going stale for longer than 24h.
export const revalidate = 86400;

export default function sitemap() {
  const base = 'https://www.xchangelab.info';
  const locales = ['fr', 'ar'];
  const now = new Date();

  // Static pages are discovered by walking src/app/[locale] rather than being
  // hardcoded, so a newly added route (e.g. /cours-particuliers) appears in
  // the sitemap automatically. noindex routes are excluded in getIndexableRoutes.
  const routes = getIndexableRoutes();

  const staticEntries = locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  );

  // Blog is French-only for indexing. The Arabic blog has no translated
  // content and is marked noindex in its own metadata, so it is intentionally
  // left out of the sitemap (both the index and the articles).
  const blogIndexEntries = [
    {
      url: `${base}/fr/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Articles are enumerated from the content/posts directory — never hardcoded —
  // so every published (and any future) FR article is included automatically.
  const postEntries = getAllPosts().map((post) => ({
    url: `${base}/fr/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogIndexEntries, ...postEntries];
}
