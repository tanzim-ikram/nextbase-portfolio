-- 1. Create the skills table
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Seed initial skills based on the hardcoded default
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
