import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Link } from "expo-router";

const quickStats = [
  { label: "Cumplimiento", value: "92%" },
  { label: "Carga interna", value: "475" },
  { label: "PRs", value: "+4" },
];

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.kicker}>PEAKS ATHLETE</Text>
        <Text style={styles.title}>Tu plan del día, offline y con feedback claro.</Text>
        <Text style={styles.copy}>
          Revisá las sesiones asignadas, registrá sets incluso sin conexión y sincronizá cuando vuelvas a tener señal.
        </Text>

        <View style={styles.statsRow}>
          {quickStats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <Link href="/plan" style={styles.cta}>
          Ir al plan
        </Link>
      </ScrollView>
    </View>
  );
}

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 96,
    paddingBottom: 120,
  },
  kicker: {
    color: "#34d399",
    letterSpacing: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 12,
  },
  copy: {
    color: "#cbd5f5",
    fontSize: 16,
    marginTop: 16,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "rgba(15,23,42,0.9)",
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
    letterSpacing: 2,
  },
  statValue: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "600",
    marginTop: 8,
  },
  cta: {
    marginTop: 40,
    backgroundColor: "#34d399",
    color: "#0f172a",
    textAlign: "center",
    paddingVertical: 16,
    borderRadius: 999,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
