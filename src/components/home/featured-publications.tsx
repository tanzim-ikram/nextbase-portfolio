import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function FeaturedPublications() {
  const supabase = await createClient();
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .eq("is_featured", true)
    .order("publish_date", { ascending: false });

  if (!publications || publications.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Publications</h2>
        <Link href="/publications" className={buttonVariants({ variant: "ghost" })}>View all</Link>
      </div>
      <div className="grid gap-6">
        {publications.map((pub) => (
          <Card key={pub.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{pub.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {pub.publisher} • {pub.publish_date ? new Date(pub.publish_date).getFullYear() : ''}
                  </CardDescription>
                </div>
                {pub.paper_url && (
                  <a href={pub.paper_url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>Read Paper</a>
                )}
              </div>
            </CardHeader>
            {pub.abstract && (
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{pub.abstract}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
