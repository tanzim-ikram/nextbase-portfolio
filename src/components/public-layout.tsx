"use client";

import { usePathname } from "next/navigation";

export function PublicLayout({ 
  children, 
  navbar, 
  footer 
}: { 
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}
