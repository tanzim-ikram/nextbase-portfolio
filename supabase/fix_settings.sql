-- FIX SITE SETTINGS
-- It appears the site_settings table was not seeded or RLS is preventing access.
-- Run this in your Supabase SQL Editor to fix the empty settings issue.

-- 1. Insert the default settings row
INSERT INTO site_settings (id, hero_title, hero_subtitle, show_services, show_projects, show_experience, show_education, show_publications)
VALUES (1, 'Hi, I am a Developer', 'Building digital experiences with Next.js and Supabase', true, true, true, true, true)
ON CONFLICT (id) DO NOTHING;

-- 2. Ensure RLS is enabled and policies are properly configured for the table
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access
DROP POLICY IF EXISTS "Public read access for site_settings" ON site_settings;
CREATE POLICY "Public read access for site_settings" ON site_settings FOR SELECT USING (true);

-- 4. Allow authenticated users to update the settings
DROP POLICY IF EXISTS "Auth full access site_settings" ON site_settings;
CREATE POLICY "Auth full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
