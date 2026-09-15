import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required." }, { status: 400 });
  }

  const latitude = Number(lat);
  const longitude = Number(lon);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: "Invalid coordinates." }, { status: 400 });
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", String(latitude));
    url.searchParams.set("lon", String(longitude));

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "TheUnboxingWebsite/1.0 (project-brief form)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Address lookup failed." }, { status: 502 });
    }

    const data = (await response.json()) as { display_name?: string };
    const address =
      data.display_name?.trim() || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

    return NextResponse.json({ address });
  } catch {
    return NextResponse.json({ error: "Address lookup failed." }, { status: 502 });
  }
}
