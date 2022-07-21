import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '../../global/theme';
import { PrimaryGradient } from "../PrimaryGradient";
import { navigateAndReset } from "../publicFunctions/navigateAndReset";

export function OnboardingComponent({ title, subtitle, page, Icon }) {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.bannerContainer}>
                {Icon}
            </SafeAreaView>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

            </View>

            <View style={styles.bottomInfo}>
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (page != 1) {
                                navigation.navigate(`Onboarding` + (page - 1));
                            }
                        }}
                    >
                        <Text style={styles.actionButton}>{page == 1 ? "" : "Prev"}</Text>
                    </TouchableOpacity>

                    <View style={styles.bulletsContainer}>
                        {
                            page == 1 ? <PrimaryGradient
                                style={styles.bullet}
                            />
                                :
                                <View style={styles.bullet} />
                        }
                        {
                            page == 2 ? <PrimaryGradient
                                style={styles.bullet}
                            />
                                :
                                <View style={styles.bullet} />
                        }
                        {
                            page == 3 ? <PrimaryGradient
                                style={styles.bullet}
                            />
                                :
                                <View style={styles.bullet} />
                        }
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            if (page != 3) {
                                navigation.navigate(`Onboarding` + (page + 1));
                            } else {
                                navigateAndReset(navigation, "LogInScreen");
                            }
                        }}
                    >
                        <Text style={styles.actionButton}>{page == 3 ? "Finish" : "Next"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.skipButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigateAndReset(navigation, "LogInScreen");
                        }}
                    >
                        <Text style={styles.skipText}>Skip tutorial</Text>
                    </TouchableOpacity>
                </View>
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
        height: "45%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        alignItems: "center",
        marginTop: 60,
        maxWidth: 250,
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
    },
    bottomInfo: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        marginTop: 64,
    },
    actionButtonsContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: 250,
    },
    actionButton: {
        color: theme.colors.text,
        fontSize: 16,
    },
    bulletsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 58,
    },
    bullet: {
        width: 8,
        height: 8,
        backgroundColor: theme.colors.inactiveTabBar,
        borderRadius: 4,
    },
    skipButtonContainer: {
        marginTop: 42,
    },
    skipText: {
        color: theme.colors.secondaryInformation,
        fontSize: 14,
    },
});


/*

<View style={[styles.bullet, {
                            backgroundColor: page == 1 ? theme.colors.primary : theme.colors.inactiveTabBar
                        }]} />
                        <View style={[styles.bullet, {
                            backgroundColor: page == 2 ? theme.colors.primary : theme.colors.inactiveTabBar
                        }]} />
                        <View style={[styles.bullet, {
                            backgroundColor: page == 3 ? theme.colors.primary : theme.colors.inactiveTabBar
}]} />
*/