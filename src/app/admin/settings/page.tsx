import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./settings-form";

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-base-content/60">Manage your portfolio's content and visibility.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
