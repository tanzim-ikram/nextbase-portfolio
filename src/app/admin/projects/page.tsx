import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { CheckCircle2, XCircle, Pencil } from "lucide-react";

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-base-content/60">Manage your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary">Add Project</Link>
      </div>

      <div className="overflow-x-auto border border-base-300 rounded-box">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Featured</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project.id}>
                <td className="font-medium">{project.title}</td>
                <td>{project.slug}</td>
                <td>
                  {project.is_featured ? (
                    <div className="badge badge-primary gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Yes
                    </div>
                  ) : (
                    <div className="badge badge-ghost gap-1 text-base-content/60">
                      <XCircle className="w-3 h-3" /> No
                    </div>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="link link-primary text-sm">Live</a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="link link-secondary text-sm">GitHub</a>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="btn btn-ghost btn-xs"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={project.id} table="projects" title={project.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(!projects || projects.length === 0) && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/60">
                  No projects found. Try creating one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
