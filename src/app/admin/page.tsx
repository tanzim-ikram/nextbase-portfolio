import { createClient } from "@/utils/supabase/server";
import { Eye, FileText, FolderGit2, Image as ImageIcon } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get total blog views and draft count
  const { data: posts } = await supabase.from("posts").select("view_count, status");
  const totalViews = posts?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0;
  const draftCount = posts?.filter((post) => post.status === "draft").length || 0;
  
  const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
  const { count: mediaCount } = await supabase.from("media").select("*", { count: "exact", head: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard Overview</h1>
        <p className="text-base-content/60 mt-1">Welcome to your NextBase Admin Dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card bg-primary text-primary-content shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-semibold opacity-80">Total Blog Views</h3>
              <Eye className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-4xl font-bold">{totalViews}</div>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-semibold opacity-80">Draft Posts</h3>
              <FileText className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-4xl font-bold">{draftCount}</div>
          </div>
        </div>
        <div className="card bg-accent text-accent-content shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-semibold opacity-80">Total Projects</h3>
              <FolderGit2 className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-4xl font-bold">{projectCount || 0}</div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-semibold opacity-80">Media Files</h3>
              <ImageIcon className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-4xl font-bold">{mediaCount || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
