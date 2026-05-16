"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: { label: string; href: string }[];
  className?: string;
  itemClassName?: string;
}

export function NavLinks({ links, className, itemClassName }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {links.map(({ label, href }) => {
        // Active if exact match, or if it's a subpath (but not for home or hash links)
        const isActive = pathname === href || (
          href !== "/" && 
          !href.startsWith("/#") && 
          pathname.startsWith(href + "/")
        );
        
        return (
          <Link
            key={label}
            href={href}
            className={`px-3 rounded-lg transition-colors whitespace-nowrap ${
              isActive 
                ? "text-primary font-bold" 
                : "hover:text-primary text-base-content/70"
            } ${itemClassName || ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
