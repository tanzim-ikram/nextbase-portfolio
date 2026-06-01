-- NEXTBASE PORTFOLIO: MASTER SCHEMA
-- Run this in your Supabase SQL Editor to initialize your database.

-- 1. SITE SETTINGS (Controls Visibility & Global Text)
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT DEFAULT 'Hi, I am a Developer',
  hero_subtitle TEXT DEFAULT 'Building digital experiences with Next.js and Supabase',
  logo_url TEXT,
  about_text TEXT,
  show_services BOOLEAN DEFAULT true,
  show_projects BOOLEAN DEFAULT true,
  show_experience BOOLEAN DEFAULT true,
  show_education BOOLEAN DEFAULT true,
  show_publications BOOLEAN DEFAULT true,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed initial settings
INSERT INTO site_settings (id, hero_title) VALUES (1, 'Welcome to my Portfolio')
ON CONFLICT (id) DO NOTHING;

-- 2. BLOG POSTS
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB, -- Storing Tiptap JSON
  excerpt TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'draft', -- 'draft' or 'published'
  view_count INTEGER DEFAULT 0,
  reading_time TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECTS
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content JSONB,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PUBLICATIONS
CREATE TABLE publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  journal TEXT,
  publisher TEXT,
  publish_year TEXT,
  description TEXT,
  url TEXT,
  highlight_author TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SERVICES
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'Layout', -- Lucide icon names
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- 6. MEDIA GALLERY TRACKING
CREATE TABLE media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ANALYTICS FUNCTION
-- Function to safely increment view counts for blog posts
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- 8. STORAGE BUCKET
-- Create the portfolio_media bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
-- Allow public viewing
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio_media');

-- Allow authenticated uploads
CREATE POLICY "Auth Insert" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'portfolio_media');

-- Allow authenticated deletes
CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'portfolio_media');
