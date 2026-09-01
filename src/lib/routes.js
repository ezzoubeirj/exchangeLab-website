import fs from 'fs';
import path from 'path';

const localeAppDir = path.join(process.cwd(), 'src', 'app', '[locale]');

// Routes that render a page but must stay OUT of the sitemap because they
// are explicitly noindex (private forms). Keep this in sync with the
// `robots: { index: false }` exports on the matching page.jsx files.
const NOINDEX_ROUTES = new Set([
  '/registration',
  '/cours-particuliers/inscription',
]);

// Per-route sitemap hints. Anything not listed falls back to DEFAULT_HINT,
// so a newly added page still shows up automatically (just with generic
// priority) instead of being silently missing.
const ROUTE_HINTS = {
  '': { priority: 1.0, changeFrequency: 'weekly' },
  '/courses': { priority: 0.9, changeFrequency: 'monthly' },
  '/cours-particuliers': { priority: 0.9, changeFrequency: 'monthly' },
  '/cours-particuliers/adultes': { priority: 0.8, changeFrequency: 'monthly' },
  '/how-it-works': { priority: 0.8, changeFrequency: 'monthly' },
  '/placement-test': { priority: 0.7, changeFrequency: 'monthly' },
  '/teacher': { priority: 0.6, changeFrequency: 'monthly' },
  '/privacy-policy': { priority: 0.3, changeFrequency: 'yearly' },
  '/conditions': { priority: 0.3, changeFrequency: 'yearly' },
};

const DEFAULT_HINT = { priority: 0.5, changeFrequency: 'monthly' };

const hasPageFile = (dir) =>
  ['page.jsx', 'page.js', 'page.tsx', 'page.ts'].some((f) =>
    fs.existsSync(path.join(dir, f))
  );

// Walk the [locale] app directory and collect every static route segment that
// resolves to a real page. Dynamic segments (`[slug]`, `[...rest]`), route
// groups (`(group)`) and private folders (`_foo`) are skipped — the blog
// index and blog articles are added separately by the sitemap so they can be
// enumerated from their own data source.
function walk(dir, base = '') {
  const routes = [];
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return routes;
  }

  if (base !== '' && hasPageFile(dir) && !NOINDEX_ROUTES.has(base) && base !== '/blog') {
    routes.push(base);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith('[') || name.startsWith('(') || name.startsWith('_')) continue;
    if (base === '' && name === 'blog') continue; // handled separately
    routes.push(...walk(path.join(dir, name), `${base}/${name}`));
  }

  return routes;
}

// Returns [{ path, priority, changeFrequency }] for every indexable static
// page under src/app/[locale], regardless of nesting depth.
export function getIndexableRoutes() {
  const paths = new Set(walk(localeAppDir));
  paths.add(''); // homepage always included

  return [...paths]
    .sort()
    .map((routePath) => ({
      path: routePath,
      ...(ROUTE_HINTS[routePath] || DEFAULT_HINT),
    }));
}
