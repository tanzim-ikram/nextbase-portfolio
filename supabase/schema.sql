-- NEXTBASE PORTFOLIO: MASTER SCHEMA
-- Run this in your Supabase SQL Editor to initialize your database.

-- 1. SITE SETTINGS (Controls Visibility & Global Text)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT DEFAULT 'Hi, I am a Developer',
  hero_subtitle TEXT DEFAULT 'Building digital experiences with Next.js and Supabase',
  logo_url TEXT,
  about_text TEXT,
  name TEXT DEFAULT 'Your Name',
  bio TEXT DEFAULT 'A passionate full-stack developer and UI/UX designer building beautiful and functional digital experiences.',
  github_url TEXT DEFAULT 'https://github.com/yourusername',
  twitter_url TEXT DEFAULT 'https://twitter.com/yourusername',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/yourusername',
  email TEXT DEFAULT 'hello@example.com',
  show_services BOOLEAN DEFAULT true,
  show_projects BOOLEAN DEFAULT true,
  show_experience BOOLEAN DEFAULT true,
  show_education BOOLEAN DEFAULT true,
  show_publications BOOLEAN DEFAULT true,
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 2. BLOG POSTS
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB,
  excerpt TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'draft',
  view_count INTEGER DEFAULT 0,
  reading_time TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
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
CREATE TABLE IF NOT EXISTS publications (
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
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'Layout',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- 6. MEDIA GALLERY TRACKING
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. EXPERIENCE
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. EDUCATION
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Link',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. SKILL CATEGORIES
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. ANALYTICS FUNCTION
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 13. STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Auth Insert" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'portfolio_media');

CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Auth Update" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'portfolio_media');

-- ENABLE RLS & PUBLIC READ ACCESS ON ALL TABLES
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Note: site_settings, and skill_categories are intentionally left without RLS 
-- or have it disabled to allow client-side admin actions during local dev.
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories DISABLE ROW LEVEL SECURITY;

-- DROP ALL EXISTING POLICIES TO PREVENT DUPLICATES ON RE-RUN
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename IN ('posts', 'projects', 'publications', 'services', 'experience', 'education', 'media', 'skills', 'social_links')
  )
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.' || r.tablename;
  END LOOP;
END
$$;

-- PUBLIC READ ACCESS
CREATE POLICY "Public read access for posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for publications" ON publications FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read access for education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for social_links" ON social_links FOR SELECT USING (true);

-- AUTH FULL ACCESS (Authenticated Admin can do everything)
CREATE POLICY "Auth full access posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access publications" ON publications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access experience" ON experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access education" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access media" ON media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');

-- SEED DATA
-- Seed default categories with orders
INSERT INTO skill_categories (name, display_order) VALUES
('Design', 1),
('Development', 2),
('Tools & Backend', 3)
ON CONFLICT (name) DO UPDATE SET display_order = EXCLUDED.display_order;

-- Seed default skills
INSERT INTO skills (name, category, display_order) VALUES 
('Figma', 'Design', 1),
('UI/UX', 'Design', 2),
('Wireframing', 'Design', 3),
('Prototyping', 'Design', 4),
('Next.js', 'Development', 1),
('TypeScript', 'Development', 2),
('Python', 'Development', 3),
('React', 'Development', 4),
('Node.js', 'Development', 5),
('Tailwind CSS', 'Development', 6),
('Supabase', 'Tools & Backend', 1),
('PostgreSQL', 'Tools & Backend', 2),
('Git', 'Tools & Backend', 3),
('Docker', 'Tools & Backend', 4),
('Vercel', 'Tools & Backend', 5)
ON CONFLICT DO NOTHING;

-- Force schema reload cache
NOTIFY pgrst, 'reload schema';
