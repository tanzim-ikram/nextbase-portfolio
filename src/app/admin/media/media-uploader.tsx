"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

export function MediaUploader({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);

    for (const file of acceptedFiles) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload to storage bucket named 'portfolio_media'
        // NOTE: Make sure this bucket is created in Supabase Dashboard and is Public!
        const { error: uploadError, data } = await supabase.storage
          .from("portfolio_media")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("portfolio_media")
          .getPublicUrl(filePath);

        // Save metadata to media table
        const { error: dbError } = await supabase.from("media").insert({
          url: publicUrlData.publicUrl,
          file_name: file.name,
        });

        if (dbError) throw dbError;
        
        toast.success(`Uploaded ${file.name}`);
      } catch (error: any) {
        toast.error(`Error uploading ${file.name}: ${error.message}`);
      }
    }

    setUploading(false);
    onUploadComplete();
  }, [supabase, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      {uploading ? (
        <p>Uploading files...</p>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
