import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 max-w-4xl py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <div className="flex gap-4">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className={buttonVariants()}>Visit Live Project</a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline" })}>View Source Code</a>
          )}
        </div>
      </header>

      {project.image_url && (
        <div className="mb-8">
          <img src={project.image_url} alt={project.title} className="w-full h-auto rounded-lg border shadow-sm" />
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-base">
          {typeof project.content === 'string' ? project.content : JSON.stringify(project.content, null, 2)}
        </pre>
      </div>
    </article>
  );
}
