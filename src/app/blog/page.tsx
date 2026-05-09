import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6">
        {posts?.map((post) => (
          <div key={post.id} className="card bg-base-200 shadow-xl overflow-hidden">
            {post.cover_image && (
              <figure>
                <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-base-content/60">
                {new Date(post.created_at).toLocaleDateString()} • {post.reading_time || "5 min read"} • {post.view_count} views
              </p>
              <p className="text-base-content/80 mt-2">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags?.map((tag: string) => (
                  <div key={tag} className="badge badge-secondary">{tag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <p className="text-base-content/60">No posts found.</p>
        )}
      </div>
    </div>
  );
}
