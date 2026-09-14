import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import {
  getWhatsAppSnapshot,
  logoutWhatsAppSession,
  startWhatsAppSession,
} from "@/lib/whatsapp-baileys";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAuth();
    return NextResponse.json(getWhatsAppSnapshot());
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json().catch(() => ({}))) as { action?: string };
    const action = body.action || "start";

    if (action === "logout") {
      const snapshot = await logoutWhatsAppSession();
      return NextResponse.json(snapshot);
    }

    const snapshot = await startWhatsAppSession();
    return NextResponse.json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "WhatsApp action failed.";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
