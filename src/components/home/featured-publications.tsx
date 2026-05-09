import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

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
        <Link href="/publications" className="btn btn-ghost">View all</Link>
      </div>
      <div className="grid gap-6">
        {publications.map((pub) => (
          <div key={pub.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="card-title">{pub.title}</h3>
                  <p className="mt-1 text-base-content/70">
                    {pub.publisher} • {pub.publish_date ? new Date(pub.publish_date).getFullYear() : ''}
                  </p>
                </div>
                {pub.paper_url && (
                  <a href={pub.paper_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Read Paper</a>
                )}
              </div>
              {pub.abstract && (
                <p className="text-sm text-base-content/60 line-clamp-3 mt-4">{pub.abstract}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
