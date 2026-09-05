import React, { useState, useEffect } from 'react';
import ImageUploadModal from '../../components/admin/ImageUploadModal';
import TipTapEditor from '../../components/admin/TipTapEditor';
import { createArticle, updateArticle } from '../../services/articleService';
import {
  ChevronRight,
  Image as ImageIcon,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function CreateContent({ onCancel, onCreateSuccess, editArticle = null }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(editArticle && editArticle.id);

  useEffect(() => {
    if (editArticle) {
      setTitle(editArticle.title || '');
      setBody(editArticle.content || editArticle.excerpt || '');
      setTags(editArticle.tags || '');
      setCoverImage(
        editArticle.image ||
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop'
      );
    }
  }, [editArticle]);

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 64) {
      setTitle(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a content title.');
      return;
    }

    setIsSubmitting(true);

    try {
      let result;
      if (isEditMode) {
        result = await updateArticle(editArticle.id, {
          title,
          content: body,
          tags,
          image: coverImage
        });
        setSuccessMsg('Content updated successfully!');
      } else {
        result = await createArticle({
          title,
          content: body,
          tags,
          image: coverImage
        });
        setSuccessMsg('Content created successfully!');
      }

      setTimeout(() => {
        if (onCreateSuccess) onCreateSuccess(result);
      }, 700);
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Failed to save article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Breadcrumb Header matching Figma */}
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span>Content Management</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold">
          {isEditMode ? 'Edit Content' : 'Create New Content'}
        </span>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-[#0F2920]">
          {isEditMode ? 'Edit Blog & News Content' : 'Create New Blog & News'}
        </h1>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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

        {/* Content Body Editor powered by TipTap */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Content Body</label>
          <TipTapEditor
            content={body}
            onChange={(html) => setBody(html)}
            placeholder="Type something...."
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
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-xl text-xs shadow-md disabled:opacity-50 transition-all"
          >
            {isSubmitting
              ? 'Saving...'
              : isEditMode
              ? 'Update Content'
              : 'Create Content'}
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
