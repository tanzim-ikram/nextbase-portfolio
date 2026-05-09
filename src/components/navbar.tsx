import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { siteConfig } from "@/config/site"
import { createClient } from "@/utils/supabase/server"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Publications", href: "/#publications" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#connect" },
];

export async function Navbar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
      <div className="container flex h-14 items-center mx-auto px-4 max-w-7xl">

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center font-bold shrink-0">
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium flex-1 overflow-x-auto">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1.5 rounded-lg transition-colors hover:bg-base-200 hover:text-primary text-base-content/70 whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <ThemeToggle />
          {session ? (
            <Link href="/admin" className="btn btn-ghost btn-sm">Dashboard</Link>
          ) : (
            <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
          )}
        </div>

        {/* Mobile logo (when nav hidden) */}
        <div className="md:hidden flex-1 flex justify-center">
          <Link href="/" className="font-bold">{siteConfig.name}</Link>
        </div>

      </div>

      {/* Mobile nav — horizontal scroll row */}
      <div className="md:hidden border-t border-base-300 overflow-x-auto">
        <nav className="flex items-center px-4 py-2 gap-1 text-sm font-medium w-max">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1 rounded-lg transition-colors hover:bg-base-200 hover:text-primary text-base-content/70 whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
