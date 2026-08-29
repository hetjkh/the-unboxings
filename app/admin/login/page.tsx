"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/cms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Invalid password");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md border border-white/15 bg-black p-8">
        <p className="m-0 text-[10px] font-bold tracking-[0.18em] text-white/40 uppercase">The Unboxing</p>
        <h1 className="m-0 mt-3 text-3xl font-light uppercase">Admin Login</h1>
        <p className="m-0 mt-4 text-sm text-white/55">Manage products, solutions, categories and page hero images.</p>
        <label className="mt-8 grid gap-2 text-sm">
          <span className="text-white/70">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 border border-white/20 bg-transparent px-3 text-white"
            autoFocus
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 h-11 w-full bg-white text-xs font-bold text-black uppercase disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
