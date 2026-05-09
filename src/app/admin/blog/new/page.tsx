"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TiptapEditor } from "../editor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    status: "draft",
    tags: "",
    content: null as any,
  });

  const handleSave = async () => {
    setLoading(true);
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
    
    const { error } = await supabase.from("posts").insert({
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      excerpt: formData.excerpt,
      status: formData.status,
      tags: tagsArray,
      content: formData.content,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Post saved!");
      router.push("/admin/blog");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        <div className="flex items-center gap-6">
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text">Published</span>
              <input 
                type="checkbox" 
                className="toggle toggle-primary"
                checked={formData.status === "published"}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? "published" : "draft" })}
              />
            </label>
          </div>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>Save Post</button>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="form-control w-full">
              <label className="label"><span className="label-text">Title</span></label>
              <input 
                className="input input-bordered w-full"
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })} 
                placeholder="Post Title"
              />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">Slug</span></label>
              <input 
                className="input input-bordered w-full"
                value={formData.slug} 
                onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                placeholder="post-url-slug"
              />
            </div>
          </div>
          
          <div className="form-control w-full">
            <label className="label"><span className="label-text">Excerpt</span></label>
            <textarea 
              className="textarea textarea-bordered w-full"
              value={formData.excerpt} 
              onChange={e => setFormData({ ...formData, excerpt: e.target.value })} 
              placeholder="Short description for the blog list..."
            />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">Tags (comma separated)</span></label>
            <input 
              className="input input-bordered w-full"
              value={formData.tags} 
              onChange={e => setFormData({ ...formData, tags: e.target.value })} 
              placeholder="react, nextjs, typescript"
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label"><span className="label-text font-semibold">Content</span></label>
            <TiptapEditor 
              content={formData.content} 
              onChange={(c: any) => setFormData({ ...formData, content: c })} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
