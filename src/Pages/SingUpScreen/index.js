import React from "react";

import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { theme } from "../../global/theme";
import HomeCinemaSvg from "../../assets/undraw_home_cinema_l7yl 1.svg";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


import { InputWithIcon } from "../../components/InputWithIcon";
import { PrimaryButton } from "../../components/PrimaryButton";

export function SingUpScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.bannerContainer}>
                <HomeCinemaSvg height="100%" style={styles.banner} />
            </SafeAreaView>

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sing Up</Text>
                </View>

                <View style={styles.inputsContainer}>

                    <InputWithIcon placeholder="Your email" Icon={<MaterialIcons name="email" size={24} color={theme.colors.text} />} />
                    <InputWithIcon placeholder="Your password" Icon={<FontAwesome5 name="key" size={24} color={theme.colors.text} />} />
                    <PrimaryButton color={theme.colors.primary} text="Create account" textColor={theme.colors.text} />

                    <View style={styles.bottomInfo}>
                        <Text style={styles.text}>Join us before?</Text>
                        <TouchableOpacity >
                            <Text style={[styles.text, {
                                color: theme.colors.text,
                                fontWeight: "bold",
                                marginLeft: 4,
                            }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    bannerContainer: {
        height: "45%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    banner: {

    },
    titleContainer: {
        marginTop: 8,
        marginHorizontal: 24,

    },
    title: {
        fontSize: 40,
        color: theme.colors.text,
        fontWeight: 'bold',
    },
    inputsContainer: {
        marginHorizontal: 24,
    },
    bottomInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 29

    },
    text: {
        color: theme.colors.secondaryInformation,
        fontSize: 14,
    }
})