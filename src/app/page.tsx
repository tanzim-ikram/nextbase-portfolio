import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
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

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  
  const { data: siteSettings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

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

  // Default to true when siteSettings is null (DB not seeded yet)
  const showExperience = siteSettings?.show_experience ?? true;
  const showEducation = siteSettings?.show_education ?? true;
  const showServices = siteSettings?.show_services ?? true;
  const showProjects = siteSettings?.show_projects ?? true;
  const showPublications = siteSettings?.show_publications ?? true;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 space-y-4 overflow-hidden">
      <FadeIn>
        <Hero settings={siteSettings} />
      </FadeIn>

      <FadeIn>
        <About text={siteSettings?.about_text} />
      </FadeIn>

      <FadeIn>
        <Skills />
      </FadeIn>

      {showExperience && (
        <FadeIn>
          <Experience />
        </FadeIn>
      )}

      {showEducation && (
        <FadeIn>
          <Education />
        </FadeIn>
      )}

      {showPublications && (
        <FadeIn>
          <FeaturedPublications />
        </FadeIn>
      )}

      {showServices && (
        <FadeIn>
          <Services />
        </FadeIn>
      )}

      {showProjects && (
        <FadeIn>
          <FeaturedProjects />
        </FadeIn>
      )}

      <FadeIn>
        <ConnectMe settings={siteSettings} socialLinks={socialLinks || []} />
      </FadeIn>
    </div>
  );
}
