import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

import { MovieItemBig } from '../../components/MovieItemBig';
import { theme } from '../../global/theme';
import { api, apiConfig, apiFunctions } from '../../services/api';
import { Loading } from '../Loading';



export default function movieListSection({ movieList, navigation, isLoadingMovies }) {
    return (
        <>
            <View style={styles.trendingMovieSection}>
                <Text style={styles.title}>Popular movies</Text>



            </View>

            {
                isLoadingMovies ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        <FlatList

                            horizontal={true}
                            style={styles.trendingMovies}
                            showsHorizontalScrollIndicator={false}
                            data={movieList}
                            renderItem={({ item }) => {
                                return (
                                    <MovieItemBig
                                        key={item.id}
                                        title={item.title}
                                        image={`${apiConfig.imgBaseURL}/${item.poster_path}`}
                                        rating={item.vote_average}
                                        navigation={navigation}
                                        movieId={item.id}
                                    />
                                )
                            }}
                        />
                    </>
                )
            }









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




/*
<MovieItemBig
                                key={movie.id}
                                title={movie.title}
                                image={`${apiConfig.imgBaseURL}/${movie.poster_path}`}
                                rating={movie.vote_average}
                                navigation={navigation}
                                movieId={movie.id}
                            />
*/