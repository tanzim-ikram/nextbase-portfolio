"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export function Footer({ name }: { name?: string }) {
  const pathname = usePathname();

  // Hide footer on all admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="w-full border-t border-base-300 bg-base-100 py-8 mt-12">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-base-content/60 text-sm">
          © {new Date().getFullYear()} {name || siteConfig.name}. All rights reserved.
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/privacy" className="transition-colors hover:text-primary text-base-content/70 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-primary text-base-content/70 hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
