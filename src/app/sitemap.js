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

  return locales.flatMap(locale =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );
}
