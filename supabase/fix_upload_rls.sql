-- Fix for Row-Level Security (RLS) upload errors when using the admin-bypass cookie
-- Run this in your Supabase SQL Editor

-- 1. Ensure the bucket exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Safely recreate Public Access
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio_media');

-- 3. Safely recreate Anon Insert
DROP POLICY IF EXISTS "Anon Insert" ON storage.objects;
CREATE POLICY "Anon Insert" 
ON storage.objects FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'portfolio_media');

-- 4. Safely recreate Anon Delete
DROP POLICY IF EXISTS "Anon Delete" ON storage.objects;
CREATE POLICY "Anon Delete" 
ON storage.objects FOR DELETE 
TO public 
USING (bucket_id = 'portfolio_media');
