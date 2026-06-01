"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

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

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.522 3.545 12 3.545 12 3.545s-7.522 0-9.387.507a3.003 3.003 0 00-2.11 2.11C0 8.028 0 12 0 12s0 3.972.503 5.837a3.003 3.003 0 002.11 2.11c1.865.507 9.387.507 9.387.507s7.522 0 9.387-.507a3.003 3.003 0 002.11-2.11C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const GlobeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const WechatIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8.28 2c-4.418 0-8 3.093-8 6.908 0 2.215 1.207 4.185 3.084 5.393-.16.516-.653 1.916-.713 2.115-.09.303.09.283.376.195.4-.124 2.235-.875 2.946-1.168.742.235 1.547.373 2.307.373.468 0 .914-.047 1.345-.125-.333-.941-.515-1.956-.515-3.02 0-4.108 3.52-7.439 7.863-7.439.467 0 .927.042 1.365.118C22.257 4.093 18.067 2 13.567 2 11.675 2 9.901 2.37 8.28 3zM6.13 6.438a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4.28 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4.316 4.966c-3.682 0-6.666 2.578-6.666 5.757 0 1.846 1.006 3.488 2.57 4.494-.133.43-.544 1.597-.594 1.763-.075.253.075.236.313.163.333-.103 1.862-.73 2.455-.974.618.196 1.29.31 1.922.31 3.682 0 6.667-2.577 6.667-5.756 0-3.18-2.985-5.757-6.667-5.757zm-2.14 2.878a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm3.57 0a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666z"/>
  </svg>
);

const WhatsappIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.004 0C5.378 0 .012 5.366.012 11.992c0 2.118.553 4.185 1.603 6.002L.022 24l6.155-1.615c1.762.96 3.738 1.468 5.748 1.468 6.625 0 11.992-5.366 11.992-11.992C23.996 5.366 18.63 0 12.004 0zm5.79 16.918c-.24.673-1.218 1.29-1.674 1.343-.448.053-.984.077-1.615-.125-.39-.125-.884-.302-1.503-.568-2.637-1.134-4.346-3.812-4.478-3.99-.13-.177-1.066-1.423-1.066-2.716 0-1.292.673-1.927.91-2.185.24-.258.528-.323.704-.323.176 0 .352.001.505.008.163.007.382-.06.6.467.224.542.766 1.869.832 2.002.066.133.11.288.022.466-.088.177-.132.288-.264.443-.133.155-.278.347-.397.466-.132.133-.271.278-.117.542.154.263.684 1.127 1.466 1.823.998.89 1.838 1.164 2.102 1.296.264.133.418.11.572-.066.154-.177.66-.766.836-1.026.177-.26.353-.22.595-.133.24.088 1.52.716 1.785.849.264.133.44.2.506.31.066.11.066.64-.174 1.313z"/>
  </svg>
);

const TelegramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16c-.18.72-.96 4.98-1.36 7.13-.17.91-.5 1.21-.82 1.24-.7.06-1.23-.46-1.91-.91-1.06-.69-1.66-1.12-2.69-1.8-1.19-.78-.42-1.21.26-1.92.18-.18 3.26-2.99 3.32-3.24.01-.03.01-.15-.06-.21-.07-.06-.17-.04-.25-.02-.11.02-1.87 1.19-5.28 3.49-.5.34-.95.51-1.35.5-.44-.01-1.29-.25-1.92-.45-.77-.25-1.39-.39-1.33-.82.03-.22.34-.45.93-.68 3.64-1.58 6.07-2.63 7.29-3.14 3.48-1.45 4.2-1.7 4.67-1.7.1 0 .33.03.48.15.13.1.17.24.19.34.02.09.03.29.01.42z"/>
  </svg>
);

const GoogleScholarIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 24a7 7 0 0 1-7-7c0-2.95 1.83-5.47 4.41-6.46L5 8.19v4.31H3V6.26l7.85-4.43c.73-.41 1.57-.41 2.3 0L21 6.26v6.24h-2V8.19l-4.41 2.35c2.58.99 4.41 3.51 4.41 6.46a7 7 0 0 1-7 7zM12 4.28L6.44 7.42 12 10.38l5.56-2.96L12 4.28zM12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
  </svg>
);

const ResearchgateIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 20V4h5a4 4 0 0 1 0 8H3m5 0l5 8"/>
    <path d="M20 10a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4v-2h-4"/>
  </svg>
);

const DiscordIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
  </svg>
);

const MediumIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const SubstackIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.881H22.54v2.839H1.46v-2.839zM1.46 16.356h21.08v4.808L12 16.356H1.46z"/>
  </svg>
);

export function ConnectMe({ settings, socialLinks }: { settings?: any, socialLinks?: any[] }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return GithubIcon;
      case "linkedin":
        return LinkedinIcon;
      case "twitter":
      case "twitter / x":
      case "x":
        return TwitterIcon;
      case "youtube":
        return YoutubeIcon;
      case "instagram":
        return InstagramIcon;
      case "facebook":
        return FacebookIcon;
      case "wechat":
        return WechatIcon;
      case "whatsapp":
        return WhatsappIcon;
      case "telegram":
        return TelegramIcon;
      case "google scholar":
      case "google scholars":
        return GoogleScholarIcon;
      case "research gate":
      case "researchgate":
        return ResearchgateIcon;
      case "discord":
        return DiscordIcon;
      case "medium":
        return MediumIcon;
      case "substack":
        return SubstackIcon;
      default:
        return GlobeIcon;
    }
  };

  const socials = (socialLinks || []).map(link => ({
    href: link.url,
    label: link.platform,
    Icon: getPlatformIcon(link.platform)
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with a real API call or mailto action
    await new Promise((r) => setTimeout(r, 1000));
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
                    <label className="label"><span className="label-text font-medium">Your Email</span></label>
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
                  <label className="label"><span className="label-text font-medium">Message</span></label>
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

        {/* Socials — below the form */}
        {socials.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-base-content/50 text-sm">Or find me on</span>
            <div className="flex gap-2">
              {socials.map(({ href, label, Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="btn btn-circle btn-ghost btn-sm hover:bg-base-300 tooltip"
                    data-tip={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ) : null
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
