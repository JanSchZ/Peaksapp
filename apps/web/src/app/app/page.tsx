import { getDashboardSnapshot } from "@/lib/data/dashboard";

const trendColors: Record<"up" | "down" | "flat", string> = {
  up: "text-emerald-400",
  down: "text-rose-400",
  flat: "text-slate-300",
};

export default async function ConsoleHome() {
  const snapshot = await getDashboardSnapshot();

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">{snapshot.organization}</p>
        <h1 className="text-3xl font-semibold">Panel diario</h1>
        <p className="text-sm text-slate-300">
          Cumplimiento, cargas y alertas combinando registros de sesiones, RPE y señales de wearables.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Cumplimiento</p>
          <p className="mt-4 text-4xl font-semibold">{Math.round(snapshot.compliance * 100)}%</p>
          <p className="text-xs text-slate-400">vs. semana anterior</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Carga interna</p>
          <p className="mt-4 text-4xl font-semibold">{snapshot.loadInternal}</p>
          <p className="text-xs text-slate-400">sRPE x minutos</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Carga externa</p>
          <p className="mt-4 text-4xl font-semibold">{snapshot.loadExternal}</p>
          <p className="text-xs text-slate-400">toneladas / TSS</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">PRs semana</p>
          <p className="mt-4 text-4xl font-semibold">+{snapshot.prsThisWeek}</p>
          <p className="text-xs text-slate-400">últimos 7 días</p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {snapshot.metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>{metric.label}</span>
              <span className={trendColors[metric.trend]}> {metric.delta}</span>
            </div>
            <p className="mt-4 text-3xl font-semibold">{metric.current}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Alertas</h2>
          <p className="text-xs text-slate-400">Conectado a Supabase Realtime</p>
        </div>
        <div className="space-y-3">
          {snapshot.alerts.map((alert) => (
            <article key={alert.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">{alert.severity}</p>
              <p className="mt-2 text-lg font-semibold">{alert.title}</p>
              <p className="text-sm text-slate-300">{alert.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
