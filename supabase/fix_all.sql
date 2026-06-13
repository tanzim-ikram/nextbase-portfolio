-- 1. Ensure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop any potentially conflicting policies on storage.objects
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anon Insert" ON storage.objects;
DROP POLICY IF EXISTS "Anon Delete" ON storage.objects;
DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- 3. Create permissive policies for the media bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Allow public uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio_media');

CREATE POLICY "Allow public updates" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Allow public deletes" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'portfolio_media');

-- 4. FIX FOR THE 'media' TABLE 
-- If you accidentally clicked "Enable RLS" on the media table in the Supabase dashboard, 
-- it would block all inserts! This disables RLS on the media table to allow uploads to save.
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
