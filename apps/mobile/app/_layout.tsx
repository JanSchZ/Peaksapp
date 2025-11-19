import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0B0E14" }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0B0E14",
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: "#0B0E14",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Peaks" }} />
      </Stack>
    </View>
  );
}
