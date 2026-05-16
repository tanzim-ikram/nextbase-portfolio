import { createClient } from "@/utils/supabase/server";
import { Briefcase } from "lucide-react";

const DUMMY_EXPERIENCES = [
  {
    id: "1",
    position: "Senior Frontend Developer",
    company: "Tech Company Inc.",
    start_date: "2023-01-01",
    end_date: null,
    is_current: true,
    description: "Leading the frontend architecture and development of the company's flagship product. Collaborating with cross-functional teams to deliver high-quality user experiences.",
  },
  {
    id: "2",
    position: "Full Stack Developer",
    company: "Startup Studio",
    start_date: "2021-06-01",
    end_date: "2022-12-31",
    is_current: false,
    description: "Built and maintained multiple client-facing web applications. Worked closely with designers and product managers to ship features on time.",
  },
];

export async function Experience() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });

  const experiences = (data && data.length > 0) ? data : DUMMY_EXPERIENCES;

  return (
    <section id="experience" className="py-12 md:py-24">
      <div className="w-full mx-auto space-y-10">
        <h2 className="text-3xl font-bold tracking-tight text-center">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp: any) => (
            <div key={exp.id} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{exp.position}</h3>
                      <p className="text-primary font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                  </div>
                  <span className="badge badge-outline text-base-content/60 whitespace-nowrap shrink-0">
                    {new Date(exp.start_date).getFullYear()} – {exp.is_current ? "Present" : new Date(exp.end_date).getFullYear()}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-base-content/70 text-sm mt-4 leading-relaxed pl-15">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
