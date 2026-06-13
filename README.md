# NextBase Portfolio

A modern, highly customizable developer portfolio and CMS template. Built with Next.js 15, Supabase, Tailwind CSS, and shadcn/ui. 

It comes with a fully-featured Admin Dashboard right out of the box, allowing you to manage your blog posts, projects, skills, publications, and site settings without touching code.

## 🚀 Features

- **Dynamic Admin Dashboard**: Manage your content (Blog, Projects, Skills, Media) via a protected `/admin` route.
- **Built-in CMS**: Write and publish rich-text blog posts.
- **Media Gallery**: Upload and manage images directly to Supabase Storage.
- **Customizable UI**: Fully responsive, dark-mode ready (via daisyUI/shadcn).
- **Offline Dev Fallbacks**: Built-in mock data strategies so you can work locally even if the database is unreachable.
- **E2E Testing**: Pre-configured Playwright test suite.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database & Auth:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS & DaisyUI
- **Icons:** Lucide React
- **Testing:** Playwright

---

## 🚦 Quick Start Guide

Follow these steps to get your portfolio up and running locally.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nextbase-portfolio.git
cd nextbase-portfolio
npm install
```

### 2. Set up Supabase
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open the `supabase/schema.sql` file from this repository, copy its entire contents, and run it in the SQL Editor. 
   *(This script will create all necessary tables, set up Row Level Security (RLS), configure storage buckets, and insert default dummy data).*

### 3. Configure Environment Variables
Create a `.env.local` file in the root of the project and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_EMAIL=your-email@example.com
```
*Note: The `ADMIN_EMAIL` is used to restrict access to the `/admin` dashboard. Make sure this matches the email you use to sign in.*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see your live portfolio!

### 5. Create Your Admin User & Login
Since this is a private CMS, public sign-ups are not available. You must create your admin user directly in Supabase.

1. Go to your Supabase Project Dashboard -> **Authentication** -> **Users**.
2. Click **Add User** -> **Create New User** (Disable "Auto Confirm User" if you haven't set up email sending yet, or manually verify the user row).
3. Enter the **exact email** you set as `ADMIN_EMAIL` in your `.env.local` and a secure password.
4. Now, navigate to [http://localhost:3000/login](http://localhost:3000/login) in your local app.
5. Login with the credentials you just created to access the `/admin` dashboard and start customizing your site content!

*(Note: If you run into database connection issues locally, the template has a built-in offline dev bypass that grants access to the dashboard using cookies so you can still preview the UI).*

---

## 🧪 Testing

This template includes Playwright for End-to-End testing.

```bash
# Run all tests
npm run test:e2e

# View the test report
npx playwright show-report
```

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
Don't forget to add your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `ADMIN_EMAIL` to your Vercel Environment Variables before deploying.

---

## License
MIT License. Feel free to use, modify, and distribute this template as you see fit.
