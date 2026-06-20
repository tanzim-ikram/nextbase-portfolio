import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const DUMMY_PROJECTS = [
  {
    id: "1",
    title: "Portfolio CMS",
    slug: "portfolio-cms",
    description: "A full-featured developer portfolio CMS with blog, projects, media gallery, and an admin dashboard built with Next.js and Supabase.",
    image_url: null,
    live_url: "#",
    github_url: "https://github.com/yourusername",
    is_featured: true,
    tags: ["Next.js", "Supabase", "TypeScript", "DaisyUI"],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description: "A modern, high-performance e-commerce platform with product management, cart, and payment integration.",
    image_url: null,
    live_url: "#",
    github_url: "https://github.com/yourusername",
    is_featured: true,
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "3",
    title: "Task Management App",
    slug: "task-management",
    description: "A collaborative task management tool with real-time updates, team workspaces, and progress tracking.",
    image_url: null,
    live_url: "#",
    github_url: "https://github.com/yourusername",
    is_featured: true,
    tags: ["Next.js", "Framer Motion", "Supabase"],
  },
];

export async function FeaturedProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  const projects = (data && data.length > 0) ? data : DUMMY_PROJECTS;

  return (
    <section id="projects" className="py-12 md:py-24">
      <div className="w-full mx-auto space-y-10">
        <div className="relative flex items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-center">My Work</h2>
          <Link href="/projects" className="btn btn-ghost btn-sm absolute right-0">View all →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <div key={project.id} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
              {project.image_url ? (
                <figure>
                  <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover" />
                </figure>
              ) : (
                <div className="h-40 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-4xl font-black text-base-content/20">{project.title.charAt(0)}</span>
                </div>
              )}
              <div className="card-body p-5 flex-1 flex flex-col">
                <h3 className="card-title text-base">{project.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed line-clamp-2 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="badge badge-secondary badge-sm">{tag}</span>
                  ))}
                </div>
                <div className="card-actions mt-4 flex gap-2">
                  {project.live_url && project.live_url !== "#" && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm gap-1 flex-1">
                      <ExternalLink className="w-3 h-3" /> Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm gap-1 flex-1">
                      <GithubIcon className="w-3 h-3" /> Code
                    </a>
                  )}
                  {!project.live_url && !project.github_url && (
                    <Link href={`/projects/${project.slug}`} className="btn btn-primary btn-sm w-full">View Details</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
