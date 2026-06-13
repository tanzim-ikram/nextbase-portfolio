"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowUp, ArrowDown, Save, ListOrdered } from "lucide-react";

export interface CategoryOrderItem {
  name: string;
  display_order: number;
}

export function CategoryOrderManager({ 
  initialCategories 
}: { 
  initialCategories: CategoryOrderItem[] 
}) {
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState<CategoryOrderItem[]>(() => 
    [...initialCategories].sort((a, b) => a.display_order - b.display_order)
  );
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOrderChange = (name: string, newOrder: number) => {
    const updated = categories.map(cat => 
      cat.name === name ? { ...cat, display_order: newOrder } : cat
    );
    setCategories(updated.sort((a, b) => a.display_order - b.display_order));
  };

  const moveCategory = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === categories.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newCategories = [...categories];
    
    // Swap display orders
    const tempOrder = newCategories[index].display_order;
    newCategories[index].display_order = newCategories[targetIndex].display_order;
    newCategories[targetIndex].display_order = tempOrder;

    // If display orders were equal or invalid, assign sequential ones
    if (newCategories[index].display_order === newCategories[targetIndex].display_order) {
      newCategories[index].display_order = index + (direction === "up" ? -1 : 1);
      newCategories[targetIndex].display_order = index;
    }

    setCategories(newCategories.sort((a, b) => a.display_order - b.display_order));
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Upsert all categories to the skill_categories table
    const { error } = await supabase
      .from("skill_categories")
      .upsert(
        categories.map(cat => ({
          name: cat.name,
          display_order: cat.display_order
        })),
        { onConflict: "name" }
      );

    if (error) {
      toast.error(`Error saving category orders: ${error.message}`);
    } else {
      toast.success("Category display orders saved successfully!");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-200/50 rounded-box shadow-sm">
      <input 
        type="checkbox" 
        checked={isOpen} 
        onChange={() => setIsOpen(!isOpen)} 
      /> 
      <div className="collapse-title text-lg font-semibold flex items-center gap-2">
        <ListOrdered className="w-5 h-5 text-primary" />
        <span>Sort Skill Categories display position</span>
      </div>
      <div className="collapse-content">
        <div className="pt-2 pb-4 space-y-4">
          <p className="text-sm text-base-content/70">
            Define the display order of categories on your home page. Lower numbers appear first. Use the Up/Down buttons or input values directly.
          </p>

          <div className="space-y-2 max-w-2xl">
            {categories.map((cat, idx) => (
              <div 
                key={cat.name} 
                className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-lg shadow-sm hover:border-base-content/20 transition-all"
              >
                <span className="font-semibold text-base-content">{cat.name}</span>
                
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => moveCategory(idx, "up")}
                    disabled={idx === 0 || loading}
                    className="btn btn-sm btn-ghost btn-circle"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => moveCategory(idx, "down")}
                    disabled={idx === categories.length - 1 || loading}
                    className="btn btn-sm btn-ghost btn-circle"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  
                  <input 
                    type="number"
                    value={cat.display_order}
                    onChange={(e) => handleOrderChange(cat.name, parseInt(e.target.value) || 0)}
                    disabled={loading}
                    className="input input-bordered input-sm w-20 text-center font-medium"
                    title="Display position order"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn btn-primary gap-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Category Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
