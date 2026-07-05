"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Invalid credentials.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl glass-dark p-8">
        <h1 className="font-display text-2xl text-paper">Admin Login</h1>
        <p className="mt-1 text-sm text-paper/50">Dupha Prints dashboard</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-paper/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-sm text-paper focus:border-cyan focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-paper/50">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-sm text-paper focus:border-cyan focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-press-red">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-full bg-cyan py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-cyan-light disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </section>
  );
}
