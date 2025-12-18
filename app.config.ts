import type { ConfigContext, ExpoConfig } from "expo/config";
import "tsx/cjs";

export default function defineConfig({ config }: ConfigContext): ExpoConfig {
    const apiKey = process.env.EXPO_PUBLIC_BREEZ_LIQUID_API_KEY ?? "";
    return {
        ...config,
        name: "bolt-card-programmer",
        slug: "bolt-card-programmer",
        version: "0.5.1",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "boltcardprogrammer",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
            bundleIdentifier: "org.boltcard.programmer",
        },
        android: {
            versionCode: 1766085752,
            package: "org.boltcard.programmer",
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/images/android-icon-foreground.png",
                backgroundImage: "./assets/images/android-icon-background.png",
                monochromeImage: "./assets/images/android-icon-monochrome.png",
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
            permissions: ["android.permission.NFC", "android.permission.CAMERA"],
            scheme: ["boltcard"],
        },
        web: {
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                    dark: {
                        backgroundColor: "#000000",
                    },
                },
            ],
            [
                "./plugin/android-signing.ts",
                {
                    storeFile: "../../../my-upload-key.keystore",
                    keyAlias: "onesandzeros-key",
                    storePassword: process.env.ANDROID_KEYSTORE_PASSWORD,
                    keyPassword: process.env.ANDROID_KEY_PASSWORD,
                },
            ],
            [
                "expo-camera",
                {
                    cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
                    microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
                    recordAudioAndroid: true,
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },
    };
}
