import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { NavLinks } from "./nav-links"
import { siteConfig } from "@/config/site"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { LogoutButton } from "./logout-button"

export async function Navbar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  const cookieStore = await cookies();
  const isBypassed = cookieStore.get("nextbase-admin-bypass")?.value === "true";
  const isLoggedIn = !!session || isBypassed;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "/#skills" },
    ...(settings?.show_experience !== false ? [{ label: "Experience", href: "/#experience" }] : []),
    ...(settings?.show_education !== false ? [{ label: "Education", href: "/#education" }] : []),
    ...(settings?.show_publications !== false ? [{ label: "Publications", href: "/#publications" }] : []),
    ...(settings?.show_services !== false ? [{ label: "Services", href: "/#services" }] : []),
    ...(settings?.show_projects !== false ? [{ label: "Projects", href: "/#projects" }] : []),
    { label: "Contact", href: "/#connect" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
      <div className="container flex h-14 items-center mx-auto px-4 max-w-7xl">

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center font-bold shrink-0 hover:opacity-85 transition-opacity">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={`${settings?.name || siteConfig.name} Logo`} className="h-8 w-auto object-contain" />
          ) : (
            settings?.name || siteConfig.name
          )}
        </Link>

        {/* Desktop nav */}
        <NavLinks 
          links={navLinks} 
          className="hidden md:flex items-center gap-1 text-sm font-medium flex-1 overflow-x-auto" 
          itemClassName="py-1.5"
        />

        <div className="flex items-center gap-2 ml-auto shrink-0">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <Link href="/admin" className="btn btn-primary btn-sm">Dashboard</Link>
              <LogoutButton className="btn btn-secondary btn-sm" />
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>

        {/* Mobile logo (when nav hidden) */}
        <div className="md:hidden flex-1 flex justify-center">
          <Link href="/" className="font-bold hover:opacity-85 transition-opacity">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt={`${settings?.name || siteConfig.name} Logo`} className="h-8 w-auto object-contain" />
            ) : (
              settings?.name || siteConfig.name
            )}
          </Link>
        </div>

      </div>

      {/* Mobile nav — horizontal scroll row */}
      <div className="md:hidden border-t border-base-300 overflow-x-auto">
        <NavLinks 
          links={navLinks} 
          className="flex items-center px-4 py-2 gap-1 text-sm font-medium w-max" 
          itemClassName="py-1"
        />
      </div>
    </header>
  )
}
