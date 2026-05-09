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
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-base-content/60">Welcome to your NextBase Admin Dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Blog Views</h3>
              <Eye className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="text-2xl font-bold">{totalViews}</div>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Draft Posts</h3>
              <FileText className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="text-2xl font-bold">{draftCount}</div>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Projects</h3>
              <FolderGit2 className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="text-2xl font-bold">{projectCount || 0}</div>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Media Files</h3>
              <ImageIcon className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="text-2xl font-bold">{mediaCount || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
