import Link from "next/link";
import type { Organization } from "@peaks/core";
import { Button } from "@peaks/ui";

const labOrganization: Pick<Organization, "name" | "slug"> = {
  name: "Peaks Lab",
  slug: "peaks-lab",
};

const highlights = [
  {
    title: "Importador con IA",
    body: "Gemini 2.5 convierte tus planillas en plantillas vivas en minutos.",
  },
  {
    title: "Dashboards configurables",
    body: "Cumplimiento, carga interna/externa y PRs con overlays y correlaciones en tiempo real.",
  },
  {
    title: "Integraciones",
    body: "Apple/HealthKit, Health Connect, Garmin, Polar, Oura, WHOOP, Samsung y Huawei en un mismo panel.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">
          {labOrganization.name} · Peaks OS
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
          Planificá, importá, ejecutá y medí todo tu programa en un solo lugar.
        </h1>
        <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
          Reemplazá las planillas, los chats dispersos y los dashboards manuales. La
          plataforma centraliza planificación, registro offline, feedback con video y
          métricas provenientes de wearables para tomar decisiones hoy.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="px-6 py-3 text-base">
            <Link href="/app">Abrir consola</Link>
          </Button>
          <Button
            variant="ghost"
            className="border border-white/20 px-6 py-3 text-base text-white hover:border-white/50"
            asChild
          >
            <Link href="/importador">Ver importador</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24">
        <section className="grid gap-6 md:grid-cols-3" aria-label="Highlights">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-emerald-500/5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                {item.title}
              </p>
              <p className="mt-3 text-sm text-slate-100">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8" aria-label="Data stack">
          <h2 className="text-2xl font-semibold">Stack listo para producción</h2>
          <p className="mt-3 text-sm text-slate-200">
            Next.js App Router + Supabase + Expo + Drizzle ORM + Cloudflare Stream/R2. Todo versionado en un
            monorepo con Turbo y paquetes compartidos para lógica de dominio y UI.
          </p>
          <div className="mt-6 grid gap-3 text-xs uppercase tracking-[0.2em] text-slate-300 sm:grid-cols-3">
            <span className="rounded-xl border border-white/10 px-4 py-3">Supabase + RLS</span>
            <span className="rounded-xl border border-white/10 px-4 py-3">Gemini 2.5 Imports</span>
            <span className="rounded-xl border border-white/10 px-4 py-3">Wearables Hub</span>
          </div>
        </section>
      </main>
    </div>
  );
}
