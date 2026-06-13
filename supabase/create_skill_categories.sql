-- Create the skill_categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable Row Level Security on skill_categories to ensure client-side admin operations succeed
ALTER TABLE skill_categories DISABLE ROW LEVEL SECURITY;

-- Seed default categories with orders
INSERT INTO skill_categories (name, display_order) VALUES
('Design', 1),
('Development', 2),
('Tools & Backend', 3)
ON CONFLICT (name) DO UPDATE SET display_order = EXCLUDED.display_order;

-- Force schema reload cache
NOTIFY pgrst, 'reload schema';
