import Link from "next/link";
import { ImportForm } from "./ImportForm";

export default function ImportadorPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Importador IA</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">Subí tus planillas, Gemini 2.5 se encarga.</h1>
        <p className="mt-4 text-lg text-slate-200">
          Soportamos Excel, CSV, Google Sheets exportados y PDFs legibles. Detectamos bloques, ejercicios, tempos, RPE y fechas,
          validamos inconsistencias y generamos una plantilla editable con versionado.
        </p>
      </div>
      <ImportForm />
      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="rounded-full border border-white/30 px-5 py-3 text-white" href="/">
          Volver
        </Link>
      </div>
    </div>
  );
}
