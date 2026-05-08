# NextBase Portfolio

A professional portfolio template built with Next.js 15, Supabase, Tailwind CSS, and shadcn/ui.

## Quick Start

1. **Database Setup**: 
   - Open your Supabase project dashboard.
   - Navigate to the SQL Editor.
   - Copy the contents of `supabase/schema.sql` from this project and run it in the SQL Editor to initialize your database schema.

2. **Environment Variables**:
   - Create a `.env.local` file at the root of the project.
   - Add your Supabase URL, Anon Key, and Admin Email:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ADMIN_EMAIL=your-email@example.com
     ```

3. **Development**:
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the local development server.
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Protected `/admin` routes restricted to specific emails using Supabase Middleware.
- Built-in Dark Mode theme via shadcn/ui.
- Pre-configured `siteConfig` for easy profile updates.
