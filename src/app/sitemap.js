import { getAllSlugs } from '@/lib/posts';

export default function sitemap() {
  const base = 'https://www.xchangelab.info';
  const locales = ['fr', 'ar'];

  // Registration is noindex — excluded from sitemap intentionally.
  // Conditions is low-priority but indexable.
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/courses', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/teacher', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/placement-test', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/conditions', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticEntries = locales.flatMap(locale =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );

  // Blog index — French only is fully indexable; Arabic blog has no
  // translated content yet and is marked noindex in its own metadata,
  // so it's intentionally left out of the sitemap until that's fixed.
  const blogIndexEntries = [
    {
      url: `${base}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const slugs = getAllSlugs();
  const postEntries = slugs.map(slug => ({
    url: `${base}/fr/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogIndexEntries, ...postEntries];
}
