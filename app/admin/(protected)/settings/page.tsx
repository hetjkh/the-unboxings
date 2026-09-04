"use client";

import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { cmsFetch, TextField } from "../../components/AdminFields";
import type { SiteSettings } from "@/lib/cms/site-settings";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>({
    whatsappNumber: "",
    phoneNumber: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await cmsFetch<SiteSettings>("/api/cms/settings");
        setForm(data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const saved = await cmsFetch<SiteSettings>("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm(saved);
      setMessage("Settings saved. Product, solution and form enquiries will use this WhatsApp number.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell>
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-xl gap-4 border border-black/10 bg-white p-6">
        <h2 className="m-0 text-xl font-light uppercase">Site settings</h2>
        <p className="m-0 text-sm text-black/55">
          Set the WhatsApp number used when customers request product or solution details, and when they submit the project brief form.
        </p>

        {loading ? (
          <p className="m-0 text-sm text-black/50">Loading…</p>
        ) : (
          <>
            <TextField
              label="WhatsApp number"
              value={form.whatsappNumber}
              onChange={(value) => setForm({ ...form, whatsappNumber: value })}
              plain
            />
            <p className="m-0 -mt-2 text-[11px] text-black/45">
              Use country code without + or spaces, e.g. 971501234567
            </p>
            <TextField
              label="Phone number (display)"
              value={form.phoneNumber}
              onChange={(value) => setForm({ ...form, phoneNumber: value })}
              plain
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(value) => setForm({ ...form, email: value })}
              plain
            />
            <button
              type="submit"
              disabled={saving}
              className="mt-2 h-11 bg-black text-xs font-bold tracking-[0.08em] text-white uppercase disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save settings"}
            </button>
          </>
        )}

        {message ? <p className="m-0 text-sm text-black/70">{message}</p> : null}
      </form>
    </AdminShell>
  );
}
