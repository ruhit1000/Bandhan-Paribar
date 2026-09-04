import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Heart, AlertCircle, ArrowRight } from 'lucide-react';

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('/data.json');

  const allArticles = data?.raw?.articles || [];
  const article = allArticles.find((a) => String(a.id) === String(id) || a.slug === id);

  const relatedArticles = allArticles
    .filter((a) => String(a.id) !== String(article?.id))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-xl w-32"></div>
        <div className="h-12 bg-gray-200 rounded-2xl w-3/4"></div>
        <div className="h-80 bg-gray-200 rounded-3xl w-full"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-[#90%]"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 max-w-md shadow-xl space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-bold text-[#0F2920]">Article Not Found</h2>
          <p className="text-xs text-gray-500">
            The news story or article you are looking for might have been moved or removed.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0097E2] text-white rounded-xl text-xs font-semibold shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to News & Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#0097E2] bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-xs transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </button>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-blue-50 text-[#0097E2] border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
            {article.categoryName}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#0097E2]" />
            {article.date}
          </span>
          {article.time && (
            <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#0097E2]" />
              {article.time}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-[#0F2920] leading-tight">
          {article.title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative h-72 sm:h-[420px] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content Body */}
      <article className="prose prose-slate max-w-none space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
        <p className="text-base sm:text-lg font-medium text-gray-900 border-l-4 border-[#0097E2] pl-4 py-1 italic bg-blue-50/50 rounded-r-xl">
          "{article.excerpt}"
        </p>

        <p>
          {article.content ||
            `${article.excerpt} Bandhan Paribar (As-Sunnah Foundation) emergency response teams and volunteers were deployed to coordinate ground-level support, health assessments, and distribution of essential relief materials.`}
        </p>

        <p>
          Community members and local volunteers worked hand-in-hand to ensure that emergency relief reached the most vulnerable families, day laborers, widows, and elderly citizens without delay.
        </p>

        <div className="p-6 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2">
          <h4 className="font-bold text-[#0F2920] text-sm sm:text-base">
            How You Can Support Future Relief Operations
          </h4>
          <p className="text-xs sm:text-sm text-gray-600">
            Your generous contributions enable us to maintain rapid-response relief funds for disaster-hit areas and rural welfare initiatives across the country.
          </p>
          <div className="pt-2">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0097E2] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#0081C4] transition-all"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Donate to Relief Fund</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Share / Back Footer Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            alert('Article link copied to clipboard!');
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#0097E2] bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Article</span>
        </button>

        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0097E2] hover:underline"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-[#0F2920]">Related Stories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/news/${rel.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="h-36 overflow-hidden bg-gray-100">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] text-gray-400 font-semibold">{rel.date}</span>
                  <h4 className="font-semibold text-gray-900 text-xs line-clamp-2 group-hover:text-[#0097E2] transition-colors">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
