import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-base-300 bg-base-200/50 p-6 flex flex-col gap-4 shadow-xl z-10">
        <h2 className="font-bold text-2xl mb-2 text-primary tracking-tight">Dashboard</h2>
        <ul className="menu menu-md w-full p-0 gap-1">
          <li><Link href="/admin" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Overview</Link></li>
          <li><Link href="/admin/settings" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Site Settings</Link></li>
          <li><Link href="/admin/blog" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Blog Posts</Link></li>
          <li><Link href="/admin/projects" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Projects</Link></li>
          <li><Link href="/admin/media" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Media Gallery</Link></li>
          <li><Link href="/admin/experience" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Experience</Link></li>
          <li><Link href="/admin/education" className="hover:bg-primary hover:text-primary-content transition-colors font-medium">Education</Link></li>
        </ul>
        
        <div className="mt-auto flex flex-col border-t border-base-300 pt-4">
          <LogoutButton />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-base-100">
        {children}
      </main>
    </div>
  );
}
