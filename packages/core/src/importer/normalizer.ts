import { z } from "zod";

export const importedWorkoutSchema = z.object({
  title: z.string().min(1),
  block: z.string().optional(),
  scheduledAt: z.coerce.date().optional(),
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.number().int().positive(),
      reps: z.number().int().positive().optional(),
      tempo: z.string().optional(),
      load: z.string().optional(),
      notes: z.string().optional(),
    })
  ),
});

export type ImportedWorkout = z.infer<typeof importedWorkoutSchema>;

export interface ImporterContext {
  organizationId: string;
  authorId: string;
}

const toInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function normalizeRows(rows: Record<string, string>[], ctx: ImporterContext): ImportedWorkout[] {
  return rows.map((row, index) =>
    importedWorkoutSchema.parse({
      title: row["workout"]?.trim() || `Sesión ${index + 1}`,
      block: row["block"]?.trim(),
      scheduledAt: row["date"]?.length ? row["date"] : undefined,
      exercises: [
        {
          name: row["exercise"]?.trim() || "Sin nombre",
          sets: toInt(row["sets"], 1),
          reps: row["reps"] ? toInt(row["reps"], 0) : undefined,
          tempo: row["tempo"]?.trim(),
          load: row["load"]?.trim(),
          notes: row["notes"]?.trim(),
        },
      ],
    })
  );
}
