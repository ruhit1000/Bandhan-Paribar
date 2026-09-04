import React, { useState } from 'react';
import ImageUploadModal from '../../components/admin/ImageUploadModal';
import {
  ChevronRight,
  Bold,
  Italic,
  Underline,
  Type,
  ListChecks,
  AlignLeft,
  Unlink,
  Image as ImageIcon,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function CreateContent({ onCancel, onCreateSuccess }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 64) {
      setTitle(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a content title.');
      return;
    }

    const newArticle = {
      id: Date.now(),
      title: title.trim(),
      excerpt: body.slice(0, 150) || 'New article update published via admin dashboard.',
      content: body,
      category: 'community',
      categoryName: 'Community Development',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      image: coverImage,
    };

    setSuccessMsg('Content created successfully!');
    setTimeout(() => {
      if (onCreateSuccess) onCreateSuccess(newArticle);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Breadcrumb Header matching Figma */}
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span>Content Management</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold">Create New Content</span>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-[#0F2920]">Create New Blog & News</h1>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Card Container matching Figma */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        {/* Content Title Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-900">Content Title</label>
            <span className="text-xs text-gray-400 font-medium">{title.length} / 64</span>
          </div>
          <input
            type="text"
            placeholder="Plan name"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-3 bg-[#F4F5F7] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
          />
        </div>

        {/* Formatting Toolbar Toolbar matching Figma */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#F4F5F7] rounded-xl border border-gray-200">
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 font-bold hover:bg-gray-100">
            <Bold className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 italic hover:bg-gray-100">
            <Italic className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 underline hover:bg-gray-100">
            <Underline className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 hover:bg-gray-100">
            <Type className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 hover:bg-gray-100">
            <ListChecks className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 hover:bg-gray-100">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-white shadow-xs text-gray-700 hover:bg-gray-100">
            <Unlink className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Content Body</label>
          <textarea
            rows={8}
            placeholder="Type something...."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 bg-[#F4F5F7] border border-gray-200 rounded-xl text-sm font-normal text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
          />
        </div>

        {/* Tag Selector Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Tag (max 3)</label>
          <input
            type="text"
            placeholder="e.g. Relief, Medical, Education"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 bg-[#F4F5F7] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
          />
        </div>

        {/* Cover Image Upload Container matching Figma */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Cover Image</label>
          <div className="relative w-full max-w-sm h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 group">
            <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-white text-[#0097E2] rounded-xl text-xs font-semibold shadow-md flex items-center gap-1"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Change</span>
              </button>
              <button
                type="button"
                onClick={() => setCoverImage('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop')}
                className="p-2 bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Figma */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-[#0097E2] text-[#0097E2] hover:bg-blue-50 font-semibold rounded-xl text-xs transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-xl text-xs shadow-md transition-all"
          >
            Create Content
          </button>
        </div>
      </form>

      {/* Image Upload Modal Dialog */}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={(url) => setCoverImage(url)}
      />
    </div>
  );
}
