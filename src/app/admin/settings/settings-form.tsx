"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    hero_title: "",
    hero_subtitle: "",
    about_text: "",
    show_services: true,
    show_projects: true,
    show_experience: true,
    show_education: true,
    show_publications: true,
  });

  const supabase = createClient();

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("site_settings")
      .update(formData)
      .eq("id", 1);

    if (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } else {
      toast.success("Settings updated successfully!");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="card bg-base-200 shadow-sm border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Hero Section</h2>
          <p className="text-base-content/60 text-sm mb-4">Update the main text on your homepage.</p>
          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text">Hero Title</span></label>
              <input 
                className="input input-bordered w-full"
                value={formData.hero_title || ""} 
                onChange={e => setFormData({ ...formData, hero_title: e.target.value })} 
              />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">Hero Subtitle</span></label>
              <input 
                className="input input-bordered w-full"
                value={formData.hero_subtitle || ""} 
                onChange={e => setFormData({ ...formData, hero_subtitle: e.target.value })} 
              />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">About Text</span></label>
              <textarea 
                className="textarea textarea-bordered w-full h-32"
                value={formData.about_text || ""} 
                onChange={e => setFormData({ ...formData, about_text: e.target.value })} 
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-sm border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Section Visibility</h2>
          <p className="text-base-content/60 text-sm mb-4">Toggle which sections are visible on your public portfolio.</p>
          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary"
                  id="show-services"
                  checked={formData.show_services} 
                  onChange={e => setFormData({ ...formData, show_services: e.target.checked })} 
                />
                <span className="label-text font-medium">Show Services Section</span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary"
                  id="show-projects"
                  checked={formData.show_projects} 
                  onChange={e => setFormData({ ...formData, show_projects: e.target.checked })} 
                />
                <span className="label-text font-medium">Show Projects Section</span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary"
                  id="show-publications"
                  checked={formData.show_publications} 
                  onChange={e => setFormData({ ...formData, show_publications: e.target.checked })} 
                />
                <span className="label-text font-medium">Show Publications Section</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
