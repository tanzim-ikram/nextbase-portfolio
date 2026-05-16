-- Add logo_url to site_settings table
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
