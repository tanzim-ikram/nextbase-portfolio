"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image_url: "",
    live_url: "",
    github_url: "",
    is_featured: false,
    tags: "",
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
      if (error) {
        toast.error("Error fetching project");
        router.push("/admin/projects");
      } else if (data) {
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          image_url: data.image_url || "",
          live_url: data.live_url || "",
          github_url: data.github_url || "",
          is_featured: data.is_featured || false,
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
        });
      }
      setFetching(false);
    };
    fetchProject();
  }, [id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    const finalSlug = formData.slug || generateSlug(formData.title);

    const { error } = await supabase.from("projects").update({
      title: formData.title,
      slug: finalSlug,
      description: formData.description,
      image_url: formData.image_url,
      live_url: formData.live_url,
      github_url: formData.github_url,
      is_featured: formData.is_featured,
      tags: tagsArray,
    }).eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Project updated successfully!");
      router.push("/admin/projects");
      router.refresh();
    }
    setLoading(false);
  };

  if (fetching) return <div className="p-8 flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-base-content/60">Update your portfolio project.</p>
        </div>
        <Link href="/admin/projects" className="btn btn-ghost">Cancel</Link>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Title</span></label>
                <input 
                  type="text" 
                  required 
                  className="input input-bordered w-full" 
                  value={formData.title} 
                  onChange={e => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setFormData({...formData, title, slug});
                  }} 
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Slug (URL)</span></label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="Auto-generated if empty"
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Description</span></label>
              <textarea 
                required
                className="textarea textarea-bordered w-full h-24" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Image URL</span></label>
              <input 
                type="text" 
                className="input input-bordered w-full" 
                placeholder="e.g., https://example.com/image.png (or from Media Gallery)"
                value={formData.image_url} 
                onChange={e => setFormData({...formData, image_url: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Live URL</span></label>
                <input 
                  type="url" 
                  className="input input-bordered w-full" 
                  placeholder="https://..."
                  value={formData.live_url} 
                  onChange={e => setFormData({...formData, live_url: e.target.value})} 
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">GitHub URL</span></label>
                <input 
                  type="url" 
                  className="input input-bordered w-full" 
                  placeholder="https://github.com/..."
                  value={formData.github_url} 
                  onChange={e => setFormData({...formData, github_url: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Tags (comma separated)</span></label>
              <input 
                type="text" 
                className="input input-bordered w-full" 
                placeholder="React, TypeScript, Tailwind"
                value={formData.tags} 
                onChange={e => setFormData({...formData, tags: e.target.value})} 
              />
            </div>

            <div className="form-control w-full mt-4">
              <label className="label cursor-pointer justify-start gap-4 border p-4 rounded-lg bg-base-100">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary" 
                  checked={formData.is_featured} 
                  onChange={e => setFormData({...formData, is_featured: e.target.checked})} 
                />
                <div>
                  <span className="label-text font-medium block">Featured Project</span>
                  <span className="label-text-alt text-base-content/60">Show this project on the homepage.</span>
                </div>
              </label>
            </div>

            <div className="pt-4">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Saving..." : "Update Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
