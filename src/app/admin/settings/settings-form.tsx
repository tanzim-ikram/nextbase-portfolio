"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    hero_title: "",
    hero_subtitle: "",
    logo_url: "",
    about_text: "",
    show_services: true,
    show_projects: true,
    show_experience: true,
    show_education: true,
    show_publications: true,
  });

  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("site_settings")
      .update(formData)
      .eq("id", 1);

    if (error) {
      toast.error("Failed to update settings: " + (error.message || "Unknown error"));
      console.error("Supabase Error:", JSON.stringify(error, null, 2), error);
    } else {
      toast.success("Settings updated successfully!");
      router.refresh();
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
              <label className="label"><span className="label-text">Site Logo</span></label>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      const fileExt = file.name.split('.').pop();
                      const fileName = `logo_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
                      const filePath = `uploads/${fileName}`;

                      setLoading(true);
                      try {
                        const { error: uploadError } = await supabase.storage
                          .from("portfolio_media")
                          .upload(filePath, file);

                        if (uploadError) throw uploadError;

                        const { data: publicUrlData } = supabase.storage
                          .from("portfolio_media")
                          .getPublicUrl(filePath);

                        setFormData({ ...formData, logo_url: publicUrlData.publicUrl });
                        toast.success("Logo uploaded successfully. Don't forget to save settings.");
                      } catch (error: any) {
                        toast.error(`Error uploading logo: ${error.message}`);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  />
                  <span className="text-sm font-medium">OR</span>
                  <input 
                    className="input input-bordered input-sm flex-1 w-full"
                    placeholder="Provide image link directly (e.g., https://example.com/logo.png)"
                    value={formData.logo_url || ""} 
                    onChange={e => setFormData({ ...formData, logo_url: e.target.value })} 
                  />
                </div>
                {formData.logo_url && (
                  <div className="mt-2 p-4 border border-base-300 rounded-lg bg-base-100 flex justify-center">
                    <img src={formData.logo_url} alt="Site Logo Preview" className="h-16 w-auto object-contain" />
                  </div>
                )}
              </div>
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
