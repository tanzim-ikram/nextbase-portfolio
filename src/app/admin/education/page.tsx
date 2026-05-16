import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";

export const revalidate = 0;

export default async function EducationPage() {
  const supabase = await createClient();
  const { data: education } = await supabase.from("education").select("*").order("start_date", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Education</h1>
          <p className="text-base-content/60">Manage your educational background.</p>
        </div>
        <Link href="/admin/education/new" className="btn btn-primary">Add Education</Link>
      </div>

      <div className="overflow-x-auto border border-base-300 rounded-box">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Institution</th>
              <th>Degree</th>
              <th>Duration</th>
              <th>Current</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {education?.map((edu) => (
              <tr key={edu.id}>
                <td className="font-medium">{edu.institution}</td>
                <td>{edu.degree}</td>
                <td>
                  {edu.start_date ? new Date(edu.start_date).toLocaleDateString() : ''} - 
                  {edu.is_current ? ' Present' : (edu.end_date ? new Date(edu.end_date).toLocaleDateString() : '')}
                </td>
                <td>
                  {edu.is_current ? <div className="badge badge-primary">Yes</div> : null}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/education/${edu.id}/edit`}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={edu.id} table="education" title={edu.institution} />
                  </div>
                </td>
              </tr>
            ))}
            {(!education || education.length === 0) && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/60">
                  No education entries found. Run the schema_update.sql first!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
