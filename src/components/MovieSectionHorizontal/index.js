import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { theme } from '../../global/theme';
import { MovieItem } from '../MovieItem';
import { api, apiConfig, apiFunctions } from '../../services/api';
import { Loading } from '../Loading'

export function MovieSectionHorizontal({ title, showTitle, movieList, canShowInterstitialAds, setCanShowInterstitialAds, navigation, ListEmptyComponent, isLoadingMovies = false }) {

    useEffect(function () {

    }, []);


    return (
        <View style={styles.container}>


            {
                showTitle && (

                    <Text style={styles.title}>{title}</Text>
                )
            }


            <View style={styles.movieListContainer}>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    ListEmptyComponent={<Loading />}
                    data={movieList}
                    renderItem={({ item }) => {
                        return (
                            <MovieItem
                                canShowInterstitialAds={canShowInterstitialAds}
                                setCanShowInterstitialAds={setCanShowInterstitialAds}
                                marginRight={12}
                                key={item.id}
                                poster={`${apiConfig.imgBaseURL}/${item.poster_path}`}
                                title={item.title}
                                releaseDate={2020}
                                navigation={navigation}
                                movieId={item.id}
                            />
                        )
                    }}
                    style={styles.movieList}
                />

            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    movieListContainer: {
        width: "100%",
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
        marginLeft: 24
    },
    movieList: {
        paddingHorizontal: 24
    },
})

