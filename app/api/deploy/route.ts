import { NextResponse } from "next/server";
import { z } from "zod";
import { deploySubdomain } from "@/lib/ssh";

const Schema = z.object({
  app: z.string().min(2).max(40).regex(/^[a-z0-9-]+$/),
  fqdn: z.string().min(4),
  port: z.coerce.number().int().positive(),
  image: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { app, fqdn, port, image } = Schema.parse(body);
    const { stdout, stderr, code } = await deploySubdomain(app, fqdn, port, image);
    const ok = code === 0 || stdout.includes("deployed");
    return NextResponse.json({ ok, code, stdout, stderr });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 400 });
  }
}