import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { PublicLayout } from "@/components/public-layout";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { createClient } from "@/utils/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const { data: settings } = await supabase.from("site_settings").select("name, bio").eq("id", 1).single();
    return {
      title: settings?.name || siteConfig.name,
      description: settings?.bio || siteConfig.bio,
    };
  } catch (e) {
    return {
      title: siteConfig.name,
      description: siteConfig.bio,
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("name").eq("id", 1).single();
    settings = data;
  } catch (e) {
    // Graceful fallback
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme') || 'dracula';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <PublicLayout navbar={<Navbar />} footer={<Footer name={settings?.name} />}>
            {children}
          </PublicLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
