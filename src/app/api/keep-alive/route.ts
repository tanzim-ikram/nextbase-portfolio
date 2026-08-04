import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * GET /api/keep-alive
 *
 * A lightweight health-check endpoint that performs a real query against the
 * Supabase `site_settings` table, preventing the free-tier project from being
 * paused due to inactivity.
 *
 * Can be pinged by external uptime monitors (e.g., UptimeRobot) as a backup
 * to the GitHub Actions cron job in `.github/workflows/keep-alive.yml`.
 */
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { status: "error", message: "Supabase environment variables are not configured." },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query the site_settings table — always has exactly 1 row, very lightweight.
    const { error } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      {
        status: "ok",
        message: "Supabase is alive.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        status: "error",
        message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
