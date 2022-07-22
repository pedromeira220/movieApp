import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { Loading } from "../../components/Loading";
import { theme } from "../../global/theme";
import ErrorIllustrationSvg from "../../assets/undraw_cancel_re_pkdm.svg"
import { PrimaryButton } from "../../components/PrimaryButton";
import { AuthContext } from "../../utils/contexts/AuthContext";

export function ErrorScreen() {

    const auth = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    async function handleTryAgainClick() {
        setIsLoading(true);
        await auth.checkInternetConnection();
        setIsLoading(false);
    }

    useEffect(function () {
        auth.checkInternetConnection();
        return () => {
            setIsLoading(null);
        }
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView
                style={styles.bannerContainer}
            >
                <ErrorIllustrationSvg height={screenHeight * 0.45} />
            </SafeAreaView>
            <View style={styles.content}>
                <Text style={styles.title}>Error</Text>
                <Text style={styles.subTitle}>
                    Please check your internet connection, if it doesn't work try again later
                </Text>
                <PrimaryButton
                    isLoading={isLoading}
                    style={{
                        marginTop: 40,
                    }} text="Try again" textColor={theme.colors.text} onPress={() => {
                        handleTryAgainClick();
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
    },
    bannerContainer: {

        width: "90%",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 40,
        color: theme.colors.text,
        marginTop: 44,
    },
    subTitle: {
        textAlign: "center",
        fontSize: 24,
        color: theme.colors.text,
        marginTop: 8,
    },
});