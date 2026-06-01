"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { revalidateSettings } from "./actions";

export function SettingsForm({ initialData, initialSocialLinks = [] }: { initialData: any, initialSocialLinks?: any[] }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero_title: initialData?.hero_title || "",
    hero_subtitle: initialData?.hero_subtitle || "",
    logo_url: initialData?.logo_url || "",
    about_text: initialData?.about_text || "",
    name: initialData?.name || "",
    bio: initialData?.bio || "",
    email: initialData?.email || "",
    show_services: initialData?.show_services ?? true,
    show_projects: initialData?.show_projects ?? true,
    show_experience: initialData?.show_experience ?? true,
    show_education: initialData?.show_education ?? true,
    show_publications: initialData?.show_publications ?? true,
  });

  const [socialLinks, setSocialLinks] = useState<any[]>(initialSocialLinks);
  const [newPlatform, setNewPlatform] = useState("GitHub");
  const [newUrl, setNewUrl] = useState("");
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const moveLink = (from: number, to: number) => {
    if (to < 0 || to >= socialLinks.length) return;
    const updated = [...socialLinks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setSocialLinks(updated);
    setCookieSocialLinks(updated);
  };

  const router = useRouter();
  const supabase = createClient();

  const setCookieSocialLinks = (links: any[]) => {
    document.cookie = `nextbase-social-links=${encodeURIComponent(JSON.stringify(links))}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const handleSave = async () => {
    setLoading(true);

    // Write social links to cookie FIRST — guarantees homepage can always show them
    // even if DB writes fail for any reason
    setCookieSocialLinks(socialLinks);
    
    // Save site_settings
    const sanitizedData = {
      hero_title: formData.hero_title,
      hero_subtitle: formData.hero_subtitle,
      logo_url: formData.logo_url || null,
      about_text: formData.about_text || null,
      name: formData.name,
      bio: formData.bio || null,
      email: formData.email || null,
      show_services: formData.show_services,
      show_projects: formData.show_projects,
      show_experience: formData.show_experience,
      show_education: formData.show_education,
      show_publications: formData.show_publications,
    };
    
    const { error: settingsError } = await supabase
      .from("site_settings")
      .update(sanitizedData)
      .eq("id", 1);

    if (settingsError) {
      console.error("[Settings] site_settings error:", settingsError);
      toast.error("Failed to update settings: " + (settingsError.message || "Unknown error"));
      setLoading(false);
      return;
    }

    // Save social_links to DB
    // 1. Delete all existing rows
    const { error: deleteError } = await supabase
      .from("social_links")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("[Settings] Delete error:", deleteError);
      // Don't block — cookie already saved, just warn
      toast.warning?.(`Social links saved locally. DB sync failed: ${deleteError.message}`);
      await revalidateSettings();
      setLoading(false);
      return;
    }

    // 2. Insert new rows
    if (socialLinks.length > 0) {
      const rows = socialLinks.map((link, index) => ({
        platform: link.platform,
        url: link.url,
        display_order: index,
        icon_name: link.platform,
      }));

      console.log("[Settings] Inserting:", rows);

      const { data: inserted, error: insertError } = await supabase
        .from("social_links")
        .insert(rows)
        .select();

      if (insertError) {
        console.error("[Settings] Insert error:", insertError);
        toast.warning?.(`Social links saved locally. DB sync failed: ${insertError.message}`);
      } else {
        console.log("[Settings] DB rows inserted:", inserted);
      }
    }

    await revalidateSettings();
    toast.success("Settings saved successfully!");
    await new Promise(r => setTimeout(r, 300));
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-base-content/60 mt-1">Manage your portfolio's content and visibility.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Column 1: Hero Section and Contact & Social Links */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* Hero Section Card */}
          <div className="card bg-base-200 shadow-sm border border-base-300 w-full">
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
                      <div className="relative mt-2 p-4 border border-base-300 rounded-lg bg-base-100 flex flex-col items-center gap-3">
                        <img src={formData.logo_url} alt="Site Logo Preview" className="h-16 w-auto object-contain" />
                        <button
                          type="button"
                          className="absolute top-2 right-2 btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
                          title="Remove Logo"
                          onClick={() => setFormData({ ...formData, logo_url: "" })}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
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

          {/* Contact & Social Links Card */}
          <div className="card bg-base-200 shadow-sm border border-base-300 w-full">
            <div className="card-body">
              <h2 className="card-title font-bold text-xl">Contact & Social Links</h2>
              <p className="text-base-content/60 text-sm mb-4">Manage your contact email and social media profile URLs.</p>
              <div className="space-y-4">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Contact Email</span></label>
                  <input 
                    type="email"
                    placeholder="e.g. hello@example.com"
                    className="input input-bordered w-full"
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>

                <div className="border-t border-base-300 my-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Social Links</h3>
                    {!isAddingNewLink && (
                      <button
                        type="button"
                        className="btn btn-outline btn-primary btn-xs gap-1"
                        onClick={() => setIsAddingNewLink(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Link
                      </button>
                    )}
                  </div>
                  
                  {/* Existing links list */}
                  {socialLinks.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {socialLinks.map((link, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={() => setDragIndex(index)}
                          onDragOver={e => { e.preventDefault(); setDragOverIndex(index); }}
                          onDragEnd={() => {
                            if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
                              moveLink(dragIndex, dragOverIndex);
                            }
                            setDragIndex(null);
                            setDragOverIndex(null);
                          }}
                          className={[
                            "flex items-center justify-between bg-base-100 p-3 rounded-lg border transition-all duration-150",
                            dragOverIndex === index && dragIndex !== index
                              ? "border-primary bg-primary/5 scale-[1.01] shadow-md"
                              : "border-base-300 hover:border-primary/30",
                            dragIndex === index ? "opacity-40" : "opacity-100",
                          ].join(" ")}
                        >
                          {/* Drag handle */}
                          <div
                            className="cursor-grab active:cursor-grabbing text-base-content/30 hover:text-base-content/60 pr-2 flex-shrink-0 touch-none"
                            title="Drag to reorder"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                            </svg>
                          </div>

                          {/* Platform + URL */}
                          <div className="flex items-center gap-3 truncate mr-2 flex-1">
                            <span className="badge badge-primary font-medium text-xs py-2 flex-shrink-0">{link.platform}</span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-base-content/80 hover:text-primary hover:underline truncate max-w-[140px] sm:max-w-sm"
                              title={link.url}
                              onClick={e => e.stopPropagation()}
                            >
                              {link.url}
                            </a>
                          </div>

                          {/* Up / Down / Remove */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {index > 0 && (
                              <button
                                type="button"
                                title="Move up"
                                className="btn btn-ghost btn-xs px-1"
                                onClick={() => moveLink(index, index - 1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                            )}
                            {index < socialLinks.length - 1 && (
                              <button
                                type="button"
                                title="Move down"
                                className="btn btn-ghost btn-xs px-1"
                                onClick={() => moveLink(index, index + 1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs text-error hover:bg-error/10 px-2"
                              title="Remove Link"
                              onClick={() => {
                                const newList = socialLinks.filter((_, i) => i !== index);
                                setSocialLinks(newList);
                                setCookieSocialLinks(newList);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-base-100 rounded-lg border border-dashed border-base-300 mb-4">
                      <p className="text-sm text-base-content/50">No social links added yet.</p>
                      {!isAddingNewLink && (
                        <button
                          type="button"
                          className="btn btn-sm btn-ghost text-primary mt-2 gap-1"
                          onClick={() => setIsAddingNewLink(true)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                          </svg>
                          Add your first link
                        </button>
                      )}
                    </div>
                  )}

                  {/* Add social link controls */}
                  {isAddingNewLink && (
                    <div className="bg-base-100 p-4 rounded-lg border border-primary/20 shadow-inner space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-primary">New Social Link</h4>
                        <button
                          type="button"
                          className="btn btn-ghost btn-circle btn-xs text-base-content/60"
                          onClick={() => {
                            setIsAddingNewLink(false);
                            setNewUrl("");
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="form-control w-full">
                          <label className="label py-1"><span className="label-text text-xs font-semibold">Platform</span></label>
                          <select
                            className="select select-bordered select-sm w-full"
                            value={newPlatform}
                            onChange={e => setNewPlatform(e.target.value)}
                          >
                            <option value="GitHub">GitHub</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Twitter / X">Twitter / X</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="WeChat">WeChat</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Telegram">Telegram</option>
                            <option value="Google Scholar">Google Scholar</option>
                            <option value="ResearchGate">ResearchGate</option>
                            <option value="Discord">Discord</option>
                            <option value="Medium">Medium</option>
                            <option value="Substack">Substack</option>
                            <option value="Website">Website</option>
                          </select>
                        </div>
                        
                        <div className="form-control w-full col-span-2">
                          <label className="label py-1"><span className="label-text text-xs font-semibold">Profile URL</span></label>
                          <input
                            type="url"
                            placeholder="e.g. https://github.com/yourusername"
                            className="input input-bordered input-sm w-full"
                            value={newUrl}
                            onChange={e => setNewUrl(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const addButton = document.getElementById("add-social-link-btn");
                                if (addButton) addButton.click();
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-base-200">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => {
                            setIsAddingNewLink(false);
                            setNewUrl("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          id="add-social-link-btn"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            if (!newUrl) {
                              toast.error("Please enter a URL");
                              return;
                            }
                            try {
                              new URL(newUrl);
                            } catch (e) {
                              toast.error("Please enter a valid URL (including https://)");
                              return;
                            }
                            const newLink = { platform: newPlatform, url: newUrl };
                            const updatedLinks = [...socialLinks, newLink];
                            setSocialLinks(updatedLinks);
                            setCookieSocialLinks(updatedLinks);
                            setNewUrl("");
                            setIsAddingNewLink(false);
                            toast.success(`Added ${newPlatform} link!`);
                          }}
                        >
                          Add Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Profile Settings and Section Visibility */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* Site Identity Card */}
          <div className="card bg-base-200 shadow-sm border border-base-300 w-full">
            <div className="card-body">
              <h2 className="card-title font-bold text-xl">Site Identity</h2>
              <p className="text-base-content/60 text-sm mb-4">Manage your site name (displayed on browser tab) and description.</p>
              <div className="space-y-4">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Site Name</span></label>
                  <input 
                    type="text"
                    placeholder="e.g. John Doe"
                    className="input input-bordered w-full"
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Site Description</span></label>
                  <textarea 
                    placeholder="e.g. Full Stack Developer..."
                    className="textarea textarea-bordered w-full h-24"
                    value={formData.bio} 
                    onChange={e => setFormData({ ...formData, bio: e.target.value })} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Visibility Card */}
          <div className="card bg-base-200 shadow-sm border border-base-300 w-full">
            <div className="card-body">
              <h2 className="card-title font-bold text-xl">Section Visibility</h2>
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
                <div className="form-control w-full">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input 
                      type="checkbox" 
                      className="toggle toggle-primary"
                      id="show-experience"
                      checked={formData.show_experience} 
                      onChange={e => setFormData({ ...formData, show_experience: e.target.checked })} 
                    />
                    <span className="label-text font-medium">Show Experience Section</span>
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input 
                      type="checkbox" 
                      className="toggle toggle-primary"
                      id="show-education"
                      checked={formData.show_education} 
                      onChange={e => setFormData({ ...formData, show_education: e.target.checked })} 
                    />
                    <span className="label-text font-medium">Show Education Section</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
