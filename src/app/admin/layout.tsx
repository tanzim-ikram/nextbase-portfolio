import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/10 p-6 flex flex-col gap-4">
        <h2 className="font-bold text-xl mb-4">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Overview</Link>
          <Link href="/admin/settings" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Site Settings</Link>
          <Link href="/admin/blog" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Blog Posts</Link>
          <Link href="/admin/projects" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Projects</Link>
          <Link href="/admin/media" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Media Gallery</Link>
          <Link href="/admin/experience" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Experience</Link>
          <Link href="/admin/education" className={buttonVariants({ variant: "ghost" }) + " justify-start"}>Education</Link>
        </nav>
        
        <div className="mt-auto flex flex-col">
          <LogoutButton />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
