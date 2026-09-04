import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function EmptyPage({
  title,
  subtitle,
  message,
  icon: Icon = Sparkles,
  actionText = 'Return to Home',
  actionPath = '/',
  onAction,
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#0097E2] flex items-center justify-center mx-auto shadow-inner">
          <Icon className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-[#0097E2] tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            {subtitle || 'Page Under Development'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2920]">{title}</h1>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
          {message || 'This section is currently being updated with new features and content. Please check back soon or return to the main portal.'}
        </p>

        <div className="pt-2">
          {onAction ? (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-2xl text-xs shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{actionText}</span>
            </button>
          ) : (
            <Link
              to={actionPath}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-2xl text-xs shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{actionText}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
