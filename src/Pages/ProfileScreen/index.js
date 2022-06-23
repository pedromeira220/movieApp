import React from "react";

import {View, Text, StyleSheet} from "react-native";
import { theme } from "../../global/theme";

export function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24, 
        color: theme.colors.text,
        fontWeight: 'bold',
    }
})