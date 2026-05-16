import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";

export const revalidate = 0;

export default async function ExperiencePage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase.from("experience").select("*").order("start_date", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-base-content/60">Manage your work experience history.</p>
        </div>
        <Link href="/admin/experience/new" className="btn btn-primary">Add Experience</Link>
      </div>

      <div className="overflow-x-auto border border-base-300 rounded-box">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Duration</th>
              <th>Current</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences?.map((exp) => (
              <tr key={exp.id}>
                <td className="font-medium">{exp.company}</td>
                <td>{exp.position}</td>
                <td>
                  {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : ''} - 
                  {exp.is_current ? ' Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString() : '')}
                </td>
                <td>
                  {exp.is_current ? <div className="badge badge-primary">Yes</div> : null}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/experience/${exp.id}/edit`}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={exp.id} table="experience" title={exp.company} />
                  </div>
                </td>
              </tr>
            ))}
            {(!experiences || experiences.length === 0) && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/60">
                  No experience entries found. Run the schema_update.sql first!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
