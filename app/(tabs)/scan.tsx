import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ScanQR() {
    const params = useLocalSearchParams();

    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [notQR, setNotQR] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<string>(params.redirect.toString());
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const [savedStates, setSavedStates] = useState<string>("");

    useEffect(() => {
        if (params.redirect) {
            setRedirect(params.redirect.toString());
        }
        if (params.savedStates) {
            setSavedStates(params.savedStates.toString());
        }
    }, []);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={[styles.wrapper, styles.container]}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            position: "relative",
                        }}
                    >
                        <Ionicons name="camera" size={100} color="black" />
                        <Ionicons
                            name="sparkles"
                            size={20}
                            style={{ position: "absolute", top: 0, right: 0 }}
                            color="Orange"
                        />
                    </View>
                </View>
                <Text style={{ textAlign: "center", fontWeight: 700, marginBottom: 10 }}>Camera Access</Text>
                <Text style={{ textAlign: "center", marginBottom: 50 }}>
                    We need access to your camera to scan QR codes. Please allow camera permission to continue.
                </Text>
                <Pressable onPress={requestPermission} style={{ marginBottom: 10 }}>
                    <Text>Allow</Text>
                </Pressable>
                <Pressable onPress={() => router.back()}>
                    <Text>Go Back</Text>
                </Pressable>
            </View>
        );
    }

    if (notQR) {
        return (
            <View style={[styles.wrapper, styles.container]}>
                <FontAwesome
                    name="exclamation-triangle"
                    size={100}
                    color="orange"
                    style={{ textAlign: "center", marginBottom: 40 }}
                />
                <Text style={{ textAlign: "center", fontWeight: 700, marginBottom: 10 }}>Oops!</Text>
                <Text style={{ textAlign: "center", marginBottom: 50 }}>
                    This is not a QR Code. Please try scanning again.
                </Text>
                <Pressable onPress={() => setNotQR(false)}>
                    <Text>Try Again</Text>
                </Pressable>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    return (
        <View style={styles.wrapper}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={(result) => {
                    if (result.type != "qr") {
                        setNotQR(true);
                    } else {
                        if (redirecting) return;
                        setRedirecting(true);
                        router.replace({
                            pathname: redirect,
                            params: {
                                result: result.data,
                                savedStates: savedStates,
                            },
                        });
                    }
                }}
            />
            <View style={styles.buttonContainer}>
                <View>
                    <View style={{ flexGrow: 1 }}>
                        <Pressable style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>
                                <Ionicons name="camera-reverse" size={20} color="#ffffff" /> Flip Camera
                            </Text>
                        </Pressable>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <Text style={styles.text}>
                                <Ionicons name="close" size={20} color="#ffffff" /> Cancel
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        paddingHorizontal: 20,
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        top: "auto",
        paddingHorizontal: 30,
    },
    button: { paddingHorizontal: 10, paddingVertical: 15 },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
