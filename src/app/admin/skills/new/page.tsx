"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NewSkillPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    display_order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("skills").insert([
      {
        name: formData.name,
        category: formData.category || "General",
        display_order: formData.display_order,
      }
    ]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Skill added successfully!");
      router.push("/admin/skills");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Skill</h1>
          <p className="text-base-content/60">Add a new skill and group it.</p>
        </div>
        <Link href="/admin/skills" className="btn btn-ghost">Cancel</Link>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Skill Name</span></label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Next.js, Figma, Python"
                className="input input-bordered w-full" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Category</span>
                <span className="label-text-alt text-base-content/60">Skills with same category are grouped together</span>
              </label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Development, Design, Tools"
                className="input input-bordered w-full" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Display Order</span>
                <span className="label-text-alt text-base-content/60">Lower numbers appear first</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full" 
                value={formData.display_order} 
                onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} 
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
              {loading ? "Saving..." : "Save Skill"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
