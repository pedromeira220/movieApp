import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../global/theme';

export function OnboardingComponent({ title, subtitle }) {
    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>

            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>

            <View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center'
    },
    bannerContainer: {
        width: "100%",
        height: "50%",
        backgroundColor: theme.colors.primary
    },
    content: {
        alignItems: "center",
        marginTop: 60,
        maxWidth: "80%",
        marginHorizontal: "auto",
    },
    title: {
        color: theme.colors.text,
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 46,
    },
    subtitle: {
        color: theme.colors.text,
        fontSize: 24,
        textAlign: "center",

    }
});