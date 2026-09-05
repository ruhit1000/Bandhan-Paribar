import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateContent from './CreateContent';
import { getArticles, deleteArticle } from '../../services/articleService';
import {
  ChevronRight,
  Search,
  Plus,
  ExternalLink,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronLeft,
  Newspaper
} from 'lucide-react';

export default function BlogNewsManagement() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'form'
  const [editingArticle, setEditingArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const itemsPerPage = 6;

  const loadArticlesData = async () => {
    try {
      const items = await getArticles();
      setArticles(items);
    } catch (err) {
      console.error('Error loading articles:', err);
    }
  };

  useEffect(() => {
    loadArticlesData();
  }, []);

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setViewMode('form');
  };

  const handleOpenEdit = (article) => {
    setActiveDropdownId(null);
    setEditingArticle(article);
    setViewMode('form');
  };

  const handleSaveSuccess = async () => {
    await loadArticlesData();
    setViewMode('list');
    setEditingArticle(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content item?')) {
      try {
        const updated = await deleteArticle(id);
        setArticles(updated);
        setActiveDropdownId(null);
      } catch (err) {
        console.error('Error deleting article:', err);
      }
    }
  };

  // Filtered articles
  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.categoryName && a.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination math
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedArticles = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (viewMode === 'form') {
    return (
      <CreateContent
        editArticle={editingArticle}
        onCancel={() => {
          setViewMode('list');
          setEditingArticle(null);
        }}
        onCreateSuccess={handleSaveSuccess}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span>Content Management</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold">Blog & News Management</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2920]">Blog & News Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage, edit, publish and track news articles across Bandhan Paribar platform.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0097E2] hover:bg-[#0081C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Content</span>
        </button>
      </div>

      {/* Control Bar: Search Input */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Content by title or category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-[#F4F5F7] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
          />
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Total Items: <strong className="text-gray-900">{filtered.length}</strong>
        </span>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Content Title</th>
                <th className="py-4 px-6">Published Date</th>
                <th className="py-4 px-6">Source Link</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Content Title with Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5 max-w-md">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-bold text-gray-900 truncate hover:text-[#0097E2] transition-colors">
                            {article.title}
                          </p>
                          <span className="text-[10px] text-gray-400 font-medium capitalize">
                            {article.categoryName || article.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Published Date */}
                    <td className="py-4 px-6 text-gray-600 font-medium whitespace-nowrap">
                      {article.date}
                    </td>

                    {/* Source Link */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <Link
                        to={`/news/${article.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-[#0097E2] hover:text-[#0081C4] font-semibold text-xs transition-colors"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>

                    {/* Action Dropdown */}
                    <td className="py-4 px-6 text-right relative">
                      <button
                        onClick={() =>
                          setActiveDropdownId(activeDropdownId === article.id ? null : article.id)
                        }
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdownId === article.id && (
                        <div className="absolute right-6 top-12 z-20 w-36 bg-white border border-gray-200 rounded-2xl shadow-xl p-1.5 text-left animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => handleOpenEdit(article)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0097E2] rounded-xl transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[#0097E2]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Newspaper className="w-8 h-8 text-gray-300" />
                      <p className="font-semibold text-sm">No contents found</p>
                      <p className="text-xs text-gray-400">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500 font-medium">
              Showing Page <strong className="text-gray-900">{currentPage}</strong> of{' '}
              <strong className="text-gray-900">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 border border-gray-200 rounded-xl hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#0097E2] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 border border-gray-200 rounded-xl hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
