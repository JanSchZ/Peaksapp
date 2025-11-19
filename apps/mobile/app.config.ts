import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Peaks",
    slug: "peaks",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#0B0E14",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#0B0E14",
        },
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro",
    },
    plugins: ["expo-router"],
    scheme: "peaks",
});
