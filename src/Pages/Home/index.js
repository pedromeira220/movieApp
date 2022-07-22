import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

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




export function Home({ }) {

    const auth = useContext(AuthContext);
    const isScreenFocused = useIsFocused();

    const navigation = useNavigation();

    const [movie, setMovie] = useState({});
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const route = useRoute();

    async function loadData() {

        auth.checkInternetConnection();

        setPopularMovies((await apiFunctions.getPopular(1)).data.results);
        setTopRatedMovies((await apiFunctions.getPopular(3)).data.results);

        const user = {
            id: await asyncStorage.ASuser.getData("user_id"),
            token: await asyncStorage.ASuser.getData("user_token"),
        }

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

                <PopularMoviesSection
                    movieList={popularMovies}
                    navigation={navigation}
                />

                <View style={styles.main}>


                    <MovieSection
                        title="Top Rated"
                        showTitle={true}
                        movieList={topRatedMovies}
                        navigation={navigation}
                    />
                </View>




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
        marginHorizontal: 24,
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    },

})

