import { createClient } from "@/utils/supabase/server";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { FeaturedPublications } from "@/components/home/featured-publications";

export const revalidate = 0; // Disable static rendering for now to see live DB updates

export default async function Home() {
  const supabase = await createClient();
  
  const { data: siteSettings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 space-y-24">
      <Hero settings={siteSettings} />
      
      {siteSettings?.show_services && <Services />}
      
      {siteSettings?.show_projects && <FeaturedProjects />}
      
      {siteSettings?.show_publications && <FeaturedPublications />}
    </div>
  );
}
