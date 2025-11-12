export type WearableProvider =
  | "apple_health"
  | "health_connect"
  | "garmin"
  | "polar"
  | "oura"
  | "whoop"
  | "samsung"
  | "huawei";

export interface IntegrationAccount {
  id: string;
  provider: WearableProvider;
  athleteId: string;
  status: "connected" | "expired" | "revoked";
  scopes: string[];
  lastSyncedAt?: string;
}

export const supportedProviders: Record<WearableProvider, { name: string; modes: string[] }> = {
  apple_health: { name: "Apple Health", modes: ["device"] },
  health_connect: { name: "Health Connect", modes: ["device"] },
  garmin: { name: "Garmin", modes: ["cloud", "webhook"] },
  polar: { name: "Polar", modes: ["cloud"] },
  oura: { name: "Oura", modes: ["cloud"] },
  whoop: { name: "WHOOP", modes: ["cloud"] },
  samsung: { name: "Samsung Health", modes: ["device", "cloud"] },
  huawei: { name: "Huawei Health", modes: ["cloud"] },
};
