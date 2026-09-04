import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

export default function ImageUploadModal({ isOpen, onClose, onUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setTimeout(() => {
      const fileUrl = URL.createObjectURL(selectedFile);
      onUploadComplete(fileUrl);
      setIsUploading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-6 shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-gray-900">Upload Cover Image</h3>
          <p className="text-xs text-gray-500">Upload high quality featured image for news content</p>
        </div>

        {/* Dashed Drag & Drop Zone matching Figma */}
        <div className="border-2 border-dashed border-gray-300 hover:border-[#0097E2] bg-gray-50/50 rounded-2xl p-8 text-center space-y-4 transition-colors relative">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0097E2] flex items-center justify-center mx-auto shadow-inner">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800">
              Choose a file or drag & drop it here
            </p>
            <p className="text-[11px] text-gray-400 font-medium">
              PDF, JPG, JPEG, PNG . MAX (5MB)
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-[#0097E2] border border-blue-200 hover:bg-blue-100 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-xs">
              <FileText className="w-4 h-4" />
              <span>{selectedFile ? selectedFile.name : 'Browse File'}</span>
            </label>
          </div>

          <p className="text-[10px] text-gray-400">Recommended size: 1200x628px</p>
        </div>

        {/* Action Buttons */}
        {selectedFile && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="px-5 py-2 bg-[#0097E2] text-white rounded-xl text-xs font-semibold hover:bg-[#0081C4] flex items-center gap-1.5 shadow-sm"
            >
              {isUploading ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Upload</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
