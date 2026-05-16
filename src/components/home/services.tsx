import { createClient } from "@/utils/supabase/server";
import * as Icons from "lucide-react";

const DUMMY_SERVICES = [
  { id: "1", title: "UI/UX Design", description: "Crafting beautiful and intuitive interfaces using Figma, focusing on user research, wireframing, and prototyping.", icon_name: "Pen", display_order: 0, is_active: true },
  { id: "2", title: "Web Development", description: "Building fast, scalable web applications with Next.js, TypeScript, and modern backend services like Supabase.", icon_name: "Code2", display_order: 1, is_active: true },
  { id: "3", title: "API & Backend", description: "Designing robust REST and GraphQL APIs, database schemas, and serverless functions to power your applications.", icon_name: "Server", display_order: 2, is_active: true },
  { id: "4", title: "Consulting", description: "Providing technical guidance and architecture advice to help teams make the right decisions for their projects.", icon_name: "MessageSquare", display_order: 3, is_active: true },
  { id: "5", title: "Performance Optimization", description: "Auditing and improving web application performance — Lighthouse scores, bundle sizes, and database query tuning.", icon_name: "Zap", display_order: 4, is_active: true },
  { id: "6", title: "Deployment & DevOps", description: "Setting up CI/CD pipelines, Docker containers, and deploying applications on Vercel, AWS, and similar platforms.", icon_name: "Cloud", display_order: 5, is_active: true },
];

export async function Services() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const services = (data && data.length > 0) ? data : DUMMY_SERVICES;

  return (
    <section id="services" className="py-12 md:py-24">
      <div className="w-full mx-auto space-y-10">
        <h2 className="text-3xl font-bold tracking-tight text-center">Services</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => {
            // @ts-ignore
            const Icon = Icons[service.icon_name] || Icons.Layout;
            return (
              <div key={service.id} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="card-body p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="card-title text-base">{service.title}</h3>
                  <p className="text-base-content/70 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
