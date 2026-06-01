"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    // Clear development bypass cookie
    document.cookie = "nextbase-admin-bypass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <button
      className={className || "btn btn-ghost btn-sm text-base-content/60 hover:text-error hover:bg-error/10"}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
