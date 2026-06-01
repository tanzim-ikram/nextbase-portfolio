"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Send, CheckCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Map platform names → Iconify icon IDs
const PLATFORM_ICONS: Record<string, string> = {
  "github":          "mdi:github",
  "linkedin":        "mdi:linkedin",
  "twitter":         "mdi:twitter",
  "twitter / x":     "ri:twitter-x-fill",
  "x":               "ri:twitter-x-fill",
  "youtube":         "mdi:youtube",
  "instagram":       "mdi:instagram",
  "facebook":        "mdi:facebook",
  "wechat":          "mdi:wechat",
  "whatsapp":        "mdi:whatsapp",
  "telegram":        "mdi:telegram",
  "google scholar":  "mdi:school",
  "google scholars": "mdi:school",
  "researchgate":    "mdi:flask",
  "research gate":   "mdi:flask",
  "discord":         "mdi:discord",
  "medium":          "mdi:medium",
  "substack":        "mdi:email-newsletter",
  "website":         "mdi:web",
};

function getIcon(platform: string): string {
  return PLATFORM_ICONS[platform.toLowerCase()] ?? "mdi:web";
}

export function ConnectMe({
  settings,
  socialLinks: serverLinks,
}: {
  settings?: any;
  socialLinks?: any[];
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [socialLinks, setSocialLinks] = useState<any[]>(serverLinks || []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchSocialLinks() {
      try {
        // 1. Try live DB query
        const supabase = createClient();
        const { data, error } = await supabase
          .from("social_links")
          .select("platform, url, display_order")
          .order("display_order", { ascending: true });

        if (!error && data && data.length > 0) {
          setSocialLinks(data);
          setLoaded(true);
          return;
        }

        // 2. Fall back to cookie
        const cookieRaw = document.cookie
          .split(";")
          .map(c => c.trim())
          .find(c => c.startsWith("nextbase-social-links="))
          ?.slice("nextbase-social-links=".length);

        if (cookieRaw) {
          const parsed = JSON.parse(decodeURIComponent(cookieRaw));
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSocialLinks(parsed);
          }
        }
      } catch (err) {
        console.error("[ConnectMe] Failed to load social links:", err);
      }
      setLoaded(true);
    }

    fetchSocialLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1000));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="connect" className="py-12 md:py-24">
      <div className="w-full max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
          <p className="text-base-content/60 text-lg">
            Have a project in mind or just want to say hi? Fill in the form below.
          </p>
        </div>

        {/* Contact Form */}
        <div className="card bg-base-200 border border-base-300 shadow-sm">
          <div className="card-body p-6">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-base-content/60 max-w-sm">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button className="btn btn-ghost btn-sm mt-2" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Your Email</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="input input-bordered w-full"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <textarea
                    required
                    placeholder="Tell me about your project, idea, or question..."
                    className="textarea textarea-bordered w-full h-36 resize-none"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full gap-2"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Social icons — rendered after client-side fetch */}
        {loaded && socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-base-content/50 text-sm">Or find me on</span>
            <div className="flex gap-3">
              {socialLinks.map(link => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.platform}
                  title={link.platform}
                  className="btn btn-circle btn-ghost hover:bg-base-300 tooltip"
                  data-tip={link.platform}
                >
                  <Icon
                    icon={getIcon(link.platform)}
                    width={22}
                    height={22}
                  />
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
