"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NewPublicationPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    publisher: "",
    publish_year: "",
    url: "",
    description: "",
    highlight_author: "",
    is_featured: false,
  });

  const getCookiePublications = () => {
    const match = document.cookie.match(/(^| )nextbase-publications=([^;]+)/);
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const setCookiePublications = (pubs: any[]) => {
    document.cookie = `nextbase-publications=${encodeURIComponent(JSON.stringify(pubs))}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newPub = {
      title: formData.title,
      authors: formData.authors || null,
      journal: formData.journal || null,
      publisher: formData.publisher || null,
      publish_year: formData.publish_year || null,
      url: formData.url || null,
      description: formData.description || null,
      highlight_author: formData.highlight_author || null,
      is_featured: formData.is_featured,
    };

    const { error } = await supabase.from("publications").insert([newPub]);

    if (error) {
      if (error.message.includes("Database is offline") || error.message.includes("host is unreachable")) {
        // Fallback for offline dev mode
        const localPub = {
          id: crypto.randomUUID(),
          ...newPub,
          created_at: new Date().toISOString(),
        };
        const currentPubs = getCookiePublications();
        currentPubs.push(localPub);
        setCookiePublications(currentPubs);

        toast.success("Publication added successfully (offline dev mode)!");
        router.push("/admin/publications");
        router.refresh();
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Publication added successfully!");
      router.push("/admin/publications");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Publication</h1>
          <p className="text-base-content/60">Add a new published work, paper, or article.</p>
        </div>
        <Link href="/admin/publications" className="btn btn-ghost">Cancel</Link>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Title</span></label>
              <input 
                type="text" 
                required 
                className="input input-bordered w-full" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Authors</span></label>
              <input 
                type="text" 
                placeholder="e.g. Jane Doe, John Smith"
                className="input input-bordered w-full" 
                value={formData.authors} 
                onChange={e => setFormData({...formData, authors: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Author to Highlight (Optional)</span>
                <span className="label-text-alt text-base-content/60">Matches and highlights this name in the authors list</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g. Jane Doe"
                className="input input-bordered w-full" 
                value={formData.highlight_author} 
                onChange={e => setFormData({...formData, highlight_author: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="form-control w-full col-span-1 sm:col-span-2">
                <label className="label"><span className="label-text font-medium">Journal / Conference Name</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. IEEE CVPR"
                  className="input input-bordered w-full" 
                  value={formData.journal} 
                  onChange={e => setFormData({...formData, journal: e.target.value})} 
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Publish Year</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. 2024"
                  className="input input-bordered w-full" 
                  value={formData.publish_year} 
                  onChange={e => setFormData({...formData, publish_year: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Publisher</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. IEEE, Springer"
                  className="input input-bordered w-full" 
                  value={formData.publisher} 
                  onChange={e => setFormData({...formData, publisher: e.target.value})} 
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">URL (Link to Paper / DOI)</span></label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  className="input input-bordered w-full" 
                  value={formData.url} 
                  onChange={e => setFormData({...formData, url: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Description / Abstract</span></label>
              <textarea 
                className="textarea textarea-bordered w-full h-24" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary" 
                  checked={formData.is_featured} 
                  onChange={e => setFormData({...formData, is_featured: e.target.checked})} 
                />
                <span className="label-text font-medium">Feature on Home Page</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Publication"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
