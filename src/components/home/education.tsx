import { createClient } from "@/utils/supabase/server";
import { GraduationCap } from "lucide-react";

const DUMMY_EDUCATION = [
  {
    id: "1",
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Your University Name",
    start_date: "2019-01-01",
    end_date: null,
    is_current: true,
    description: "Focusing on software engineering, algorithms, and data structures. Actively involved in research groups and extracurricular tech activities.",
  },
];

export async function Education() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false });

  const education = (data && data.length > 0) ? data : DUMMY_EDUCATION;

  return (
    <section id="education" className="py-12 md:py-24">
      <div className="max-w-3xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold tracking-tight text-center">Education</h2>
        <div className="grid gap-6">
          {education.map((edu: any) => (
            <div key={edu.id} className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 text-secondary shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <span className="badge badge-outline text-base-content/60 whitespace-nowrap">
                        {new Date(edu.start_date).getFullYear()} – {edu.is_current ? "Present" : new Date(edu.end_date).getFullYear()}
                      </span>
                    </div>
                    <p className="text-secondary font-medium text-sm">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-base-content/70 text-sm mt-3 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
