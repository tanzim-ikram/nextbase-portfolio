import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export async function FeaturedProjects() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (!projects || projects.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <Link href="/projects" className="btn btn-ghost">View all</Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="card bg-base-200 shadow-xl flex flex-col">
            <div className="card-body flex-1">
              <h3 className="card-title">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h3>
              <p className="line-clamp-2 text-base-content/70">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags?.map((tag: string) => (
                  <div key={tag} className="badge badge-secondary">{tag}</div>
                ))}
              </div>
            </div>
            {(project.live_url || project.github_url) && (
              <div className="card-actions justify-start p-4 pt-0">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Live Demo</a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">GitHub</a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
