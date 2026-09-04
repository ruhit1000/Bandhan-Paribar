import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Newspaper,
  HeartHandshake,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ChevronRight,
  ExternalLink,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AdminOverview({ onNavigateTab }) {
  const [stats, setStats] = useState({
    totalArticles: 18,
    familiesSupported: '50,000+',
    projectsCompleted: '120+',
    volunteers: '3,500+'
  });
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const items = data.articles || data.newsArticles || [];
        setRecentArticles(items.slice(0, 5));
        if (items.length > 0) {
          setStats((prev) => ({ ...prev, totalArticles: items.length }));
        }
      })
      .catch((err) => console.error('Error loading dashboard overview data:', err));
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold">Admin Overview</span>
      </div>

      {/* Hero Welcome Banner */}
      <div className="bg-linear-to-r from-[#0F2920] to-[#0097E2] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome to Bandhan Paribar Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Managing Hope & Social Welfare Nationwide
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Track published news stories, monitor disaster relief distribution programs, and manage community development content seamlessly.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('blog-news')}
              className="px-5 py-2.5 bg-white text-[#0F2920] hover:bg-blue-50 font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#0097E2]" />
              <span>Create & Manage News</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Published News</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0097E2] flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#0F2920]">{stats.totalArticles}</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% this month</span>
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Families Supported</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#0F2920]">{stats.familiesSupported}</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>Active relief programs</span>
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Projects Completed</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#0F2920]">{stats.projectsCompleted}</p>
            <p className="text-[11px] text-gray-400 font-medium mt-1">Nationwide reach</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Volunteers Enrolled</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#0F2920]">{stats.volunteers}</p>
            <p className="text-[11px] text-gray-400 font-medium mt-1">64 Districts covered</p>
          </div>
        </div>
      </div>

      {/* Recent Published Content Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#0F2920]">Recent Published News & Articles</h2>
            <p className="text-xs text-gray-500">Latest media updates and news announcements</p>
          </div>
          <button
            onClick={() => onNavigateTab('blog-news')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0097E2] hover:text-[#0081C4] transition-colors"
          >
            <span>View All Management</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {recentArticles.map((art) => (
            <div
              key={art.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/60 p-2 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="space-y-0.5 max-w-lg">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                    {art.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="font-semibold text-[#0097E2] uppercase tracking-wider">
                      {art.categoryName || art.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {art.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/news/${art.id}`}
                  target="_blank"
                  className="px-3.5 py-1.5 bg-blue-50 text-[#0097E2] hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
