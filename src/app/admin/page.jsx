'use client';
import { useState } from 'react';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

const INPUT_CLASS =
  'w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3189c5] text-gray-700 bg-gray-50 focus:bg-white transition-colors text-sm';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    author: 'Exchange Lab',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  /* ── Auth ── */
  async function handleAuth(e) {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'auth', password }),
      });
      if (res.ok) {
        setAuthed(true);
        setAuthError('');
      } else {
        setAuthError('Mot de passe incorrect.');
      }
    } catch {
      setAuthError('Erreur réseau. Réessayez.');
    }
    setAuthLoading(false);
  }

  /* ── Helpers ── */
  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function handleTitleChange(e) {
    const title = e.target.value;
    setForm(f => ({ ...f, title, slug: slugify(title) }));
  }

  /* ── Publish ── */
  async function handlePublish(e) {
    e.preventDefault();
    if (!form.slug) return alert('Le slug est requis.');
    setStatus('loading');
    setMessage('');

    const payload = {
      action: 'publish',
      password,
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      author: form.author || 'Exchange Lab',
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(`✅ Article "${form.title}" publié ! Vercel déploie dans ~1 minute.`);
        setForm({ title: '', slug: '', excerpt: '', content: '', coverImage: '', tags: '', author: 'Exchange Lab' });
      } else {
        setStatus('error');
        setMessage(`❌ Erreur : ${data.error || 'Erreur inconnue'}`);
      }
    } catch {
      setStatus('error');
      setMessage('❌ Erreur réseau. Vérifiez votre connexion.');
    }
  }

  /* ── Login screen ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#1a5294] to-[#3189c5] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
              <img src="/LOGO-XLAB.png" alt="Exchange Lab" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-[#2c58a2]">Exchange Lab</h1>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={INPUT_CLASS}
              required
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#3189c5] hover:bg-[#276c9a] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {authLoading ? 'Vérification...' : 'Accéder'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Editor ── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            <div>
              <h1 className="font-bold text-[#2c58a2] text-lg leading-none">Nouvel article</h1>
              <p className="text-gray-400 text-xs mt-0.5">Exchange Lab Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/fr/blog"
              target="_blank"
              rel="noopener"
              className="text-[#3189c5] text-sm hover:underline"
            >
              Voir le blog →
            </a>
            <button
              onClick={() => setAuthed(false)}
              className="text-gray-400 text-sm hover:text-gray-600"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Status banner */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-700 text-sm">
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={handleTitleChange}
              className={INPUT_CLASS}
              placeholder="Votre titre d'article..."
              required
            />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
            <input
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              className={INPUT_CLASS}
              placeholder="mon-article"
            />
            <p className="text-xs text-gray-400 mt-2">
              URL finale : <span className="font-mono text-[#3189c5]">/fr/blog/{form.slug || '...'}</span>
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Résumé <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              className={`${INPUT_CLASS} h-20 resize-none`}
              placeholder="Une ou deux phrases résumant l'article..."
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contenu <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">
              HTML accepté : &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;strong&gt;, &lt;a href="..."&gt;, &lt;ul&gt;&lt;li&gt;
            </p>
            <textarea
              value={form.content}
              onChange={e => set('content', e.target.value)}
              className={`${INPUT_CLASS} h-72 resize-y font-mono text-xs`}
              placeholder={'<p>Votre contenu ici...</p>\n<h2>Sous-titre</h2>\n<p>Suite...</p>'}
              required
            />
          </div>

          {/* Cover image */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image de couverture (URL)
            </label>
            <input
              value={form.coverImage}
              onChange={e => set('coverImage', e.target.value)}
              className={INPUT_CLASS}
              placeholder="https://images.unsplash.com/..."
              type="url"
            />
            {form.coverImage && (
              <div className="mt-3 rounded-xl overflow-hidden h-40">
                <img
                  src={form.coverImage}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          {/* Tags & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags <span className="text-gray-400 font-normal">(séparés par ,)</span>
              </label>
              <input
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                className={INPUT_CLASS}
                placeholder="anglais, conseils, méthode"
              />
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Auteur</label>
              <input
                value={form.author}
                onChange={e => set('author', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Exchange Lab"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#3189c5] hover:bg-[#276c9a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl text-base"
          >
            {status === 'loading' ? '⏳ Publication en cours...' : '🚀 Publier l\'article'}
          </button>
        </form>
      </div>
    </div>
  );
}
