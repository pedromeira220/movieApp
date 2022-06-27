import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';

import { MovieItemBig } from '../../components/MovieItemBig';
import { MovieSection } from '../../components/MovieSection';

import { credentials } from '../../global/credentials';
import { theme } from '../../global/theme';
import { api, apiConfig, apiFunctions } from '../../services/api';


export function Home() {

    const [movie, setMovie] = useState({});
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {

        async function loadData() {
            const movieId = ((await apiFunctions.getMovieByName("homem aranha")).data.results[0].id)
            setMovie((await apiFunctions.getMovie(movieId)).data)
            setPopularMovies((await apiFunctions.getPopular()).data.results);
            console.log(popularMovies)

        }

        loadData()

    }, [])
    return (
        <>

            <ScrollView style={styles.container}>

                <SafeAreaView style={{
                    backgroundColor: theme.colors.background,
                }}>
                    <View style={styles.header}>
                        <Text style={styles.namePrimary}>Stream </Text>
                        <Text style={styles.name}>Everywhere</Text>

                    </View>
                </SafeAreaView>

                <View style={styles.main}>
                    <View style={styles.trendingMovieSection}>
                        <Text style={styles.title}>Popular movies</Text>

                        <ScrollView
                            horizontal={true}
                            style={styles.trendingMovies}
                            showsHorizontalScrollIndicator={false}
                        >


                            {   
                                popularMovies &&
                                popularMovies.map((popularMovie) => {
                                    return (
                                        <MovieItemBig
                                            title={popularMovie.title}
                                            image={`${apiConfig.imgBaseURL}/${popularMovie.poster_path}`}
                                            rating={popularMovie.vote_average}
                                        />
                                    )
                                })
                            }


                        </ScrollView>

                    </View>

                    <MovieSection
                        title="Recommendations"
                        showTitle={true}
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
        marginTop: 40,
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
        marginHorizontal: 24,
    },
    trendingMovies: {
        borderRadius: 32,
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    },

})

