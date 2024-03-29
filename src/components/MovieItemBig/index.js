import React, { useContext, useState } from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "../../global/theme";

import { navigateToDetails } from "../publicFunctions/navigateToDetails";
import { myApiFunctions } from "../../services/backend";
import { localstorage } from "../../services/localstorage";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { SuccessModal } from "../SuccessModal";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';

export function MovieItemBig({ rating, image, title, navigation, setCanShowInterstitialAds, canShowInterstitialAds, movieId }) {

    const listTypeToAddMoviesInQuickAction = 0;

    const [clickCount, setClickCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalColor, setModalColor] = useState("");
    const modalTimeoutSeconds = 3;


    const auth = useContext(AuthContext);

    async function handleButtonLongPress() {

        auth.checkInternetConnection();

        const userId = localstorage.user.id;
        const userToken = localstorage.user.token;

        const response = await myApiFunctions.getAllLists({ userId, token: userToken });

        if (response.error) {

            setModalColor(theme.colors.secondary);
            setModalText(response.msg);
            setIsModalVisible(true);

            setTimeout(() => {
                setIsModalVisible(false);
            }, 2 * 1000);
        }

        const { lists } = response;


        lists?.forEach(async function (list) {

            if (list.type == listTypeToAddMoviesInQuickAction) {
                const response = await myApiFunctions.addMovieToList({ listId: list.id, token: userToken, TMDBmovieId: movieId });

                if (response.error) {

                    setIsModalVisible(true);
                    setModalColor(theme.colors.secondary);
                    setModalText(response.msg);

                    setTimeout(() => {
                        setIsModalVisible(false);
                    }, modalTimeoutSeconds * 1000);
                    return;
                }
                setIsModalVisible(true);
                setModalColor(theme.colors.success);
                setModalText("Movie added to watch list");
                setTimeout(() => {
                    setIsModalVisible(false);
                }, modalTimeoutSeconds * 1000);
                return
            }

        });

    }

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={async () => {
                    if (canShowInterstitialAds) {
                        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910');

                        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
                        await AdMobInterstitial.showAdAsync();
                    }


                    navigateToDetails(navigation, movieId);
                    setCanShowInterstitialAds(false);
                }}
                onLongPress={() => {
                    handleButtonLongPress()
                }}
            >
                <Image
                    source={{ uri: image }}
                    style={styles.img}

                />


                <View style={styles.viewTop}>
                    <AntDesign name="star" size={16} color="#F3BE00" />
                    <Text style={styles.title}>{rating}

                    </Text>
                </View>



                <View style={styles.viewBottom}
                >
                    <Text style={styles.title}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>


            <SuccessModal
                color={modalColor}
                message={modalText}
                visible={isModalVisible}
            />


        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 224,
        marginLeft: 24,
    },
    img: {
        width: 224,
        height: 292,
        resizeMode: 'cover',
        borderRadius: 32,
    },
    title: {
        fontSize: 18,
        color: theme.colors.text,
    },

    viewTop: {
        backgroundColor: "rgba(50, 50, 50, 0.9))",
        flexDirection: 'row',
        width: 80,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        position: 'absolute',
        top: 16,
        right: 16,

    },

    viewBottom: {
        top: 240 - 44,
        left: 16,
        right: 16,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        backgroundColor: "rgba(50, 50, 50, 0.9))",
        borderRadius: 16,
        paddingHorizontal: 16,


    },
    imgBlur: {
        position: 'absolute',
        borderRadius: 32,
    },
    imgBlurBig: {
        zIndex: -1,
        position: 'absolute',
        borderRadius: 16,
        height: 72,
        width: "100%",
    }

})