import { View, Text, StyleSheet, FlatList } from "react-native";

const plan = [
  { id: "1", title: "Fuerza - Tren superior", status: "Pendiente", day: "Hoy" },
  { id: "2", title: "Condición - Bike", status: "Planificado", day: "Mañana" },
];

export default function PlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>CALENDARIO</Text>
      <Text style={styles.title}>Sesiones asignadas</Text>
      <FlatList
        data={plan}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, marginTop: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDay}>{item.day}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardStatus}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 24,
    paddingTop: 96,
  },
  kicker: {
    color: "#34d399",
    fontSize: 12,
    letterSpacing: 4,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "600",
    marginTop: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "rgba(15,23,42,0.9)",
  },
  cardDay: {
    color: "#94a3b8",
    fontSize: 12,
    letterSpacing: 2,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 6,
  },
  cardStatus: {
    color: "#cbd5f5",
    fontSize: 14,
    marginTop: 8,
  },
});
