"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NewExperiencePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("experience").insert([
      {
        company: formData.company,
        position: formData.position,
        start_date: formData.start_date || null,
        end_date: formData.is_current ? null : (formData.end_date || null),
        is_current: formData.is_current,
        description: formData.description,
      }
    ]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Experience added successfully!");
      router.push("/admin/experience");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Experience</h1>
          <p className="text-base-content/60">Add a new work experience entry.</p>
        </div>
        <Link href="/admin/experience" className="btn btn-ghost">Cancel</Link>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Company</span></label>
              <input 
                type="text" 
                required 
                className="input input-bordered w-full" 
                value={formData.company} 
                onChange={e => setFormData({...formData, company: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Position</span></label>
              <input 
                type="text" 
                required 
                className="input input-bordered w-full" 
                value={formData.position} 
                onChange={e => setFormData({...formData, position: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Start Date</span></label>
                <input 
                  type="date" 
                  className="input input-bordered w-full" 
                  value={formData.start_date} 
                  onChange={e => setFormData({...formData, start_date: e.target.value})} 
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">End Date</span></label>
                <input 
                  type="date" 
                  className="input input-bordered w-full" 
                  value={formData.end_date} 
                  onChange={e => setFormData({...formData, end_date: e.target.value})} 
                  disabled={formData.is_current}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary" 
                  checked={formData.is_current} 
                  onChange={e => setFormData({...formData, is_current: e.target.checked})} 
                />
                <span className="label-text font-medium">I currently work here</span>
              </label>
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
              {loading ? "Saving..." : "Save Experience"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
