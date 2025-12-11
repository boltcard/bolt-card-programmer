import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    return (
        <ThemeProvider value={DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="scan" options={{ headerShown: false }} />
                <Stack.Screen name="program" options={{ headerShown: false }} />
                <Stack.Screen name="reset" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
