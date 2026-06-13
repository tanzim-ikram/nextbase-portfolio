"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { use } from "react";

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    display_order: 0,
  });

  useEffect(() => {
    async function fetchSkill() {
      const { data, error } = await supabase.from("skills").select("*").eq("id", resolvedParams.id).single();
      
      if (error) {
        toast.error("Error loading skill");
        router.push("/admin/skills");
      } else if (data) {
        setFormData({
          name: data.name || "",
          category: data.category || "",
          display_order: data.display_order || 0,
        });
      }
      setFetching(false);
    }
    fetchSkill();
  }, [resolvedParams.id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("skills").update({
      name: formData.name,
      category: formData.category || "General",
      display_order: formData.display_order,
    }).eq("id", resolvedParams.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Skill updated successfully!");
      router.push("/admin/skills");
      router.refresh();
    }
    setLoading(false);
  };

  if (fetching) {
    return <div className="p-8 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Skill</h1>
          <p className="text-base-content/60">Update skill details.</p>
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
              {loading ? "Updating..." : "Update Skill"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
