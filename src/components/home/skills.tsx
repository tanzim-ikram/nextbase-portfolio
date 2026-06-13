import { createClient } from "@/utils/supabase/server";

export async function Skills() {
  const supabase = await createClient();
  
  // 1. Fetch featured skills
  const { data: skills } = await supabase.from("skills").select("*").eq("is_featured", true).order("display_order", { ascending: true });
  
  // 2. Fetch category order settings
  const { data: categoriesData } = await supabase.from("skill_categories").select("*").order("display_order", { ascending: true });

  // If no skills found in database, use fallback demo skills
  let groupedSkills: any = {};
  
  if (!skills || skills.length === 0) {
    groupedSkills = {
      "Design": [{ id: "1", name: "Figma" }, { id: "2", name: "UI/UX" }, { id: "3", name: "Wireframing" }, { id: "4", name: "Prototyping" }],
      "Development": [{ id: "5", name: "Next.js" }, { id: "6", name: "TypeScript" }, { id: "7", name: "Python" }, { id: "8", name: "React" }, { id: "9", name: "Node.js" }, { id: "10", name: "Tailwind CSS" }],
      "Tools & Backend": [{ id: "11", name: "Supabase" }, { id: "12", name: "PostgreSQL" }, { id: "13", name: "Git" }, { id: "14", name: "Docker" }, { id: "15", name: "Vercel" }],
    };
  } else {
    // Group skills by category
    groupedSkills = skills.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }

  // Build a map of category names to their display order
  const categoryOrdersMap = new Map<string, number>();
  categoriesData?.forEach((cat: any) => {
    categoryOrdersMap.set(cat.name, cat.display_order);
  });

  // Sort categories by display_order, then alphabetically
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    const orderA = categoryOrdersMap.get(a) ?? (a === "Design" ? 1 : a === "Development" ? 2 : a === "Tools & Backend" ? 3 : 999);
    const orderB = categoryOrdersMap.get(b) ?? (b === "Design" ? 1 : b === "Development" ? 2 : b === "Tools & Backend" ? 3 : 999);
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  return (
    <section id="skills" className="py-12 md:py-24">
      <div className="w-full mx-auto space-y-12">
        <h2 className="text-3xl font-bold tracking-tight text-center">My Skills</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {sortedCategories.map((category) => {
            const items = groupedSkills[category];
            return (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold border-b border-base-300 pb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill: any) => (
                    <span key={skill.id} className="badge badge-secondary badge-outline px-3 py-3 text-sm font-medium">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
