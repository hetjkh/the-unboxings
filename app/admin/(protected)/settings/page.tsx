"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { cmsFetch, TextField } from "../../components/AdminFields";
import type { SiteSettings } from "@/lib/cms/site-settings";
import type { WhatsAppSessionSnapshot } from "@/lib/whatsapp-baileys";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>({
    whatsappNumber: "",
    phoneNumber: "",
    email: "",
  });
  const [wa, setWa] = useState<WhatsAppSessionSnapshot | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [waBusy, setWaBusy] = useState(false);

  const loadWhatsApp = useCallback(async () => {
    try {
      const data = await cmsFetch<WhatsAppSessionSnapshot>("/api/cms/whatsapp");
      setWa(data);
    } catch {
      // keep previous snapshot
    }
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await cmsFetch<SiteSettings>("/api/cms/settings");
        setForm(data);
        await loadWhatsApp();
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [loadWhatsApp]);

  useEffect(() => {
    if (!wa || wa.status === "connected" || wa.status === "idle" || wa.status === "logged_out") {
      return;
    }
    const timer = window.setInterval(() => {
      void loadWhatsApp();
    }, 2500);
    return () => window.clearInterval(timer);
  }, [wa, loadWhatsApp]);

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
      setMessage("Settings saved. Project briefs go to email and this WhatsApp number.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  async function runWhatsAppAction(action: "start" | "logout") {
    setWaBusy(true);
    setMessage("");
    try {
      const data = await cmsFetch<WhatsAppSessionSnapshot>("/api/cms/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      setWa(data);
      setMessage(
        action === "logout"
          ? "WhatsApp logged out. Start again and scan a new QR."
          : data.status === "connected"
            ? "WhatsApp connected."
            : "WhatsApp starting — scan the QR with your phone.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "WhatsApp action failed");
    } finally {
      setWaBusy(false);
      await loadWhatsApp();
    }
  }

  return (
    <AdminShell>
      <div className="mx-auto grid max-w-xl gap-6">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">Site settings</h2>
          <p className="m-0 text-sm text-black/55">
            Destination WhatsApp for project briefs (with Gmail). Default: +971 50 602 3071.
          </p>

          {loading ? (
            <p className="m-0 text-sm text-black/50">Loading…</p>
          ) : (
            <>
              <TextField
                label="WhatsApp number (notify / destination)"
                value={form.whatsappNumber}
                onChange={(value) => setForm({ ...form, whatsappNumber: value })}
                plain
              />
              <p className="m-0 -mt-2 text-[11px] text-black/45">
                Country code without + or spaces, e.g. 971506023071
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
        </form>

        <section className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">WhatsApp Baileys</h2>
          <p className="m-0 text-sm text-black/55">
            Scan QR with the phone that should <strong>send</strong> notifications. Briefs are delivered to the
            destination number above at the same time as Gmail.
          </p>
          <p className="m-0 text-[11px] leading-5 text-black/45">
            Needs a long-running Node server (`npm run dev` / `npm start`). Does not stay connected on Vercel
            serverless alone.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.08em]">
            <span className="text-black/45">Status</span>
            <span className="font-bold text-black">{wa?.status ?? "—"}</span>
          </div>

          {wa?.connectedJid ? (
            <p className="m-0 text-sm text-black/60">Connected as: {wa.connectedJid}</p>
          ) : null}
          {wa?.lastError ? <p className="m-0 text-sm text-red-700">{wa.lastError}</p> : null}

          {wa?.status === "qr" && wa.qrDataUrl ? (
            <div className="grid justify-items-start gap-3 border border-dashed border-black/25 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={wa.qrDataUrl} alt="WhatsApp QR code" width={280} height={280} className="h-auto w-[280px]" />
              <p className="m-0 text-xs text-black/55">
                WhatsApp → Linked devices → Link a device → scan this code
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={waBusy}
              onClick={() => void runWhatsAppAction("start")}
              className="h-11 bg-black px-5 text-xs font-bold tracking-[0.08em] text-white uppercase disabled:opacity-60"
            >
              {waBusy ? "Working…" : wa?.status === "connected" ? "Reconnect" : "Show QR / Connect"}
            </button>
            <button
              type="button"
              disabled={waBusy}
              onClick={() => void runWhatsAppAction("logout")}
              className="h-11 border border-black bg-white px-5 text-xs font-bold tracking-[0.08em] text-black uppercase disabled:opacity-60"
            >
              Logout session
            </button>
          </div>
        </section>

        {message ? <p className="m-0 text-sm text-black/70">{message}</p> : null}
      </div>
    </AdminShell>
  );
}
