import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { TiptapRenderer } from "@/components/tiptap-renderer";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  const { data: { session } } = await supabase.auth.getSession();
  const cookieStore = await cookies();
  const isBypassed = cookieStore.get("nextbase-admin-bypass")?.value === "true";
  const isLoggedIn = !!session || isBypassed;

  // Increment view count only for public users
  if (!isLoggedIn) {
    await supabase.rpc("increment_view_count", { post_id: post.id });
  }

  return (
    <article className="container mx-auto px-4 max-w-3xl py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-base-content/60">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.reading_time || "5 min read"}</span>
          <span>•</span>
          <span>{isLoggedIn ? post.view_count : post.view_count + 1} views</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags?.map((tag: string) => (
            <div key={tag} className="badge badge-secondary">{tag}</div>
          ))}
        </div>
      </header>

      {post.cover_image && (
        <div className="mb-8">
          <img src={post.cover_image} alt={post.title} className="w-full h-auto rounded-lg" />
        </div>
      )}

      <TiptapRenderer content={post.content} />
    </article>
  );
}
