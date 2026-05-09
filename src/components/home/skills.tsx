export function Skills() {
  const skills = [
    { category: "Design", items: ["Figma", "UI/UX", "Wireframing", "Prototyping"] },
    { category: "Development", items: ["Next.js", "TypeScript", "Python", "React", "Node.js", "Tailwind CSS"] },
    { category: "Tools & Backend", items: ["Supabase", "PostgreSQL", "Git", "Docker", "Vercel"] },
  ];

  return (
    <section id="skills" className="py-12 md:py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold tracking-tight text-center">My Skills</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="space-y-4">
              <h3 className="text-xl font-semibold border-b border-base-300 pb-2">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="badge badge-secondary badge-outline px-3 py-3 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
