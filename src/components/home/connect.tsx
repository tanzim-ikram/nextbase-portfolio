"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Mail, Send, CheckCircle } from "lucide-react";

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export function ConnectMe() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with a real API call or mailto
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="connect" className="py-12 md:py-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Connect With Me</h2>
          <p className="text-base-content/60 text-lg">Got a project in mind? Let's talk.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — Info & Socials */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Let's build something great</h3>
              <p className="text-base-content/70 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a message or reach out on social media.
              </p>
            </div>

            <a href={`mailto:${siteConfig.links.email}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-base-content/80 group-hover:text-primary transition-colors">{siteConfig.links.email}</span>
            </a>

            <div className="flex gap-4 pt-2">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost hover:bg-base-300" aria-label="GitHub">
                <GithubIcon className="w-6 h-6" />
              </a>
              {siteConfig.links.twitter && (
                <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost hover:bg-base-300" aria-label="Twitter">
                  <TwitterIcon className="w-6 h-6" />
                </a>
              )}
              {siteConfig.links.linkedin && (
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost hover:bg-base-300" aria-label="LinkedIn">
                  <LinkedinIcon className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body p-6">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                  <CheckCircle className="w-14 h-14 text-success" />
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-base-content/60">Thanks for reaching out. I'll get back to you soon.</p>
                  <button className="btn btn-ghost btn-sm" onClick={() => setStatus("idle")}>Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Your Name</span></label>
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
                    <label className="label"><span className="label-text font-medium">Email Address</span></label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="input input-bordered w-full"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Message</span></label>
                    <textarea
                      required
                      placeholder="Tell me about your project..."
                      className="textarea textarea-bordered w-full h-32 resize-none"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full gap-2" disabled={status === "sending"}>
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
        </div>
      </div>
    </section>
  );
}
