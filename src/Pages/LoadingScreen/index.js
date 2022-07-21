import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from '../../global/theme'
import { Loading } from '../../components/Loading'

export function LoadingScreen() {
    return (
        <View style={styles.container}>
            <Loading size="large" color={theme.colors.primary} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
});