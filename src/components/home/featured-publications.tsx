import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";

const DUMMY_PUBLICATIONS = [
  {
    id: "1",
    title: "Sample Research Paper Title: A Study on Modern Web Technologies",
    authors: "Jane Doe, Your Name, John Smith",
    journal: "IEEE Transactions on Software Engineering",
    publisher: "IEEE",
    publish_year: "2023",
    url: "#",
    description: "This paper presents a comprehensive study on modern web development technologies and their impact on software engineering practices, highlighting performance improvements and developer productivity gains.",
    is_featured: true,
  },
];

export async function FeaturedPublications() {
  const supabase = await createClient();
  const { data: publicationsData } = await supabase
    .from("publications")
    .select("*")
    .eq("is_featured", true)
    .order("publish_year", { ascending: false });

  let publications = publicationsData;
  if (!publications || publications.length === 0) {
    // Fallback to cookie storage in offline dev mode
    const cookieStore = await cookies();
    const raw = cookieStore.get("nextbase-publications")?.value;
    const allPubs = raw ? JSON.parse(decodeURIComponent(raw)) : [];
    publications = allPubs.filter((pub: any) => pub.is_featured === true);
  }

  // Use dummy data if absolutely no publications found
  const finalPubs = (publications && publications.length > 0) ? publications : DUMMY_PUBLICATIONS;

  const renderAuthors = (authorsText: string, highlightAuthor?: string | null) => {
    if (!authorsText) return null;
    const highlight = highlightAuthor || siteConfig.highlightName || siteConfig.name;
    const list = authorsText.split(",").map((a) => a.trim());

    return (
      <>
        {list.map((author, i) => {
          const isSelf =
            author.toLowerCase() === highlight.toLowerCase() ||
            (highlight !== "Your Name" && author.toLowerCase().includes(highlight.toLowerCase())) ||
            (highlight !== "Your Name" && highlight.toLowerCase().includes(author.toLowerCase()));
          return (
            <span key={i}>
              {isSelf ? (
                <strong className="text-primary font-bold decoration-primary underline decoration-2">{author}</strong>
              ) : (
                author
              )}
              {i < list.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <section id="publications" className="py-12 md:py-24">
      <div className="w-full mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Publications</h2>
          <Link href="/publications" className="btn btn-ghost btn-sm">View all →</Link>
        </div>
        <div className="grid gap-6">
          {finalPubs.map((pub: any) => (
            <div key={pub.id} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex gap-4 items-start flex-1">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base leading-snug">{pub.title}</h3>
                      {pub.authors && (
                        <p className="text-sm font-medium text-base-content/80 mt-1">
                          By: {renderAuthors(pub.authors, pub.highlight_author)}
                        </p>
                      )}
                      <p className="text-base-content/60 text-xs mt-1">
                        {pub.journal && <span className="font-semibold">{pub.journal}</span>}
                        {pub.publisher && ` • ${pub.publisher}`}
                        {pub.publish_year && ` • ${pub.publish_year}`}
                      </p>
                      {pub.description && (
                        <p className="text-base-content/75 text-sm mt-3 leading-relaxed">{pub.description}</p>
                      )}
                    </div>
                  </div>
                  {pub.url && pub.url !== "#" && (
                    <a href={pub.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm gap-1 shrink-0">
                      <ExternalLink className="w-3 h-3" /> Read Paper
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
