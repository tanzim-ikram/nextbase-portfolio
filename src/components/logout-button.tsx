"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
      className="btn btn-ghost justify-start text-base-content/60 hover:text-base-content mt-auto w-full" 
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </button>
  );
}
