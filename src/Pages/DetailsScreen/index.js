import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { theme } from "../../global/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { GenreCategory } from "../../components/GenreCategory";
import MovieListHorizontal from "../../components/MovieListHorizontal";
import { api, apiFunctions, apiConfig } from "../../services/api";

import { useRoute } from "@react-navigation/native";

export function DetailsScreen({ navigation }) {
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [movieId, setMovieId] = useState(0);
    const [movie, setMovie] = useState({});

    const route = useRoute();

    async function loadData() {



        try {
            setMovieId(route?.params?.movieId);
            setMovie((await apiFunctions.getMovie(movieId)).data);
            setRelatedMovies(await (await apiFunctions.getRecommendations(movieId))?.data?.results);
        } catch (err) {

            console.log(err);

        }


    }

    useEffect(function () {
        setMovieId(route?.params?.movieId);
    }, []);

    useEffect(function () {
        loadData();
    }, [movieId]);

    return (
        <View style={styles.container}>
            <View style={styles.imgView}>
                <Image
                    style={styles.img}
                    source={{ uri: `${apiConfig.imgBaseURL}/${movie.backdrop_path}` }}
                />

                <SafeAreaView
                    style={{
                        position: "absolute",
                        left: 16,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="chevron-back" size={40} color={theme.colors.text} />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

            <ScrollView style={styles.main}>
                <View style={styles.primaryInformation}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={styles.secondaryInformationContainer}>
                        {/*                         <View style={styles.secondaryInformation}>
                            <AntDesign name="clockcircleo" size={24} color={theme.colors.secondaryInformation} />
                            <Text style={[styles.minorTitle, {
                                marginLeft: 8,

                            }]}>
                                {
                                    `${movie.runtime} minutes`
                                }
                            </Text>
                        </View> */}

                        <View style={styles.secondaryInformation}>
                            <AntDesign
                                name="star"
                                size={24}
                                color={theme.colors.secondaryInformation}
                            />
                            <Text
                                style={[
                                    styles.minorTitle,
                                    {
                                        marginLeft: 8,
                                    },
                                ]}
                            >
                                {movie.vote_average}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tertiaryInformationContainer}>
                    <View
                        style={{
                            width: "50%",
                        }}
                    >
                        <Text
                            style={[
                                styles.minorTitle,
                                {
                                    color: theme.colors.text,
                                },
                            ]}
                        >
                            Release date
                        </Text>

                        <Text
                            style={[
                                {
                                    color: theme.colors.secondaryInformation,
                                    fontSize: 12,
                                    marginTop: 16,
                                },
                            ]}
                        >
                            {movie.release_date}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: "50%",
                        }}
                    >
                        <Text
                            style={[
                                styles.minorTitle,
                                {
                                    color: theme.colors.text,
                                },
                            ]}
                        >
                            Genre
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                marginTop: 8,
                                marginBottom: 16,
                            }}
                        >
                            <GenreCategory>Action</GenreCategory>

                            <GenreCategory>Sci-Fi</GenreCategory>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        marginVertical: 16,
                    }}
                >
                    <Text
                        style={[
                            styles.minorTitle,
                            {
                                color: theme.colors.text,
                            },
                        ]}
                    >
                        Synopsis
                    </Text>
                    <Text
                        style={[
                            {
                                color: theme.colors.secondaryInformation,
                                fontSize: 12,
                                marginTop: 16,
                            },
                        ]}
                        numberOfLines={4}
                    >
                        {movie.overview}
                    </Text>
                </View>
                <MovieListHorizontal
                    title="Related Movies"
                    movieList={relatedMovies}
                    navigation={navigation}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    main: {
        marginTop: 16,
        paddingHorizontal: 24,
    },
    imgView: {
        width: "100%",
        height: "35%",
    },
    img: {
        width: "100%",
        height: "100%",
    },
    primaryInformation: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.inactiveTabBar,
    },
    title: {
        fontSize: 24,
        color: theme.colors.text,
    },
    secondaryInformationContainer: {
        marginTop: 16,
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
    },
    minorTitle: {
        color: theme.colors.secondaryInformation,
        fontSize: 12,
        fontWeight: "bold",
    },
    secondaryInformation: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    tertiaryInformationContainer: {
        flexDirection: "row",
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.inactiveTabBar,
    },
});
