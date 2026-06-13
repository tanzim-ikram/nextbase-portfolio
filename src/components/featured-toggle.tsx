"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

export function FeaturedToggle({ id, table, initialFeatured }: { id: string | number, table: string, initialFeatured: boolean }) {
  const [isFeatured, setIsFeatured] = useState(initialFeatured);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleToggle = async () => {
    const newValue = !isFeatured;
    setIsLoading(true);

    const { error } = await supabase.from(table).update({ is_featured: newValue }).eq("id", id);

    if (error) {
      toast.error(`Error updating featured status: ${error.message}`);
    } else {
      setIsFeatured(newValue);
      toast.success(`Project ${newValue ? "featured" : "unfeatured"} successfully`);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <input 
        type="checkbox" 
        className="toggle toggle-primary toggle-sm" 
        checked={isFeatured} 
        onChange={handleToggle}
        disabled={isLoading}
        title={isFeatured ? "Remove from featured" : "Make featured"}
      />
      {isFeatured ? (
        <div className="badge badge-primary badge-sm gap-1">
          <CheckCircle2 className="w-3 h-3" /> Yes
        </div>
      ) : (
        <div className="badge badge-ghost badge-sm gap-1 text-base-content/60">
          <XCircle className="w-3 h-3" /> No
        </div>
      )}
    </div>
  );
}
