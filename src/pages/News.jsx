import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  AlertCircle,
  Tag
} from 'lucide-react';

export default function News() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Apply debounced search hook (300ms delay requirement)
  const debouncedSearch = useDebounce(searchInput, 300);

  // Fetch mock data with current filter and pagination state
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

  // Handle Category selection change
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  // Handle Search input change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search change
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Figma Hero Banner Header */}
      <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl bg-slate-900 text-white flex items-center justify-center mx-4 sm:mx-8 mt-4">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
          alt="News & Articles Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2920]/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 text-center px-4 space-y-3">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200 tracking-wider uppercase">
            Official Media Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">News & Articles</h1>
          <p className="text-xs sm:text-sm text-gray-200 max-w-lg mx-auto">
            Stay informed with verified updates on disaster relief, community health camps, and social initiatives.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Search Bar (Matching Figma Search input) */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news by keyword or title..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
          {debouncedSearch && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Showing search results for: <span className="font-semibold text-[#0097E2]">"{debouncedSearch}"</span>
            </p>
          )}
        </div>

        {/* Featured Hero Article Banner (Shown on initial page 1 view) */}
        {featuredArticle && !debouncedSearch && selectedCategory === 'all' && currentPage === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F2920]">Featured News & Articles</h2>
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 sm:h-full min-h-[260px] bg-gray-100">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0097E2] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                  Featured
                </span>
              </div>
              <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0097E2]" />
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0097E2]" />
                      {featuredArticle.time}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F2920] hover:text-[#0097E2] transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="pt-2">
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-xl text-xs shadow-md transition-all">
                    <span>Read Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid & Sidebar Layout (Figma Desktop Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          {/* Category Sidebar (Figma spec: left highlight border on active) */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3">
                <Filter className="w-4 h-4 text-[#0097E2]" />
                <h3 className="font-bold text-gray-900 text-sm">Categories</h3>
              </div>

              <nav className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-50 text-[#0097E2] border-l-4 border-[#0097E2] shadow-xs'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0097E2]"></span>}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Articles Feed & Pagination Section */}
          <main className="lg:col-span-3 space-y-8">
            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-3xl h-72 animate-pulse p-4 border border-gray-100 space-y-4"
                  >
                    <div className="h-36 bg-gray-200 rounded-2xl"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              /* Error State */
              <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h3 className="font-bold text-rose-900 text-sm">Failed to Load Content</h3>
                <p className="text-xs text-rose-700">{error}</p>
              </div>
            ) : articles.length === 0 ? (
              /* Empty Search / Filter State */
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
                <Tag className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="font-bold text-gray-800 text-base">No Articles Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  No matching news or articles found for your search/filter criteria. Try clearing search filters.
                </p>
                <button
                  onClick={() => {
                    setSearchInput('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-[#0097E2] text-white text-xs font-semibold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Articles Card Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden bg-gray-100">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#0097E2]">
                          {art.categoryName}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] text-gray-400 font-semibold">{art.date}</span>
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#0097E2] transition-colors line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <button className="text-xs font-semibold text-[#0097E2] hover:underline inline-flex items-center gap-1">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls (Matching Figma Pagination Component) */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                <span className="text-xs text-gray-500 font-medium">
                  Page {currentPage} of {totalPages} ({totalArticles} Total Articles)
                </span>

                <div className="flex items-center gap-2">
                  {/* Prev Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#0097E2] text-white shadow-sm'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
