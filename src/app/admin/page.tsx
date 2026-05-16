import { createClient } from "@/utils/supabase/server";
import { Eye, FileText, FolderGit2, Image as ImageIcon, FileCheck, BookOpen, Star, Briefcase } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get total blog views and post counts
  const { data: posts } = await supabase.from("posts").select("view_count, status");
  const totalViews = posts?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0;
  const draftCount = posts?.filter((post) => post.status === "draft").length || 0;
  const publishedCount = posts?.filter((post) => post.status === "published").length || 0;
  
  const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
  const { count: featuredProjectCount } = await supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_featured", true);
  const { count: mediaCount } = await supabase.from("media").select("*", { count: "exact", head: true });
  
  // Try to fetch publications and experience counts (safe fallback if tables don't exist yet)
  const { count: publicationCount } = await supabase.from("publications").select("*", { count: "exact", head: true });
  const { count: experienceCount } = await supabase.from("experience").select("*", { count: "exact", head: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard Overview</h1>
        <p className="text-base-content/60 mt-1">Welcome to your NextBase Admin Dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Blog Views */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Total Blog Views</h3>
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{totalViews}</div>
          </div>
        </div>

        {/* Published Posts */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Published Posts</h3>
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{publishedCount}</div>
          </div>
        </div>

        {/* Draft Posts */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Draft Posts</h3>
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{draftCount}</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Total Projects</h3>
              <FolderGit2 className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{projectCount || 0}</div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Featured Projects</h3>
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{featuredProjectCount || 0}</div>
          </div>
        </div>

        {/* Publications */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Publications</h3>
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{publicationCount || 0}</div>
          </div>
        </div>

        {/* Experience */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Work Experience</h3>
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{experienceCount || 0}</div>
          </div>
        </div>

        {/* Media */}
        <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="card-body p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-base-content/70">Media Files</h3>
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">{mediaCount || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
