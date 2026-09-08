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

// Per-route sitemap hints AND the authoritative list of indexable static
// routes. This map is the single source of truth: every key here is emitted
// in the sitemap for each locale. It exists as an explicit list (rather than
// relying solely on a runtime filesystem walk) because the sitemap route is
// ISR (`revalidate`) and can regenerate at runtime on Vercel, where the
// `src/app` SOURCE tree is NOT bundled into the serverless function — a
// filesystem walk then finds nothing and the service/landing pages silently
// drop out of the sitemap. Listing them here guarantees they are always
// present. When you add a new indexable page, add its path here.
const ROUTE_HINTS = {
  '': { priority: 1.0, changeFrequency: 'weekly' },
  '/courses': { priority: 0.9, changeFrequency: 'monthly' },
  '/cours-anglais-en-ligne-maroc': { priority: 0.9, changeFrequency: 'monthly' },
  '/cours-anglais-en-ligne-enfants-maroc': { priority: 0.85, changeFrequency: 'monthly' },
  '/cours-anglais-en-ligne-adultes-maroc': { priority: 0.85, changeFrequency: 'monthly' },
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

// Build-time augmentation: walk the [locale] app directory and collect every
// static route that resolves to a real page, so a newly added route is picked
// up automatically even before it is added to ROUTE_HINTS. Dynamic segments
// (`[slug]`), route groups (`(group)`) and private folders (`_foo`) are
// skipped; the blog index and articles are added separately by the sitemap.
// If the source tree is unavailable (e.g. runtime on Vercel) this simply
// returns nothing and the explicit ROUTE_HINTS list is used on its own.
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
// page. The explicit ROUTE_HINTS keys are the guaranteed baseline; any extra
// routes discovered by the build-time filesystem walk are merged in. noindex
// routes are always excluded.
export function getIndexableRoutes() {
  const paths = new Set(Object.keys(ROUTE_HINTS));
  for (const p of walk(localeAppDir)) paths.add(p);
  paths.add(''); // homepage always included

  return [...paths]
    .filter((routePath) => !NOINDEX_ROUTES.has(routePath))
    .sort()
    .map((routePath) => ({
      path: routePath,
      ...(ROUTE_HINTS[routePath] || DEFAULT_HINT),
    }));
}
