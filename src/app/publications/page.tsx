import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 0;

export default async function PublicationsPage() {
  const supabase = await createClient();
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("publish_date", { ascending: false });

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Publications</h1>
      <div className="grid gap-6">
        {publications?.map((pub) => (
          <Card key={pub.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl">{pub.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {pub.publisher} • {pub.publish_date ? new Date(pub.publish_date).toLocaleDateString() : ''}
                  </CardDescription>
                </div>
                {pub.paper_url && (
                  <a href={pub.paper_url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline" })}>Read Paper</a>
                )}
              </div>
            </CardHeader>
            {pub.abstract && (
              <CardContent>
                <h3 className="font-semibold mb-2">Abstract</h3>
                <p className="text-muted-foreground leading-relaxed">{pub.abstract}</p>
              </CardContent>
            )}
          </Card>
        ))}
        {(!publications || publications.length === 0) && (
          <p className="text-muted-foreground">No publications found.</p>
        )}
      </div>
    </div>
  );
}
