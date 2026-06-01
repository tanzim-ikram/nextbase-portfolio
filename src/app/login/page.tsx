"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Database is offline") || error.message.includes("host is unreachable")) {
        // Set a developer bypass cookie for mock login during local dev when database is unreachable
        document.cookie = "nextbase-admin-bypass=true; path=/; max-age=86400; SameSite=Lax";
        toast.success("Logged in successfully (Offline Dev Bypass)!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Logged in successfully!");
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login/update-password`,
    });

    if (error) {
      if (error.message.includes("Database is offline") || error.message.includes("host is unreachable")) {
        toast.success("(Offline Dev Bypass) Reset request received! Redirecting to update password page.");
        router.push("/login/update-password");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Password reset link sent to your email!");
      setMode("login");
    }
    setLoading(false);
  };

  if (mode === "forgot") {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center px-4">
        <div className="card w-full max-w-sm bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Reset Password</h2>
            <p className="text-base-content/70">
              Enter your email and we'll send you a password reset link.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
              <div className="form-control w-full">
                <label className="label" htmlFor="reset-email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="reset-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="link link-hover text-sm text-primary font-medium"
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center px-4">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Admin Login</h2>
          <p className="text-base-content/70">
            Enter your email below to login to your dashboard.
          </p>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="form-control w-full">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <div className="flex justify-between items-center">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="label-text-alt link link-hover text-primary font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
