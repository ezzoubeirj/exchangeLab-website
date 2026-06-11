'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

function formatDate(dateStr, locale) {
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === 'ar' ? 'ar-MA' : 'fr-FR',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  } catch {
    return dateStr;
  }
}

export default function PostPageClient({ post, locale }) {
  const isRTL = locale === 'ar';

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">

      {/* ── Cover Hero ── */}
      {post.coverImage ? (
        <div className="relative h-72 md:h-[420px] w-full overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Title overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl mx-auto pb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map(tag => (
                  <span
                    key={tag}
                    className="bg-[#3189c5] text-white text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </motion.div>
        </div>
      ) : (
        /* No cover — plain header */
        <div className="bg-gradient-to-br from-[#003366] to-[#3189c5] py-16 px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map(tag => (
                <span key={tag} className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      )}

      {/* ── Article body ── */}
      <motion.div
        className="max-w-3xl mx-auto px-4 md:px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Meta row */}
        <div className="flex items-center gap-3 text-gray-400 text-sm mb-10 pb-8 border-b border-gray-100">
          {(post.author || 'Exchange Lab') === 'Exchange Lab' ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-100 flex-shrink-0">
              <img src="/LOGO-XLAB.png" alt="Exchange Lab" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-[#3189c5] rounded-full text-white text-xs font-bold flex-shrink-0">
              {(post.author || 'EL')[0]}
            </div>
          )}
          <span className="font-medium text-gray-600">{post.author || 'Exchange Lab'}</span>
          <span>·</span>
          <span>{formatDate(post.date, locale)}</span>
        </div>

        {/* Content */}
        <div
          className="text-gray-700 text-base leading-8
            [&_h2]:text-[#2c58a2] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-[#2c58a2] [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-6
            [&_a]:text-[#3189c5] [&_a]:font-semibold [&_a]:underline-offset-2 hover:[&_a]:underline
            [&_strong]:text-gray-800 [&_strong]:font-semibold
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
            [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#3189c5] [&_blockquote]:pl-4 [&_blockquote]:text-gray-500 [&_blockquote]:italic [&_blockquote]:my-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to blog */}
        <div className="mt-14 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-[#3189c5] font-semibold hover:text-[#276c9a] transition-colors"
          >
            <span>{isRTL ? '→' : '←'}</span>
            <span>{isRTL ? 'العودة إلى المدونة' : 'Retour au blog'}</span>
          </Link>
          <Link
            href={`/${locale}/registration`}
            className="inline-block bg-[#cd1822] hover:bg-[#a8141b] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            {isRTL ? 'ابدأ مجاناً' : 'Commencer gratuitement'}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
