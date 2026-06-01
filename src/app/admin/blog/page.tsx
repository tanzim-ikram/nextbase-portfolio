import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { Pencil } from "lucide-react";

export const revalidate = 0;

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-base-content/60">Manage your blog content.</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary">Write Post</Link>
      </div>

      <div className="overflow-x-auto border border-base-300 rounded-box">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Views</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="font-medium">{post.title}</td>
                <td>
                  <div className={`badge ${post.status === "published" ? "badge-primary" : "badge-secondary"}`}>
                    {post.status}
                  </div>
                </td>
                <td>{post.view_count}</td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="btn btn-ghost btn-xs"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="btn btn-ghost btn-xs"
                    >
                      View
                    </Link>
                    <DeleteButton id={post.id} table="posts" title={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/60">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
