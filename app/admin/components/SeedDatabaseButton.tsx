"use client";

import { useState } from "react";

export default function SeedDatabaseButton() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSeed() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/catalog", { method: "POST" });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Seed failed");
      }
      setMessage(data.message ?? "Done");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Seed failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border border-black/10 bg-white p-6">
      <h3 className="m-0 text-lg font-medium">First-time setup</h3>
      <p className="m-0 mt-2 text-sm text-black/60">
        If this is a fresh database, import your current products, categories, solutions and hero images from the existing site data.
      </p>
      <button
        type="button"
        onClick={handleSeed}
        disabled={loading}
        className="mt-4 h-10 border border-black bg-black px-5 text-xs font-bold text-white uppercase disabled:opacity-60"
      >
        {loading ? "Importing..." : "Import existing site data"}
      </button>
      {message ? <p className="m-0 mt-3 text-sm text-black/70">{message}</p> : null}
    </section>
  );
}
