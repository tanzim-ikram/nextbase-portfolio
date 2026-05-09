import { createClient } from "@/utils/supabase/server";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Skills } from "@/components/home/skills";
import { Experience } from "@/components/home/experience";
import { Education } from "@/components/home/education";
import { Services } from "@/components/home/services";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { FeaturedPublications } from "@/components/home/featured-publications";
import { ConnectMe } from "@/components/home/connect";
import { FadeIn } from "@/components/fade-in";

export const revalidate = 0; // Disable static rendering for now to see live DB updates

export default async function Home() {
  const supabase = await createClient();
  
  const { data: siteSettings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 space-y-12 overflow-hidden">
      <FadeIn>
        <Hero settings={siteSettings} />
      </FadeIn>
      
      {siteSettings?.about_text && (
        <FadeIn>
          <About text={siteSettings.about_text} />
        </FadeIn>
      )}

      <FadeIn>
        <Skills />
      </FadeIn>
      
      {siteSettings?.show_experience && (
        <FadeIn>
          <Experience />
        </FadeIn>
      )}

      {siteSettings?.show_education && (
        <FadeIn>
          <Education />
        </FadeIn>
      )}
      
      {siteSettings?.show_services && (
        <FadeIn>
          <Services />
        </FadeIn>
      )}
      
      {siteSettings?.show_projects && (
        <FadeIn>
          <FeaturedProjects />
        </FadeIn>
      )}
      
      {siteSettings?.show_publications && (
        <FadeIn>
          <FeaturedPublications />
        </FadeIn>
      )}

      <FadeIn>
        <ConnectMe />
      </FadeIn>
    </div>
  );
}
