import React from "react";

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { theme } from "../../global/theme";
import HomeCinemaSvg from "../../assets/undraw_video_streaming_re_v3qg.svg";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';



import { InputWithIcon } from "../../components/InputWithIcon";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { navigateAndReset } from "../../components/publicFunctions/navigateAndReset";



export function LogInScreen() {

    const navigation = useNavigation();

    function handleSubmit() {
        navigateAndReset(navigation, "TabBarNavigator");
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.bannerContainer}>
                <HomeCinemaSvg height="100%" style={styles.banner} />
            </SafeAreaView>

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Log In now</Text>
                </View>

                <View style={styles.inputsContainer}>

                    <InputWithIcon placeholder="Your email" Icon={<MaterialIcons name="email" size={24} color={theme.colors.text} />} />
                    <InputWithIcon placeholder="Your password" Icon={<FontAwesome5 name="key" size={24} color={theme.colors.text} />} />
                    <PrimaryButton color={theme.colors.primary} text="Login" textColor={theme.colors.text} onPress={handleSubmit} />

                    <View style={styles.bottomInfo}>
                        <Text style={styles.text}>New to Movie App?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigateAndReset(navigation, "SingUpScreen");
                            }}
                        >
                            <Text style={[styles.text, {
                                color: theme.colors.text,
                                fontWeight: "bold",
                                marginLeft: 4,
                            }]}>Register</Text>
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