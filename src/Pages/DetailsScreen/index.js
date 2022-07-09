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
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GenreCategory } from "../../components/GenreCategory";
import MovieListHorizontal from "../../components/MovieListHorizontal";
import { api, apiFunctions, apiConfig } from "../../services/api";

import { useRoute } from "@react-navigation/native";
import { TextWithReadMoreButton } from "../../components/TextWithReadMoreButton";
import { asyncStorage } from "../../services/asyncStorage";


export function DetailsScreen({ navigation }) {
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [movieId, setMovieId] = useState(0);
    const [movie, setMovie] = useState({});
    const [canShowMovieGenres, setCanShowMovieGenres] = useState(false);

    const [isFavoriteIconClicked, setIsFavoriteIconClicked] = useState(false);
    const [canShowFavoriteIcon, setCanShowFavoriteIcon] = useState(false);

    const [numberOfLinesOverview, setNumberOfLinesOverview] = useState(0);



    const [canShowReadMoreButtonOverview, setCanShowReadMoreButtonOverview] = useState(false);

    const [favoritesMovies, setFavoriteMovies] = useState([]);



    const route = useRoute();

    async function loadData() {



        try {

            setNumberOfLinesOverview(4);

            setMovieId(route?.params?.movieId);
            setMovie((await apiFunctions.getMovie(movieId)).data);
            setRelatedMovies(await (await apiFunctions.getRecommendations(movieId))?.data?.results);
            setCanShowMovieGenres(true);

            loadMovies();


        } catch (err) {



        }


    }



    useEffect(function () {
        loadData();
        setMovieId(route?.params?.movieId);

    }, []);


    useEffect(function () {
        loadData();


    }, [movieId, route]);


    async function loadMovies() {
        setFavoriteMovies(JSON.parse(await asyncStorage.ASmovieList.getData("favoriteMovies")));
        console.log(favoritesMovies);
        setCanShowFavoriteIcon(true);
        favoritesMovies.forEach((movieInList) => {
            if (movieInList.id === movie.id) {
                setIsFavoriteIconClicked(true);
                return;
            } else {
                setIsFavoriteIconClicked(false);
            }
        })
    }


    function returnMovieGenres(movie) {
        const quantitiesOfGenres = 2;
        const allGenres = movie['genres'];
        const genres = [];

        for (let i = 0; i < quantitiesOfGenres; i++) {
            genres.push(allGenres[i]);
        }

        return genres;


    }

    async function handleFavoriteButtonClick() {
        setIsFavoriteIconClicked(!isFavoriteIconClicked);
        const movieListFromLocalStorage = JSON.parse(await asyncStorage.ASmovieList.getData("favoriteMovies"));
        const movieList = [...movieListFromLocalStorage];
        movieList.push(movie);

        asyncStorage.ASmovieList.storeData("favoriteMovies", JSON.stringify(movieList));
    }

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

                            Some movies do not have the runtime property
                        </View> */}

                        <View style={styles.secondaryInformation}>
                            <AntDesign
                                name="star"
                                size={12}
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
                        <TouchableOpacity
                            style={styles.favoriteView}
                            onPress={() => {
                                handleFavoriteButtonClick();
                            }}
                            activeOpacity={0.9}
                        >
                            {
                                canShowFavoriteIcon && (

                                    <MaterialIcons name={isFavoriteIconClicked ? 'favorite' : 'favorite-outline'} size={24} color={theme.colors.secondaryInformation} />
                                )
                            }
                        </TouchableOpacity>
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

                        {
                            canShowMovieGenres && (
                                <>
                                    <Text
                                        style={[
                                            styles.minorTitle,
                                            {
                                                color: theme.colors.text,
                                            },
                                        ]}
                                    >
                                        Genres
                                    </Text>

                                    <View
                                        style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            marginTop: 8,
                                            marginBottom: 16,
                                        }}
                                    >
                                        {
                                            returnMovieGenres(movie).map((genre) => {
                                                return (
                                                    <GenreCategory key={genre.id}>{genre.name}</GenreCategory>
                                                )
                                            })
                                        }
                                    </View>
                                </>
                            )
                        }

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


                    <TextWithReadMoreButton
                        readMoreStyle={styles.readMoreStyle}
                        text={movie.overview}
                        textStyle={[
                            {
                                color: theme.colors.secondaryInformation,
                                fontSize: 12,
                                marginTop: 16,
                            },
                        ]}
                    />


                </View>
            </ScrollView>
            <MovieListHorizontal
                title="Related Movies"
                movieList={relatedMovies}
                navigation={navigation}
            />
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
        width: "100%",
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
        justifyContent: "space-between",
    },
    favoriteView: {
        marginBottom: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    tertiaryInformationContainer: {
        flexDirection: "row",
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.inactiveTabBar,
    },
    readMoreStyle: {
        color: theme.colors.text,
    },
    movieOverViewText: {



    }
});
