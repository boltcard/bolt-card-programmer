import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import SetupBoltcard from "./components/SetupBoltcard";

export default function ProgramBoltcardScreen() {
    const params = useLocalSearchParams();
    const url = params.url ? params.url.toString() : null;
    return (
        <ScrollView>
            <SetupBoltcard url={url} />
        </ScrollView>
    );
}
