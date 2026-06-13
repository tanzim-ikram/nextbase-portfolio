-- 1. Add the is_featured column to the skills table if it doesn't exist
ALTER TABLE skills ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT true;

-- 2. Disable Row Level Security on skills table to ensure the client can update it
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;

-- 3. Force PostgREST to reload the schema cache so it detects the new column immediately
NOTIFY pgrst, 'reload schema';
