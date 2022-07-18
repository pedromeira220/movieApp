import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';

import { MovieSection } from '../../components/MovieSection';
import PopularMoviesSection from '../../components/PopularMoviesSection';

import { credentials } from '../../global/credentials';
import { theme } from '../../global/theme';
import { api, apiConfig, apiFunctions } from '../../services/api';
import { asyncStorage } from '../../services/asyncStorage';
import { myApiFunctions } from '../../services/backend';


export function Home({ navigation }) {

    const [movie, setMovie] = useState({});
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {

        async function loadData() {
            setPopularMovies((await apiFunctions.getPopular(1)).data.results);
            setTopRatedMovies((await apiFunctions.getPopular(3)).data.results);

            const user = {
                id: await asyncStorage.ASuser.getData("user_id"),
                token: await asyncStorage.ASuser.getData("user_token"),
            }

        }

        loadData()

    }, [])
    return (
        <>

            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
            >

                <SafeAreaView style={{
                    backgroundColor: theme.colors.background,
                }}>
                    <View style={styles.header}>
                        <Text style={styles.namePrimary}>Stream </Text>
                        <Text style={styles.name}>Everywhere</Text>

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

