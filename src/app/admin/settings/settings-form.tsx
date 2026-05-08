"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Update the main text on your homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input 
              value={formData.hero_title || ""} 
              onChange={e => setFormData({ ...formData, hero_title: e.target.value })} 
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Input 
              value={formData.hero_subtitle || ""} 
              onChange={e => setFormData({ ...formData, hero_subtitle: e.target.value })} 
            />
          </div>
          <div className="space-y-2">
            <Label>About Text</Label>
            <Textarea 
              value={formData.about_text || ""} 
              onChange={e => setFormData({ ...formData, about_text: e.target.value })} 
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Section Visibility</CardTitle>
          <CardDescription>Toggle which sections are visible on your public portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="flex-1 cursor-pointer" htmlFor="show-services">Show Services Section</Label>
            <Switch 
              id="show-services"
              checked={formData.show_services} 
              onCheckedChange={checked => setFormData({ ...formData, show_services: checked })} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="flex-1 cursor-pointer" htmlFor="show-projects">Show Projects Section</Label>
            <Switch 
              id="show-projects"
              checked={formData.show_projects} 
              onCheckedChange={checked => setFormData({ ...formData, show_projects: checked })} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="flex-1 cursor-pointer" htmlFor="show-publications">Show Publications Section</Label>
            <Switch 
              id="show-publications"
              checked={formData.show_publications} 
              onCheckedChange={checked => setFormData({ ...formData, show_publications: checked })} 
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
