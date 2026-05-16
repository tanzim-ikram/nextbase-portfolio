import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";

export const revalidate = 0;

export default async function PublicationsPage() {
  const supabase = await createClient();
  const { data: publications } = await supabase.from("publications").select("*").order("date", { ascending: false });

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
              <th>Publisher/Venue</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {publications?.map((pub) => (
              <tr key={pub.id}>
                <td className="font-medium">{pub.title}</td>
                <td>{pub.publisher}</td>
                <td>{pub.date ? new Date(pub.date).toLocaleDateString() : ''}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/publications/${pub.id}/edit`}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={pub.id} table="publications" title={pub.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(!publications || publications.length === 0) && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-base-content/60">
                  No publications found. Run the schema_update.sql first and create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
