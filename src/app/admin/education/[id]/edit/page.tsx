"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function EditEducationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: "",
  });

  useEffect(() => {
    const fetchEdu = async () => {
      const { data, error } = await supabase.from("education").select("*").eq("id", id).single();
      if (error) {
        toast.error("Error fetching education");
        router.push("/admin/education");
      } else if (data) {
        setFormData({
          institution: data.institution || "",
          degree: data.degree || "",
          start_date: data.start_date || "",
          end_date: data.end_date || "",
          is_current: data.is_current || false,
          description: data.description || "",
        });
      }
      setFetching(false);
    };
    fetchEdu();
  }, [id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("education").update({
      institution: formData.institution,
      degree: formData.degree,
      start_date: formData.start_date || null,
      end_date: formData.is_current ? null : (formData.end_date || null),
      is_current: formData.is_current,
      description: formData.description,
    }).eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Education updated successfully!");
      router.push("/admin/education");
      router.refresh();
    }
    setLoading(false);
  };

  if (fetching) return <div className="p-8 flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Education</h1>
          <p className="text-base-content/60">Update your educational qualification.</p>
        </div>
        <Link href="/admin/education" className="btn btn-ghost">Cancel</Link>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Institution</span></label>
              <input 
                type="text" 
                required 
                className="input input-bordered w-full" 
                value={formData.institution} 
                onChange={e => setFormData({...formData, institution: e.target.value})} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Degree</span></label>
              <input 
                type="text" 
                required 
                className="input input-bordered w-full" 
                value={formData.degree} 
                onChange={e => setFormData({...formData, degree: e.target.value})} 
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
                <span className="label-text font-medium">I currently study here</span>
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
              {loading ? "Saving..." : "Update Education"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
