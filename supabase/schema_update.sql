-- NEXTBASE PORTFOLIO: UPDATE SCHEMA
-- Run this in your Supabase SQL Editor to add the missing tables for Experience, Education, and Social Links.

-- 8. EXPERIENCE
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

-- 9. EDUCATION
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

-- 10. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Link',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS
DROP POLICY IF EXISTS "Public read access for experience" ON experience;
CREATE POLICY "Public read access for experience" ON experience FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for education" ON education;
CREATE POLICY "Public read access for education" ON education FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for social_links" ON social_links;
CREATE POLICY "Public read access for social_links" ON social_links FOR SELECT USING (true);

-- AUTH FULL ACCESS
DROP POLICY IF EXISTS "Auth full access experience" ON experience;
CREATE POLICY "Auth full access experience" ON experience FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth full access education" ON education;
CREATE POLICY "Auth full access education" ON education FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth full access social_links" ON social_links;
CREATE POLICY "Auth full access social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');

-- 11. PUBLICATIONS
CREATE TABLE IF NOT EXISTS publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  date DATE,
  url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for publications" ON publications;
CREATE POLICY "Public read access for publications" ON publications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth full access publications" ON publications;
CREATE POLICY "Auth full access publications" ON publications FOR ALL USING (auth.role() = 'authenticated');
