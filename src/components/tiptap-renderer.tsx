"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

export function TiptapRenderer({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: { class: "rounded-lg max-w-full mx-auto" },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { class: "text-primary underline cursor-pointer", target: "_blank" },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      Highlight.configure({ multicolor: true }),
    ],
    content: content,
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-neutral dark:prose-invert max-w-none focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
