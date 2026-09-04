import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { Search, ChevronLeft, ChevronRight, AlertCircle, Tag, ArrowRight } from 'lucide-react';

export default function News() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, loading, error } = useFetch('/data.json', {
    search: debouncedSearch,
    category: selectedCategory,
    page: currentPage,
    limit: itemsPerPage,
  });

  const categories = data?.categories || [];
  const articles = data?.articles || [];
  const featuredArticle = data?.featuredArticle;
  const totalPages = data?.totalPages || 1;
  const totalArticles = data?.totalArticles || 0;

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Figma Header Banner */}
      <div className="relative h-48 sm:h-72 rounded-3xl overflow-hidden shadow-lg bg-[#0F2920] text-white flex items-center justify-center mx-4 sm:mx-8 mt-2">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
          alt="News & Articles Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2920]/90 via-[#0F2920]/70 to-black/50"></div>

        <div className="relative z-10 text-center px-4 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-normal font-serif tracking-tight text-white">
            News & Articles
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Figma Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative flex items-center bg-[#EEF0F4] border border-[#DDDDEE] rounded-xl px-4 py-2.5 shadow-xs">
            <Search className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Blog search"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full bg-transparent text-sm font-normal text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="text-xs text-gray-400 hover:text-gray-600 font-medium ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Featured Hero Article */}
        {featuredArticle && !debouncedSearch && selectedCategory === 'all' && currentPage === 1 && (
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-normal text-[#0F2920]">
              Featured News & Articles
            </h2>
            <div className="bg-white rounded-[20px] overflow-hidden border border-[#919EAB]/20 shadow-xs grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-60 sm:h-full min-h-[250px] bg-gray-100">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <Link
                    to={`/news/${featuredArticle.id}`}
                    className="text-xl sm:text-2xl font-normal text-[#0F2920] hover:text-[#0097E2] transition-colors leading-snug block"
                  >
                    {featuredArticle.title}
                  </Link>
                  <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-[#333333] font-normal">
                    {featuredArticle.date}
                  </p>
                  <Link
                    to={`/news/${featuredArticle.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-xl text-xs shadow-xs transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Section: Sidebar Category Filter + 9 Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
          {/* Sidebar Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl py-4 border border-gray-100 shadow-md space-y-2">
              <div className="px-6 pb-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">Categories</h3>
              </div>

              <nav className="space-y-0.5 max-h-[480px] overflow-y-auto">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-6 py-2.5 text-xs transition-colors flex items-center justify-between ${
                        isActive
                          ? 'border-l-4 border-[#0097E2] font-semibold text-[#333333] bg-blue-50/50'
                          : 'text-[#333333] hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Articles Grid (9 cards per page) */}
          <main className="lg:col-span-3 space-y-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, n) => (
                  <div
                    key={n}
                    className="bg-white rounded-[20px] h-80 animate-pulse p-4 border border-gray-100 space-y-4"
                  >
                    <div className="h-44 bg-gray-200 rounded-xl"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h3 className="font-semibold text-rose-900 text-sm">Error Loading Articles</h3>
                <p className="text-xs text-rose-700">{error}</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
                <Tag className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="font-semibold text-gray-800 text-base">No Articles Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  No matching news found for selected category or query.
                </p>
                <button
                  onClick={() => {
                    setSearchInput('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-[#0097E2] text-white text-xs font-semibold rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white rounded-[20px] overflow-hidden border border-[#919EAB]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <Link to={`/news/${art.id}`} className="block h-52 overflow-hidden bg-gray-100 rounded-t-[20px]">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="p-5 space-y-3">
                        <Link
                          to={`/news/${art.id}`}
                          className="font-normal text-[#0F2920] text-lg sm:text-xl leading-snug line-clamp-2 hover:text-[#0097E2] transition-colors block"
                        >
                          {art.title}
                        </Link>
                        <p className="text-sm text-[#333333] line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 flex items-center justify-between">
                      <p className="text-sm text-[#333333] font-normal">{art.date}</p>
                      <Link
                        to={`/news/${art.id}`}
                        className="text-xs font-semibold text-[#0097E2] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                <span className="text-xs text-gray-500 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#0097E2] text-white shadow-xs'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
