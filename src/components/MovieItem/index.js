import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';
import { myApiFunctions } from '../../services/backend';
import { localstorage } from '../../services/localstorage';
import { AuthContext } from '../../utils/contexts/AuthContext';
import { navigateToDetails } from '../publicFunctions/navigateToDetails';
import { SuccessModal } from '../SuccessModal';

export function MovieItem({ poster, title, releaseDate, navigation, movieId }) {

    const listTypeToAddMoviesInQuickAction = 0;

    const [clickCount, setClickCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalColor, setModalColor] = useState("");

    const auth = useContext(AuthContext);

    async function handleButtonLongPress() {

        auth.checkInternetConnection();

        const userId = localstorage.user.id;
        const userToken = localstorage.user.token;

        const response = await myApiFunctions.getAllLists({ userId, token: userToken });

        if (response.error) {
            console.error(response.msg);
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

                    console.error(response.msg);
                    setModalColor(theme.colors.secondary);
                    setModalText(response.msg);
                    setIsModalVisible(true);
                    setTimeout(() => {
                        setIsModalVisible(false);
                    }, 2 * 1000);
                    return;
                }
                setIsModalVisible(true);
                setModalColor(theme.colors.success);
                setModalText("The movie was added to the watch list");
                setTimeout(() => {
                    setIsModalVisible(false);
                }, 1.5 * 1000);
            }

        });

    }


    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigateToDetails(navigation, movieId)
                }}
                onLongPress={() => {
                    handleButtonLongPress()
                }}
                style={styles.container}>
                <Image
                    source={{ uri: poster }}
                    style={styles.image}
                />
                <View style={styles.titleView}>

                    <Text style={styles.title}
                        numberOfLines={1}
                    >
                        {title}

                    </Text>


                    <Text style={styles.releaseDateTitle}>
                        {"\n"}
                        ({releaseDate})
                    </Text>
                </View>
            </TouchableOpacity>
            <SuccessModal
                color={modalColor}
                message={modalText}
                visible={isModalVisible}
            />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: 152,
        marginRight: 0,
    },
    titleView: {
        marginTop: 8,
        width: "100%",
    },
    title: {
        color: theme.colors.text,
        fontSize: 16,
    },
    releaseDateTitle: {
        marginTop: -16,
        color: "#BCBCBC",
        fontSize: 16,
    },
    image: {
        width: 152,
        height: 184,
        borderRadius: 24,
    },
});