"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "@/components/ui/button"
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
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none dark:prose-invert max-w-none min-h-[300px]',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md overflow-hidden bg-background">
      <div className="bg-muted/50 border-b flex flex-wrap gap-1 p-2">
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="w-4 h-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
