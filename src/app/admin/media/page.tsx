"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { MediaUploader } from "./media-uploader";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function MediaGallery() {
  const [media, setMedia] = useState<any[]>([]);
  const supabase = createClient();

  const fetchMedia = async () => {
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (data) setMedia(data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const deleteMedia = async (id: string, url: string) => {
    const confirmed = confirm("Are you sure you want to delete this media file?");
    if (!confirmed) return;

    const { error } = await supabase.from("media").delete().eq("id", id);
    if (!error) {
      toast.success("Deleted successfully");
      fetchMedia();
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Media Gallery</h1>
        <p className="text-base-content/60">Upload and manage your images and files.</p>
      </div>

      <MediaUploader onUploadComplete={fetchMedia} />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {media.map((item) => (
          <div key={item.id} className="card bg-base-200 overflow-hidden group border border-base-300 rounded-xl">
            <div className="aspect-video relative bg-base-300 flex items-center justify-center overflow-hidden">
              {item.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                <img src={item.url} alt={item.file_name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-sm text-base-content/60 font-mono truncate px-2">{item.file_name}</span>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="btn btn-circle btn-sm btn-secondary" onClick={() => copyUrl(item.url)}>
                  <Copy className="h-4 w-4" />
                </button>
                <button className="btn btn-circle btn-sm btn-error" onClick={() => deleteMedia(item.id, item.url)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs truncate" title={item.file_name}>{item.file_name}</p>
            </div>
          </div>
        ))}
      </div>
      
      {media.length === 0 && (
        <p className="text-base-content/60 text-center py-12">No media uploaded yet.</p>
      )}
    </div>
  );
}
