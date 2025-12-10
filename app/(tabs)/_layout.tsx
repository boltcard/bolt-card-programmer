import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "orange",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="reset"
                options={{
                    title: "Reset",
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="refresh" color={color} />,
                }}
            />
            <Tabs.Screen
                name="read"
                options={{
                    title: "Read",
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="binoculars" color={color} />,
                }}
            />
            <Tabs.Screen
                name="test"
                options={{
                    title: "Test",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="test-tube" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Help",
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="help-circle" color={color} />,
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
