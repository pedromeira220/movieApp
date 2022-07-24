import React, { useContext, useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Button,
    Modal,
    Alert,
    ImageBackground,
} from "react-native";
import { theme } from "../../global/theme";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GenreCategory } from "../../components/GenreCategory";
import MovieListHorizontal from "../../components/MovieListHorizontal";
import { api, apiFunctions, apiConfig } from "../../services/api";

import { useIsFocused, useRoute } from "@react-navigation/native";
import { TextWithReadMoreButton } from "../../components/TextWithReadMoreButton";

import { ModalView } from "../../components/ModalView";
import { ListOfMovieList } from "../../components/ListOfMovieList";
import { Loading } from "../../components/Loading";
import { LoadingModal } from "../../components/LoadingModal";

import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from "../../utils/contexts/AuthContext";
import { myApiFunctions } from "../../services/backend";
import { asyncStorage } from "../../services/asyncStorage";


export function DetailsScreen({ navigation }) {
    const [relatedMovies, setRelatedMovies] = useState([]);

    const [movie, setMovie] = useState({});
    const [canShowMovieGenres, setCanShowMovieGenres] = useState(false);



    const [numberOfLinesOverview, setNumberOfLinesOverview] = useState(0);

    const [canShowReadMoreButtonOverview, setCanShowReadMoreButtonOverview] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);

    const [movieIsAtLeastInOneList, setMovieIsAtLeastInOneList] = useState(false);

    const [canUpdateScreen, setCanUpdateScreen] = useState(false);

    const route = useRoute();
    const isScreenFocused = useIsFocused();

    let movieId = route?.params?.movieId;

    const auth = useContext(AuthContext);


    async function loadData() {


        auth.checkInternetConnection();

        try {
            setIsLoadingModalVisible(true);
            setNumberOfLinesOverview(4);

            movieId = route?.params?.movieId;
            setMovie((await apiFunctions.getMovie(movieId)).data);
            setRelatedMovies(await (await apiFunctions.getRecommendations(movieId))?.data?.results);

            await checkIfMovieIsAtLeastInOneList();

            setCanShowMovieGenres(true);
            setIsLoadingModalVisible(false);
        } catch (err) {

            setIsLoadingModalVisible(false);

        }

        setIsLoadingModalVisible(false);


    }

    async function checkIfMovieIsAtLeastInOneList() {

        setMovieIsAtLeastInOneList(false);
        const userToken = await asyncStorage.ASuser.getData("user_token");
        const userId = await asyncStorage.ASuser.getData("user_id");

        const response = await myApiFunctions.getUserLists({ token: userToken, userId });

        if (response.error) {
            console.error(response.msg);
            return;
        }

        const { lists } = response;


        const { id, movie, name } = lists;


        lists.forEach(function (list) {
            const { movie: movies } = list;



            movies.forEach(function (movie) {
                if (movie.TMDBid == movieId) {
                    setMovieIsAtLeastInOneList(true);
                }
            });
        });
    }

    useEffect(function () {
        movieId = route?.params?.movieId;
    }, []);


    useEffect(function () {
        loadData();
        setIsLoadingModalVisible(false);

    }, [route, movieId, isScreenFocused, canUpdateScreen]);


    function returnMovieGenres(movie) {
        const quantitiesOfGenres = 2;
        const allGenres = movie['genres'];
        const genres = [];

        for (let i = 0; i < quantitiesOfGenres; i++) {

            const currentGenre = allGenres[i];

            if (currentGenre) {
                genres.push(currentGenre);
            }
        }

        return genres;


    }

    function handleFavoriteButtonClick() {

        setIsModalVisible(true);
    }

    return (

        <View style={styles.container}>

            <View style={styles.imgView}>


                <ImageBackground
                    style={styles.img}
                    source={{ uri: `${apiConfig.imgBaseURL}/${movie.backdrop_path}` }}
                >
                    <LinearGradient
                        colors={[theme.colors.background, "rgba(0,0,0,0.2)", theme.colors.background]}
                        style={{
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}
                    ></LinearGradient>
                </ImageBackground>


            </View>

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
                                {
                                    movie.vote_average
                                }
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.favoriteView}
                            onPress={() => {
                                handleFavoriteButtonClick();
                            }}
                            activeOpacity={0.9}
                        >
                            <MaterialIcons
                                name={movieIsAtLeastInOneList ? "favorite" : "favorite-outline"}
                                size={32}
                                color={theme.colors.secondaryInformation}
                            />
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
                                                    <GenreCategory key={genre?.id}>{genre?.name}</GenreCategory>
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

                <MovieListHorizontal
                    title="Related Movies"
                    movieList={relatedMovies}
                    navigation={navigation}
                />
            </ScrollView>

            <ModalView
                visible={isModalVisible}
            >
                <ListOfMovieList
                    canUpdateScreen={canUpdateScreen}
                    setCanUpdateScreen={setCanUpdateScreen}
                    setIsModalVisible={setIsModalVisible}
                    TMDBmovieId={movieId}
                />
            </ModalView>

            <LoadingModal setIsLoadingModalVisible={setIsLoadingModalVisible} visible={isLoadingModalVisible} />

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
    gradient: {
        flex: 1,
        zIndex: 100,

    },
    img: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
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

    },
});
