"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Heading1, Heading2, Code } from "lucide-react"

export function TiptapEditor({ content, onChange }: { content: any, onChange: (content: any) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '<p>Write your post here...</p>',
    onUpdate: ({ editor }) => {
      // Save as JSONB
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-none min-h-[300px]',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border border-base-300 rounded-md overflow-hidden bg-base-100">
      <div className="bg-base-200 border-b border-base-300 flex flex-wrap gap-1 p-2">
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive('bold') ? 'btn-neutral' : 'btn-ghost'}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive('italic') ? 'btn-neutral' : 'btn-ghost'}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive('heading', { level: 1 }) ? 'btn-neutral' : 'btn-ghost'}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive('heading', { level: 2 }) ? 'btn-neutral' : 'btn-ghost'}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive('codeBlock') ? 'btn-neutral' : 'btn-ghost'}`}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="w-4 h-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
