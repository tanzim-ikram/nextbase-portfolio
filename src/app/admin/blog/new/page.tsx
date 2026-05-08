"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { TiptapEditor } from "../editor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    status: "draft",
    tags: "",
    content: null as any,
  });

  const handleSave = async () => {
    setLoading(true);
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
    
    const { error } = await supabase.from("posts").insert({
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      excerpt: formData.excerpt,
      status: formData.status,
      tags: tagsArray,
      content: formData.content,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Post saved!");
      router.push("/admin/blog");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="status">Published</Label>
            <Switch 
              id="status" 
              checked={formData.status === "published"}
              onCheckedChange={(c) => setFormData({ ...formData, status: c ? "published" : "draft" })}
            />
          </div>
          <Button onClick={handleSave} disabled={loading}>Save Post</Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })} 
              placeholder="Post Title"
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input 
              value={formData.slug} 
              onChange={e => setFormData({ ...formData, slug: e.target.value })} 
              placeholder="post-url-slug"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Excerpt</Label>
          <Textarea 
            value={formData.excerpt} 
            onChange={e => setFormData({ ...formData, excerpt: e.target.value })} 
            placeholder="Short description for the blog list..."
          />
        </div>

        <div className="space-y-2">
          <Label>Tags (comma separated)</Label>
          <Input 
            value={formData.tags} 
            onChange={e => setFormData({ ...formData, tags: e.target.value })} 
            placeholder="react, nextjs, typescript"
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <TiptapEditor 
            content={formData.content} 
            onChange={(c: any) => setFormData({ ...formData, content: c })} 
          />
        </div>
      </div>
    </div>
  );
}
