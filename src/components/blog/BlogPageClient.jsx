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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' },
  }),
};

export default function BlogPageClient({ posts, locale }) {
  const isRTL = locale === 'ar';

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F5F5F5]">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#003366] via-[#1a5294] to-[#3189c5] py-24 px-4 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5" />

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            {isRTL ? 'مدونة Exchange Lab' : 'Le Blog Exchange Lab'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {isRTL ? 'تعلّم اللغات بذكاء' : 'Apprenez les langues\navec intelligence'}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? 'نصائح، موارد، وأخبار لمساعدتك على التقدم بسرعة'
              : 'Conseils pratiques, ressources et actualités pour progresser plus vite.'}
          </p>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 text-lg py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isRTL ? 'لا توجد مقالات بعد.' : 'Aucun article pour le moment.'}
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Cover */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#3189c5] to-[#003366]" />
                  )}
                  {/* tag badge */}
                  {post.tags?.[0] && (
                    <span className="absolute top-3 left-3 bg-[#3189c5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[#777777] text-xs mb-3 font-medium">
                    {formatDate(post.date, locale)}
                  </p>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="text-[#2c58a2] font-bold text-lg mb-3 leading-snug flex-1 block hover:text-[#3189c5] transition-colors"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#3189c5] font-semibold text-sm hover:text-[#276c9a] transition-colors group/link"
                  >
                    <span>{isRTL ? 'اقرأ المزيد' : 'Lire la suite'}</span>
                    <span className="transition-transform group-hover/link:translate-x-1">
                      {isRTL ? '←' : '→'}
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2c58a2] mb-4">
            {isRTL ? 'جاهز للبدء؟' : 'Prêt à vous lancer ?'}
          </h2>
          <p className="text-gray-500 mb-8">
            {isRTL
              ? 'انضم إلى أكثر من 1300 طالب في 12 دولة'
              : 'Rejoignez plus de 1 300 élèves dans 12 pays.'}
          </p>
          <Link
            href={`/${locale}/registration`}
            className="inline-block bg-[#cd1822] hover:bg-[#a8141b] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            {isRTL ? 'ابدأ تجربتك المجانية' : 'Commencer gratuitement'}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
