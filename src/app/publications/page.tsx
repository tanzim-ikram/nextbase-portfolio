import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FileText, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export const revalidate = 0;

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

export default async function PublicationsPage() {
  const supabase = await createClient();
  const { data: publicationsData } = await supabase
    .from("publications")
    .select("*")
    .order("publish_year", { ascending: false });

  let publications = publicationsData;
  if (!publications || publications.length === 0) {
    // Fallback to cookie storage in offline dev mode
    const cookieStore = await cookies();
    const raw = cookieStore.get("nextbase-publications")?.value;
    publications = raw ? JSON.parse(decodeURIComponent(raw)) : [];
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
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Publications</h1>
      <div className="grid gap-6">
        {finalPubs.map((pub: any) => (
          <div key={pub.id} className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex gap-4 items-start flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title text-xl sm:text-2xl font-bold">{pub.title}</h2>
                    {pub.authors && (
                      <p className="text-sm sm:text-base font-medium text-base-content/80 mt-1">
                        By: {renderAuthors(pub.authors, pub.highlight_author)}
                      </p>
                    )}
                    <p className="text-base-content/60 text-xs sm:text-sm mt-1">
                      {pub.journal && <span className="font-semibold">{pub.journal}</span>}
                      {pub.publisher && ` • ${pub.publisher}`}
                      {pub.publish_year && ` • ${pub.publish_year}`}
                    </p>
                  </div>
                </div>
                {pub.url && pub.url !== "#" && (
                  <a href={pub.url} target="_blank" rel="noreferrer" className="btn btn-outline gap-1 shrink-0">
                    <ExternalLink className="w-4 h-4" /> Read Paper / DOI
                  </a>
                )}
              </div>
              {pub.description && (
                <div className="mt-6 border-t border-base-300 pt-4">
                  <h3 className="font-semibold mb-2">Description / Abstract</h3>
                  <p className="text-base-content/75 leading-relaxed text-sm sm:text-base">{pub.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
