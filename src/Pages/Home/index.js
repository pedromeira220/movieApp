import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';

import { MovieSection } from '../../components/MovieSection';
import PopularMoviesSection from '../../components/PopularMoviesSection';

import { Ionicons } from '@expo/vector-icons';

import { credentials } from '../../global/credentials';
import { theme } from '../../global/theme';
import { api, apiConfig, apiFunctions } from '../../services/api';
import { asyncStorage } from '../../services/asyncStorage';
import { myApiFunctions } from '../../services/backend';
import { logOut } from '../../utils/logOut';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../utils/contexts/AuthContext';
import { MovieSectionHorizontal } from '../../components/MovieSectionHorizontal';
import { Loading } from '../../components/Loading';




export function Home({ }) {

    const auth = useContext(AuthContext);
    const isScreenFocused = useIsFocused();

    const navigation = useNavigation();

    const platform = Platform.OS;

    const [movie, setMovie] = useState({});
    const [isLoadingMovies, setIsLoadingMovies] = useState(false);

    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);


    const route = useRoute();

    async function loadData() {

        auth.checkInternetConnection();
        setIsLoadingMovies(true);



        setPopularMovies((await apiFunctions.getPopular(1)).data.results);
        setTopRatedMovies((await apiFunctions.getPopular(2)).data.results);
        setNowPlayingMovies((await apiFunctions.getNowPlaying()).data.results);
        setUpcomingMovies((await apiFunctions.getUpcoming()).data.results);

        const user = {
            id: await asyncStorage.ASuser.getData("user_id"),
            token: await asyncStorage.ASuser.getData("user_token"),
        }


        setIsLoadingMovies(false);




    }


    function handleLogOut() {

        Alert.alert("Log out", "Are you sure you want to log out?", [
            {
                text: "Cancel", onPress: function () {

                }
            },
            {
                text: "Yes", onPress: function () {
                    logOut();
                    auth.logOut();
                }
            },

        ]);


    }
    useEffect(() => {



        loadData();

        return function () {
            setPopularMovies([]);
            setTopRatedMovies([]);
        }

    }, []);

    useEffect(() => {



        loadData();

        return function () {
            setPopularMovies([]);
            setTopRatedMovies([]);
        }

    }, [route, navigation, isScreenFocused]);
    return (
        <>

            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
            >

                <SafeAreaView style={{
                    backgroundColor: theme.colors.background,
                    marginTop: platform == 'android' ? 24 : 0,
                }}>
                    <View style={styles.header}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={styles.namePrimary}>Movie{" "}</Text>
                            <Text style={styles.name}>App</Text>
                        </View>
                        <TouchableOpacity
                            onPress={handleLogOut}
                        >
                            <Ionicons name="exit" size={36} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>


                </SafeAreaView>
                {
                    isLoadingMovies ? (
                        <View style={styles.loadingView}>
                            <Loading />
                        </View>
                    ) : (
                        <>
                            <PopularMoviesSection
                                movieList={popularMovies}
                                navigation={navigation}
                            />

                            <View style={styles.main}>

                                {
                                    !isLoadingMovies && (
                                        <>
                                            <MovieSectionHorizontal
                                                showTitle={true}
                                                title="Top rating"
                                                movieList={topRatedMovies}
                                                navigation={navigation}
                                            />

                                            <MovieSectionHorizontal
                                                showTitle={true}
                                                title="Up coming"
                                                movieList={upcomingMovies}
                                                navigation={navigation}
                                            />
                                            <MovieSectionHorizontal
                                                showTitle={true}
                                                title="Now playing"
                                                movieList={nowPlayingMovies}
                                                navigation={navigation}
                                            />

                                        </>
                                    )
                                }
                            </View>


                        </>
                    )
                }


            </ScrollView>
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
        marginHorizontal: 24,
        marginTop: 20,
        marginBottom: 24,
        justifyContent: "space-between"
    },
    name: {
        color: theme.colors.text,
        fontSize: theme.sizes.title.fontSize,
        fontWeight: 'bold',

    },
    namePrimary: {
        color: theme.colors.primary,
        fontSize: theme.sizes.title.fontSize,
        fontWeight: 'bold',
    },
    main: {
        marginTop: 56,
        width: "100%",
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
/*

<MovieSection
                        isLoadingMovies={isLoadingMovies}
                        title="Top Rated"
                        showTitle={true}
                        movieList={topRatedMovies}
                        navigation={navigation}
/>
*/ 