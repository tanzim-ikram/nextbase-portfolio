import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { cookies } from "next/headers";
import { Pencil } from "lucide-react";

export const revalidate = 0;

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Publications</h1>
          <p className="text-base-content/60">Manage your published works and papers.</p>
        </div>
        <Link href="/admin/publications/new" className="btn btn-primary">Add Publication</Link>
      </div>

      <div className="overflow-x-auto border border-base-300 rounded-box">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Journal / Conference</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {publications?.map((pub: any) => (
              <tr key={pub.id}>
                <td className="font-medium max-w-xs truncate" title={pub.title}>{pub.title}</td>
                <td className="max-w-xs truncate" title={pub.authors}>{pub.authors || "—"}</td>
                <td>{pub.journal || "—"}</td>
                <td>{pub.publisher || "—"}</td>
                <td>{pub.publish_year || "—"}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/publications/${pub.id}/edit`}
                      className="btn btn-ghost btn-xs"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={pub.id} table="publications" title={pub.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(!publications || publications.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-base-content/60">
                  No publications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
