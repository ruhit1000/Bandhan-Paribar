import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  List,
  Quote,
  Link as LinkIcon,
  RemoveFormatting
} from 'lucide-react';

export default function TipTapEditor({ content, onChange, placeholder = 'Type something....' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="space-y-3">
      {/* TipTap Toolbar matching Figma toolbar layout */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#F4F5F7] rounded-2xl border border-gray-200 shadow-xs">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('bold')
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('italic')
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('underline')
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Heading"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('bulletList')
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('blockquote')
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive('link')
              ? 'bg-[#0097E2] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-2 rounded-xl bg-white text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
          title="Clear Formatting"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>

      {/* Content Editable Area Container matching Figma screenshot */}
      <div className="p-4 bg-[#F4F5F7] border border-gray-200 rounded-2xl text-sm font-normal text-gray-900 focus-within:ring-2 focus-within:ring-[#0097E2]/30 focus-within:border-[#0097E2] transition-all min-h-[220px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
