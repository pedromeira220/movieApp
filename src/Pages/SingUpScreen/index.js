import React, { useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform,
    Dimensions
} from "react-native";
import { theme } from "../../global/theme";
import HomeCinemaSvg from "../../assets/undraw_home_cinema_l7yl 1.svg";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { InputWithIcon } from "../../components/InputWithIcon";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { navigateAndReset } from "../../components/publicFunctions/navigateAndReset";

const bannerHeight = parseInt(Math.round((Dimensions.get("screen").height) * 0.45).toFixed(0));
export function SingUpScreen() {



    const navigation = useNavigation();

    function handleSubmit() {
        navigateAndReset(navigation, "TabBarNavigator");
    }

    function handleTextChange(text) {
        console.log(text);
    }


    return (
        <KeyboardAwareScrollView
            style={styles.container}



        >


            <SafeAreaView style={styles.bannerContainer}>
                <HomeCinemaSvg height="100%" style={styles.banner} />
            </SafeAreaView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={[styles.content, { justifyContent: "flex-end" }]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Sing Up</Text>
                    </View>

                    <View style={styles.inputsContainer}>

                        <InputWithIcon placeholder="Your email" Icon={<MaterialIcons name="email" size={24} color={theme.colors.text} onChangeText={handleTextChange} />} />
                        <InputWithIcon placeholder="Your password" Icon={<FontAwesome5 name="key" size={24} color={theme.colors.text} onChangeText={handleTextChange} />} />
                        <PrimaryButton color={theme.colors.primary} text="Create account" textColor={theme.colors.text} onPress={handleSubmit} />

                        <View style={styles.bottomInfo}>
                            <Text style={styles.text}>Join us before?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigateAndReset(navigation, "LogInScreen");
                                }}
                            >
                                <Text style={[styles.text, {
                                    color: theme.colors.text,
                                    fontWeight: "bold",
                                    marginLeft: 4,
                                }]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>

        </KeyboardAwareScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    bannerContainer: {
        height: bannerHeight,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    banner: {

    },
    titleContainer: {
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