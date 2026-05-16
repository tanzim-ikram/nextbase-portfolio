import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";

const DUMMY_PUBLICATIONS = [
  {
    id: "1",
    title: "Sample Research Paper Title: A Study on Modern Web Technologies",
    publisher: "International Conference on Computer Science",
    publish_date: "2023-06-01",
    paper_url: "#",
    abstract: "This paper presents a comprehensive study on modern web development technologies and their impact on software engineering practices, highlighting performance improvements and developer productivity gains.",
    is_featured: true,
  },
];

export async function FeaturedPublications() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("publications")
    .select("*")
    .eq("is_featured", true)
    .order("publish_date", { ascending: false });

  const publications = (data && data.length > 0) ? data : DUMMY_PUBLICATIONS;

  return (
    <section id="publications" className="py-12 md:py-24">
      <div className="w-full mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Publications</h2>
          <Link href="/publications" className="btn btn-ghost btn-sm">View all →</Link>
        </div>
        <div className="grid gap-6">
          {publications.map((pub: any) => (
            <div key={pub.id} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex gap-4 items-start flex-1">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base leading-snug">{pub.title}</h3>
                      <p className="text-base-content/60 text-sm mt-1">
                        {pub.publisher}{pub.publish_date ? ` · ${new Date(pub.publish_date).getFullYear()}` : ""}
                      </p>
                      {pub.abstract && (
                        <p className="text-base-content/70 text-sm mt-3 line-clamp-3 leading-relaxed">{pub.abstract}</p>
                      )}
                    </div>
                  </div>
                  {pub.paper_url && pub.paper_url !== "#" && (
                    <a href={pub.paper_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm gap-1 shrink-0">
                      <ExternalLink className="w-3 h-3" /> Read
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
