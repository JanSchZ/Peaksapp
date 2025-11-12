import { Slot } from "expo-router";
import { useFonts, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({ Inter_500Medium, Inter_600SemiBold });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}
