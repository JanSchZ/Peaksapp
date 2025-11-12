import { NextResponse } from "next/server";
import { normalizeRows } from "@peaks/core";
import { z } from "zod";

const payloadSchema = z.object({
  rows: z.array(z.record(z.string(), z.string().optional())),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { rows } = payloadSchema.parse(json);
    const normalizedInput = rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, value ?? ""])
      )
    );
    const preview = normalizeRows(normalizedInput, { organizationId: "demo-org", authorId: "demo-user" });

    // TODO: persist draft import batch in Supabase (imports + import_items tables)

    return NextResponse.json({ preview });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid payload" }, { status: 400 });
  }
}
