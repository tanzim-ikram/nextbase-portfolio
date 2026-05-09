import { createClient } from "@/utils/supabase/server";
import * as Icons from "lucide-react";

export async function Services() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-12 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Services</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          // @ts-ignore
          const Icon = Icons[service.icon_name] || Icons.Layout;
          return (
            <div key={service.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="text-base-content/70">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
