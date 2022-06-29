import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { MovieItemBig } from '../../components/MovieItemBig';
import { theme } from '../../global/theme';
import { api, apiConfig, apiFunctions } from '../../services/api';



export default function movieListSection({ movieList, navigation }) {
    return (
        <>
            <View style={styles.trendingMovieSection}>
                <Text style={styles.title}>Popular movies</Text>



            </View>

            <ScrollView
                horizontal={true}
                style={styles.trendingMovies}
                showsHorizontalScrollIndicator={false}
            >


                {
                    movieList &&
                    movieList.map((movie) => {
                        return (

                            <MovieItemBig
                                key={movie.id}
                                title={movie.title}
                                image={`${apiConfig.imgBaseURL}/${movie.poster_path}`}
                                rating={movie.vote_average}
                                navigation={navigation}
                                movieId={movie.id}
                            />


                        )
                    })
                }


            </ScrollView>
        </>


    );
}

const styles = StyleSheet.create({
    trendingMovieSection: {
        marginLeft: 24,
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    },
})