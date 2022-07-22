import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { theme } from '../../global/theme';
import { MovieItem } from '../MovieItem';
import { api, apiConfig, apiFunctions } from '../../services/api';


export function MovieSection({ title, showTitle, movieList, navigation }) {
    return (
        <View style={styles.container}>


            {
                showTitle && (

                    <Text style={styles.title}>{title}</Text>
                )
            }
            <View style={styles.movieList}>
                {
                    movieList.map((movie) => {
                        return (
                            <MovieItem
                                key={movie.id}
                                poster={`${apiConfig.imgBaseURL}/${movie.poster_path}`}
                                title={movie.title}
                                releaseDate={2020}
                                navigation={navigation}
                                movieId={movie.id}
                            />
                        )
                    })
                }
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 48,
    },
    movieList: {
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    }
})