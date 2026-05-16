"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id, table, title }: { id: string | number, table: string, title?: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${title || "this item"}?`)) {
      return;
    }

    setIsDeleting(true);
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      toast.error(`Error deleting: ${error.message}`);
    } else {
      toast.success("Item deleted successfully");
      router.refresh();
    }
    setIsDeleting(false);
  };

  return (
    <button 
      onClick={handleDelete} 
      className="btn btn-ghost btn-xs text-error"
      disabled={isDeleting}
      title="Delete"
    >
      {isDeleting ? <span className="loading loading-spinner loading-xs"></span> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
