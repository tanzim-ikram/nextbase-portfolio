import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./settings-form";

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div className="w-full">
      <SettingsForm initialData={settings} />
    </div>
  );
}
