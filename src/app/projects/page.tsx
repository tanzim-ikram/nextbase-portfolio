import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <div key={project.id} className="card bg-base-200 shadow-xl flex flex-col">
            <div className="card-body flex-1">
              <h2 className="card-title">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h2>
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
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Live</a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">GitHub</a>
                )}
              </div>
            )}
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <p className="text-base-content/60 col-span-full">No projects found.</p>
        )}
      </div>
    </div>
  );
}
