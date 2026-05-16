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
    publisher: "",
    date: "",
    url: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("publications").insert([
      {
        title: formData.title,
        publisher: formData.publisher,
        date: formData.date || null,
        url: formData.url,
        description: formData.description,
      }
    ]);

    if (error) {
      toast.error(error.message);
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Publisher / Venue</span></label>
                <input 
                  type="text" 
                  required 
                  className="input input-bordered w-full" 
                  value={formData.publisher} 
                  onChange={e => setFormData({...formData, publisher: e.target.value})} 
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Date</span></label>
                <input 
                  type="date" 
                  className="input input-bordered w-full" 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">URL (Link to publication)</span></label>
              <input 
                type="url" 
                className="input input-bordered w-full" 
                placeholder="https://..."
                value={formData.url} 
                onChange={e => setFormData({...formData, url: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Description (Optional)</span></label>
              <textarea 
                className="textarea textarea-bordered w-full h-24" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
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
