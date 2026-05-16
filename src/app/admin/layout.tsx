import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { LayoutDashboard } from "lucide-react";

import { createClient } from "@/utils/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("logo_url").eq("id", 1).single();

  return (
    <div className="flex flex-col min-h-screen bg-base-100">

      {/* Dashboard Header - Fixed at top, similar to navbar but distinct */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 h-14 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={`${siteConfig.name} Logo`} className="h-8 w-auto object-contain" />
          ) : (
            <>
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-primary-content" />
              </div>
              <span className="font-bold text-base">{siteConfig.name} — Admin</span>
            </>
          )}
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>

      {/* Body with sidebar and main content */}
      <div className="flex flex-1 pt-14">

        {/* Sidebar - Fixed to left, matching original design */}
        <aside className="fixed left-0 top-14 bottom-0 w-64 border-r border-base-300 bg-base-500 p-6 flex flex-col gap-4 z-10 overflow-y-auto">
          <h2 className="font-bold text-2xl mb-2 text-primary tracking-tight">Dashboard</h2>
          <ul className="menu menu-md w-full p-0 gap-1">
            <li><Link href="/admin" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Overview</Link></li>
            <li><Link href="/admin/blog" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Blog Posts</Link></li>
            <li><Link href="/admin/projects" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Projects</Link></li>
            <li><Link href="/admin/media" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Media Gallery</Link></li>
            <li><Link href="/admin/experience" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Experience</Link></li>
            <li><Link href="/admin/education" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Education</Link></li>
            <li><Link href="/admin/publications" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Publications</Link></li>
            <li><Link href="/admin/profile" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Profile Settings</Link></li>
            <li><Link href="/admin/settings" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Site Settings</Link></li>
          </ul>
        </aside>

        {/* Main content - Takes up remaining space, scrollable within its bounds */}
        <main className="flex-1 ml-64 p-8 bg-base-100 min-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
