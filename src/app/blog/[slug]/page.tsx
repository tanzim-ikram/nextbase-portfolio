import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch post
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  // Increment view count
  await supabase.rpc("increment_view_count", { post_id: post.id });

  return (
    <article className="container mx-auto px-4 max-w-3xl py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.reading_time || "5 min read"}</span>
          <span>•</span>
          <span>{post.view_count + 1} views</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </header>

      {post.cover_image && (
        <div className="mb-8">
          <img src={post.cover_image} alt={post.title} className="w-full h-auto rounded-lg" />
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-base">
          {typeof post.content === 'string' ? post.content : JSON.stringify(post.content, null, 2)}
        </pre>
      </div>
    </article>
  );
}
