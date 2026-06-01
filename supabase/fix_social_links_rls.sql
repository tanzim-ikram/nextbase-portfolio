-- FIX: Social Links RLS Bypass
-- The social_links table had RLS enabled with auth.role() = 'authenticated',
-- but the admin panel uses an anon key with bypass cookie, so writes were silently blocked.
-- Since site_settings has no RLS and this is a single-owner portfolio, we disable RLS here.

-- Option A (recommended for single-owner portfolio): Disable RLS entirely
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;

-- Option B (keep RLS but allow anon to write): Drop the old policy and allow all
-- DROP POLICY IF EXISTS "Auth full access social_links" ON social_links;
-- CREATE POLICY "Allow all social_links" ON social_links FOR ALL USING (true) WITH CHECK (true);
