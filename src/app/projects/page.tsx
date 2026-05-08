import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            {(project.live_url || project.github_url) && (
              <CardFooter className="gap-2">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className={buttonVariants({ size: "sm" })}>Live</a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className={buttonVariants({ size: "sm", variant: "outline" })}>GitHub</a>
                )}
              </CardFooter>
            )}
          </Card>
        ))}
        {(!projects || projects.length === 0) && (
          <p className="text-muted-foreground col-span-full">No projects found.</p>
        )}
      </div>
    </div>
  );
}
