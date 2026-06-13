import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { FeaturedToggle } from "@/components/featured-toggle";
import { CategoryOrderManager } from "@/components/admin/category-order-manager";
import { Pencil } from "lucide-react";

export const revalidate = 0;

export default async function SkillsPage() {
  const supabase = await createClient();
  
  // 1. Fetch skills
  const { data: skills } = await supabase.from("skills").select("*").order("display_order", { ascending: true });
  
  // 2. Fetch category order settings
  const { data: categoriesData } = await supabase.from("skill_categories").select("*").order("display_order", { ascending: true });

  // 3. Build a map of category names to their display order
  const categoryOrdersMap = new Map<string, number>();
  categoriesData?.forEach((cat: any) => {
    categoryOrdersMap.set(cat.name, cat.display_order);
  });

  // 4. Get unique categories from current skills
  const uniqueCategoriesFromSkills = Array.from(new Set(skills?.map((s: any) => s.category) || []));

  // 5. Build full list of categories with orders to pass to the manager component
  const allCategories: { name: string; display_order: number }[] = [];
  
  // Add all categories from skill_categories table
  categoriesData?.forEach((cat: any) => {
    allCategories.push({ name: cat.name, display_order: cat.display_order });
  });

  // Add any categories from skills that aren't in skill_categories table
  uniqueCategoriesFromSkills.forEach((catName) => {
    if (!categoryOrdersMap.has(catName)) {
      const defaultOrder = 999;
      categoryOrdersMap.set(catName, defaultOrder);
      allCategories.push({ name: catName, display_order: defaultOrder });
    }
  });

  // Group skills by category
  const groupedSkills = skills?.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Sort categories by display_order, then alphabetically
  const sortedCategories = Object.keys(groupedSkills || {}).sort((a, b) => {
    const orderA = categoryOrdersMap.get(a) ?? 999;
    const orderB = categoryOrdersMap.get(b) ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-base-content/60">Manage your skills and group them by category.</p>
        </div>
        <Link href="/admin/skills/new" className="btn btn-primary">Add Skill</Link>
      </div>

      {allCategories.length > 0 && (
        <CategoryOrderManager initialCategories={allCategories} />
      )}

      {!skills || skills.length === 0 ? (
        <div className="card bg-base-200 border border-base-300 py-12 text-center text-base-content/60">
          No skills found. Try adding some!
        </div>
      ) : (
        <div className="space-y-8">
          {sortedCategories.map((category) => {
            const catSkills = groupedSkills[category];
            return (
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-bold border-b border-base-300 pb-2">{category}</h2>
                <div className="overflow-x-auto border border-base-300 rounded-box">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Skill Name</th>
                        <th>Order</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catSkills.map((skill: any) => (
                        <tr key={skill.id}>
                          <td className="font-medium">{skill.name}</td>
                          <td>{skill.display_order}</td>
                          <td>
                            <FeaturedToggle id={skill.id} table="skills" initialFeatured={skill.is_featured} />
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/admin/skills/${skill.id}/edit`}
                                className="btn btn-ghost btn-xs"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </Link>
                              <DeleteButton id={skill.id} table="skills" title={skill.name} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
