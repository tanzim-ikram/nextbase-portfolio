import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("display_order", { ascending: true });

  const cookieStore = await cookies();
  const rawCookie = cookieStore.get("nextbase-social-links")?.value;
  let cookieLinks = null;
  try {
    cookieLinks = rawCookie ? JSON.parse(decodeURIComponent(rawCookie)) : null;
  } catch { cookieLinks = "PARSE_ERROR"; }

  return NextResponse.json({ db: { data, error }, cookie: cookieLinks }, { status: 200 });
}
