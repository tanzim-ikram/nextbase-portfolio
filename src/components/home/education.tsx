import { createClient } from "@/utils/supabase/server";
import { GraduationCap } from "lucide-react";

export async function Education() {
  const supabase = await createClient();
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false });

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-12 md:py-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold tracking-tight text-center">Education</h2>
        <div className="grid gap-6">
          {education.map((edu: any) => (
            <div key={edu.id} className="card bg-base-200 shadow-sm border border-base-300">
              <div className="card-body p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-secondary-content shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-bold text-xl">{edu.degree}</h3>
                    <span className="text-sm font-medium text-base-content/60 bg-base-300 px-2 py-1 rounded w-fit">
                      {new Date(edu.start_date).getFullYear()} - {edu.is_current ? "Present" : new Date(edu.end_date).getFullYear()}
                    </span>
                  </div>
                  <h4 className="text-secondary font-medium">{edu.institution}</h4>
                  {edu.description && (
                    <p className="text-base-content/70 text-sm mt-2">{edu.description}</p>
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
