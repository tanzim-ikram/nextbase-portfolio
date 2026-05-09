import { createClient } from "@/utils/supabase/server";

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
          <div key={pub.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="card-title text-xl">{pub.title}</h2>
                  <p className="mt-2 text-base text-base-content/70">
                    {pub.publisher} • {pub.publish_date ? new Date(pub.publish_date).toLocaleDateString() : ''}
                  </p>
                </div>
                {pub.paper_url && (
                  <a href={pub.paper_url} target="_blank" rel="noreferrer" className="btn btn-outline">Read Paper</a>
                )}
              </div>
              {pub.abstract && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Abstract</h3>
                  <p className="text-base-content/70 leading-relaxed">{pub.abstract}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {(!publications || publications.length === 0) && (
          <p className="text-base-content/60">No publications found.</p>
        )}
      </div>
    </div>
  );
}
