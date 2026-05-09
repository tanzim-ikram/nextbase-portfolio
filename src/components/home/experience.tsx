import { createClient } from "@/utils/supabase/server";
import { Briefcase } from "lucide-react";

export async function Experience() {
  const supabase = await createClient();
  const { data: experiences } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-12 md:py-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold tracking-tight text-center">Experience</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-base-300 before:to-transparent">
          {experiences.map((exp: any, index: number) => (
            <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-base-100 bg-primary text-primary-content shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase className="w-4 h-4" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card bg-base-200 shadow-sm border border-base-300 hover:shadow-md transition-all">
                <div className="card-body p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm font-medium text-base-content/60 bg-base-300 px-2 py-1 rounded">
                      {new Date(exp.start_date).getFullYear()} - {exp.is_current ? "Present" : new Date(exp.end_date).getFullYear()}
                    </span>
                  </div>
                  <h4 className="text-primary font-medium mb-3">{exp.company}</h4>
                  {exp.description && (
                    <p className="text-base-content/70 text-sm whitespace-pre-wrap">{exp.description}</p>
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
