import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import ResetBoltcard from "./components/ResetBoltcard";

export default function ProgramBoltcardScreen() {
    const params = useLocalSearchParams();
    const url = params.url ? params.url.toString() : null;

    return (
        <ScrollView>
            <ResetBoltcard url={url} />
        </ScrollView>
    );
}
