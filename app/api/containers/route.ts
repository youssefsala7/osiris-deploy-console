import { NextResponse } from "next/server";
import { listContainers } from "@/lib/ssh";

export async function GET() {
  try {
    const items = await listContainers();
    return NextResponse.json({ ok: true, items });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}