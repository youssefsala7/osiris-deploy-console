import { NextResponse } from "next/server";
import { z } from "zod";
import { removeContainer } from "@/lib/ssh";

const Schema = z.object({ app: z.string().regex(/^[a-z0-9-]+$/) });

export async function POST(req: Request) {
  try {
    const { app } = Schema.parse(await req.json());
    const { stdout } = await removeContainer(app);
    return NextResponse.json({ ok: true, stdout });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 400 });
  }
}