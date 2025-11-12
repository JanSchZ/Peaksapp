import { getSupabaseServerClient } from "../supabase/server";

export type DashboardAlert = {
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
};

export type MetricTile = {
  label: string;
  current: string;
  delta: string;
  trend: "up" | "down" | "flat";
};

export interface DashboardSnapshot {
  organization: string;
  compliance: number;
  loadInternal: number;
  loadExternal: number;
  prsThisWeek: number;
  metrics: MetricTile[];
  alerts: DashboardAlert[];
}

const fallbackSnapshot: DashboardSnapshot = {
  organization: "Peaks Lab",
  compliance: 0.92,
  loadInternal: 475,
  loadExternal: 520,
  prsThisWeek: 4,
  metrics: [
    { label: "Monotonía", current: "1.23", delta: "-0.07", trend: "down" },
    { label: "Strain", current: "3.4", delta: "+0.2", trend: "up" },
    { label: "HRV", current: "76 ms", delta: "-3 ms", trend: "down" },
  ],
  alerts: [
    {
      title: "Carga alta en Fuerza",
      description: "Grupo U20 subió 35% la carga externa vs. semana pasada.",
      severity: "warning",
    },
    {
      title: "HRV bajo",
      description: "Martina B. lleva 3 días con HRV < -10% baseline.",
      severity: "critical",
    },
  ],
};

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.rpc("dashboard_snapshot");

    if (error || !data) {
      return fallbackSnapshot;
    }

    return {
      organization: data.organization ?? fallbackSnapshot.organization,
      compliance: data.compliance ?? fallbackSnapshot.compliance,
      loadInternal: data.load_internal ?? fallbackSnapshot.loadInternal,
      loadExternal: data.load_external ?? fallbackSnapshot.loadExternal,
      prsThisWeek: data.prs_this_week ?? fallbackSnapshot.prsThisWeek,
      metrics: data.metrics ?? fallbackSnapshot.metrics,
      alerts: data.alerts ?? fallbackSnapshot.alerts,
    };
  } catch {
    return fallbackSnapshot;
  }
}
