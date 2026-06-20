-- ==============================================================================
-- NEXTBASE PORTFOLIO: SECURITY & RLS FIXES
-- Copy and paste this entirely into your Supabase SQL Editor and click RUN
-- ==============================================================================

-- 1. Fix "Function Search Path Mutable" Warning
-- Ensures the function runs securely in the public schema context.
ALTER FUNCTION public.increment_view_count(UUID) SET search_path = public;

-- 2. Fix "Public Can Execute SECURITY DEFINER Function" Warnings
-- Revokes execution of the potentially dangerous auto-enable function from unauthorized users
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'rls_auto_enable') THEN
    REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
    REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
  END IF;
END $$;

-- 3. Fix "Public Bucket Allows Listing" Warning
-- Restricts listing the storage bucket to authenticated admin users only.
-- Note: Public visitors can still download/view images via getPublicUrl().
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'portfolio_media');

-- 4. Enable RLS on newly configured tables
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 5. Drop any existing policies on these tables to avoid duplicates
DROP POLICY IF EXISTS "Public read access for skills" ON skills;
DROP POLICY IF EXISTS "Public read access for social_links" ON social_links;
DROP POLICY IF EXISTS "Public read access for media" ON media;
DROP POLICY IF EXISTS "Public read access for services" ON services;

DROP POLICY IF EXISTS "Auth full access skills" ON skills;
DROP POLICY IF EXISTS "Auth full access social_links" ON social_links;
DROP POLICY IF EXISTS "Auth full access media" ON media;
DROP POLICY IF EXISTS "Auth full access services" ON services;

-- 6. Re-create correct RLS Policies for Publicly Visible Tables
-- Allows anyone to read them, but only logged-in Admin can edit them.
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for social_links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);

CREATE POLICY "Auth full access skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- 7. Re-create correct RLS Policies for Admin-Only Tables
-- Media gallery tracking data is only used in the Admin Dashboard, so we restrict it completely.
CREATE POLICY "Auth full access media" ON media FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- DONE.
-- Remember to manually fix the "Leaked Password Protection Disabled" warning 
-- via Supabase Dashboard -> Authentication -> Providers -> Email.
-- ==============================================================================
