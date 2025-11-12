"use client";

import { useMemo, useState } from "react";
import { Button } from "@peaks/ui";

type PreviewResponse = {
  preview: Array<Record<string, unknown>>;
};

const sampleCsv = `workout,exercise,sets,reps,tempo,load,notes
Fuerza Día 1,Back Squat,4,5,30X1,80% 1RM,Series principales
Fuerza Día 1,Bench Press,4,6,20X1,75% 1RM,Grip cerrado
Bike Aeróbico,Air Bike,1,,steady,30',Zona 2`;

export function ImportForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [preview, setPreview] = useState<PreviewResponse["preview"]>([]);

  const handleFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    await submitCsv(text);
  };

  const submitCsv = async (csvText: string) => {
    try {
      setStatus("loading");
      setMessage("Procesando con Gemini 2.5...");
      const rows = parseCsv(csvText);
      const response = await fetch("/api/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });

      if (!response.ok) {
        throw new Error("No pudimos normalizar el archivo");
      }

      const data = (await response.json()) as PreviewResponse;
      setPreview(data.preview);
      setStatus("success");
      setMessage("Listo. Revisa y publica el borrador.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  const previewContent = useMemo(() => JSON.stringify(preview, null, 2), [preview]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-6 text-sm">
        <label className="font-semibold text-white">Subí un CSV o Excel exportado</label>
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.tsv"
          onChange={(event) => handleFile(event.target.files?.[0])}
          className="rounded-xl border border-white/20 bg-transparent px-4 py-2 text-white"
        />
        <p className="text-xs text-slate-300">
          En esta versión cargamos CSV simple. XLSX/PDF se van a procesar usando Gemini 2.5 Flash → Pro en el backend.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" className="border border-white/20 px-4 py-2 text-sm" onClick={() => submitCsv(sampleCsv)}>
            Probar con ejemplo
          </Button>
        </div>
      </div>

      {status !== "idle" && (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Estado</p>
          <p className="text-slate-100">{message}</p>
        </div>
      )}

      {preview.length > 0 && (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Preview normalizada</p>
          <pre className="overflow-x-auto whitespace-pre-wrap text-emerald-100">{previewContent}</pre>
        </div>
      )}
    </div>
  );
}

function parseCsv(csvText: string) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(",").map((header) => header.trim().toLowerCase());

  return rows.map((row) => {
    const values = row.split(",");
    return headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = values[index]?.trim() ?? "";
      return acc;
    }, {});
  });
}
