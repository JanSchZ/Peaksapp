import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    timestamp: new Date().toISOString(),
  });
}
