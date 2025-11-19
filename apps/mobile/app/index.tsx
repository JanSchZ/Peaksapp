import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peaks Athlete</Text>
      <Text style={styles.subtitle}>Ready to train?</Text>
      <Link href={"/login" as any} style={styles.link}>
        Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B0E14",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#94a3b8",
    marginTop: 8,
  },
  link: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
