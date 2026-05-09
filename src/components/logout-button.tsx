"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
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
      className="btn btn-ghost btn-sm text-base-content/60 hover:text-error hover:bg-error/10"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
