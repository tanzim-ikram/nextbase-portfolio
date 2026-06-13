"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PublishToggle({ id, table, initialStatus }: { id: string | number, table: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleToggle = async () => {
    const newStatus = status === "published" ? "draft" : "published";
    setIsLoading(true);

    const { error } = await supabase.from(table).update({ status: newStatus }).eq("id", id);

    if (error) {
      toast.error(`Error updating status: ${error.message}`);
    } else {
      setStatus(newStatus);
      toast.success(`Item ${newStatus === "published" ? "published" : "unpublished"} successfully`);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <input 
        type="checkbox" 
        className="toggle toggle-primary toggle-sm" 
        checked={status === "published"} 
        onChange={handleToggle}
        disabled={isLoading}
        title={status === "published" ? "Unpublish" : "Publish"}
      />
      <span className={`badge badge-sm ${status === "published" ? "badge-primary" : "badge-neutral"}`}>
        {status}
      </span>
    </div>
  );
}
