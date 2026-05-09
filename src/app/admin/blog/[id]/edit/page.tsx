"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { TiptapEditor } from "../../editor";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    cover_image: "",
    status: "draft",
    tags: "",
    content: null as any,
  });

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error || !data) {
        toast.error("Post not found");
        router.push("/admin/blog");
        return;
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        cover_image: data.cover_image || "",
        status: data.status || "draft",
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
        content: data.content,
      });
      setFetching(false);
    }

    fetchPost();
  }, [postId]);

  const handleSave = async () => {
    setLoading(true);
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);

    const { error } = await supabase
      .from("posts")
      .update({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        excerpt: formData.excerpt,
        cover_image: formData.cover_image || null,
        status: formData.status,
        tags: tagsArray,
        content: formData.content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Post updated!");
      router.push("/admin/blog");
      router.refresh();
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
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
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Update Post"}
          </button>
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
            <label className="label"><span className="label-text">Cover Image URL</span></label>
            <input
              className="input input-bordered w-full"
              value={formData.cover_image}
              onChange={e => setFormData({ ...formData, cover_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            {formData.cover_image && (
              <img src={formData.cover_image} alt="Cover preview" className="mt-2 w-full max-h-48 object-cover rounded-lg" />
            )}
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
            {!fetching && (
              <TiptapEditor
                content={formData.content}
                onChange={(c: any) => setFormData({ ...formData, content: c })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
