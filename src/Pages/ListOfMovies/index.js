import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native'
import { theme } from "../../global/theme";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { MovieSection } from '../../components/MovieSection'
import { api, apiFunctions } from "../../services/api";
import { myApiFunctions } from "../../services/backend";
import { localstorage } from "../../services/localstorage";
import { AuthContext } from "../../utils/contexts/AuthContext";

import NoDataSvg from '../../assets/undraw_no_data_re_kwbl.svg';
import { AdBanner } from "../../components/AdBanner";
export function ListOfMovies() {

    const auth = useContext(AuthContext);

    const route = useRoute();

    const navigation = useNavigation();

    const isScreenFocused = useIsFocused();

    const [movies, setMovies] = useState([]);

    const [isLoadingMovies, setIsLoadingMovies] = useState(false);

    const listType = route.params.listType;


    async function loadData() {
        setIsLoadingMovies(true);

        auth.checkInternetConnection();

        const listId = route.params.listId;
        const response = await myApiFunctions.getAllMoviesFromList({ listId, token: localstorage.user.token });

        if (response.error) {
            console.error(response.msg);
            setIsLoadingMovies(false);
        }

        const tmdbMovieList = [];


        for (let i = 0; i < response.list.length; i++) {
            const movie = response.list[i];
            const movieFound = await apiFunctions.getMovie(movie.TMDBid);
            tmdbMovieList.push(movieFound.data);
        }


        setMovies(tmdbMovieList);
        setIsLoadingMovies(false);


    }

    useEffect(() => {


        loadData()


        return () => {
            setMovies([]);
        }

    }, []);

    useEffect(() => {


        loadData()


        return () => {
            setMovies([]);
        }

    }, [navigation, isScreenFocused]);



    function handleGoBackClick() {
        navigation.goBack();
    }

    async function handleDeleteButtonClick() {
        auth.checkInternetConnection();

        Alert.alert("Delete list", "Are you sure you want to delete this list?", [
            {
                text: "Cancel", onPress: function () {

                }
            },
            {
                text: "Yes", onPress: async function () {
                    const listId = route.params.listId;


                    const { id, token } = localstorage.user;



                    const response = await myApiFunctions.deleteList({ listId, token, ownerId: id });

                    if (response.error) {
                        console.error(response.msg);
                        return;
                    }



                    navigation.goBack();
                }
            },

        ]);


    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity
                    onPress={function () {
                        handleGoBackClick();
                    }}
                >
                    <AntDesign name="left" size={32} color={theme.colors.text} />

                </TouchableOpacity>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={[styles.title, {
                        marginLeft: 16
                    }]}>{route.params.listName}</Text>
                </View>


                {
                    listType == 3 && (
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.deleteButton}
                                onPress={function () {
                                    handleDeleteButtonClick();
                                }}
                            >
                                <Text style={styles.deleteText}>Delete list</Text>
                                <MaterialIcons name="delete" size={18} color={theme.colors.secondary} />
                            </TouchableOpacity>
                        </View>
                    )
                }


            </SafeAreaView>
            <AdBanner />
            <View
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <MovieSection
                    isLoadingMovies={isLoadingMovies}
                    ListEmptyComponent={<ListEmptyComponent />}
                    movieList={movies}
                    navigation={navigation}
                    showTitle={false}

                />
            </View>

        </ScrollView>
    )
}



function ListEmptyComponent() {

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    return (
        <>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 28,
                }}
            >
                <NoDataSvg height={screenHeight * 0.4} />
            </View>
            <Text
                style={{
                    color: theme.colors.text,
                    fontSize: 24,
                    textAlign: "center",
                }}
            >
                This list is empty,
                add movies here by clicking
                in the favorite button in
                the movie details screen
            </Text>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 62,
        marginHorizontal: 24,
        marginBottom: 40,
    },
    title: {
        color: theme.colors.text,
        fontSize: 24,
    },
    deleteButton: {
        backgroundColor: theme.colors.gray,
        flexDirection: "row",
        width: 132,
        height: 36,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 20,
        paddingHorizontal: 16
    },
    deleteText: {
        fontSize: 14,
        color: theme.colors.inactiveTabBar,
    },
    content: {
        marginHorizontal: 24,
        marginTop: 24,
    },
});

