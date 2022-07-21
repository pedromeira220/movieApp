import React, { useContext, useEffect, useState } from "react";

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
import VideoStreamingSvg from "../../assets/undraw_video_streaming_re_v3qg.svg";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { InputWithIcon } from "../../components/InputWithIcon";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { navigateAndReset } from "../../components/publicFunctions/navigateAndReset";
import { myApiFunctions } from "../../services/backend";
import { asyncStorage } from "../../services/asyncStorage";
import { localstorage } from "../../services/localstorage";
import { AuthContext } from "../../utils/contexts/AuthContext";


const bannerHeight = parseInt(Math.round((Dimensions.get("screen").height) * 0.45).toFixed(0));
export function LogInScreen() {

    const auth = useContext(AuthContext);

    const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState(false);

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [canShowErrorMessage, setCanShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    async function handleSubmit() {

        setIsPrimaryButtonLoading(true);

        const data = await myApiFunctions.login({ email: emailText, password: passwordText });


        if (data.error == true) {
            setCanShowErrorMessage(true);
            setErrorMessage(data.msg);
            setIsPrimaryButtonLoading(false);
            return;
        }


        setCanShowErrorMessage(false);

        asyncStorage.ASuser.storeData("user_id", data.user.id);
        localstorage.user.id = data.user.id;

        const loginData = await myApiFunctions.login({ email: emailText, password: passwordText });
        asyncStorage.ASuser.storeData("user_token", loginData.user.token);
        localstorage.user.token = loginData.user.token;

        auth.logIn();
    }

    function handleEmailTextChange(text) {
        setEmailText(text);
    }
    function handlePasswordTextChange(text) {
        setPasswordText(text);
    }


    return (
        <KeyboardAwareScrollView
            style={styles.container}
            alwaysBounceVertical={false}
            extraScrollHeight={30}
        >


            <SafeAreaView style={styles.bannerContainer}>
                <VideoStreamingSvg height="100%" style={styles.banner} />
            </SafeAreaView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={[styles.content, { justifyContent: "flex-end" }]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Log in</Text>
                        {
                            canShowErrorMessage && (
                                <Text style={styles.errorMessage}>{errorMessage}</Text>
                            )
                        }
                    </View>

                    <View style={styles.inputsContainer}>

                        <InputWithIcon
                            Icon={<MaterialIcons
                                name="email"
                                size={24}
                                color={theme.colors.text}
                            />}
                            placeholder="Your email"
                            onChangeText={handleEmailTextChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <InputWithIcon
                            placeholder="Your password"
                            Icon={<FontAwesome5
                                name="key" size={24}
                                color={theme.colors.text}
                            />}
                            onChangeText={handlePasswordTextChange}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                        <PrimaryButton
                            color={theme.colors.primary}
                            text="Log In"
                            textColor={theme.colors.text}
                            onPress={handleSubmit}
                            isLoading={isPrimaryButtonLoading}
                            disabledColor={theme.colors.disabledPrimary}


                        />

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
    errorMessage: {
        color: theme.colors.secondary,
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 16
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