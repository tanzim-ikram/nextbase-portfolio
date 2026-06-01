import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./settings-form";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  
  const { data: socialLinksData } = await supabase
    .from("social_links")
    .select("*")
    .order("display_order", { ascending: true });

  let socialLinks = socialLinksData;
  if (!socialLinks || socialLinks.length === 0) {
    const cookieStore = await cookies();
    const raw = cookieStore.get("nextbase-social-links")?.value;
    socialLinks = raw ? JSON.parse(decodeURIComponent(raw)) : [];
  }

  return (
    <div className="w-full">
      <SettingsForm initialData={settings} initialSocialLinks={socialLinks || []} />
    </div>
  );
}
