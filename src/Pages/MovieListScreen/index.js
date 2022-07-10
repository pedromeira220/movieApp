import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';

import { MovieSection } from '../../components/MovieSection'
import { asyncStorage } from '../../services/asyncStorage';
import { apiFunctions } from '../../services/api';

import { useIsFocused } from '@react-navigation/native';


export function MovieListScreen({ navigation }) {

    const isFocused = useIsFocused();


    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(function () {

        loadData()
        
    }, [isFocused]);


    async function loadData() {

        const favoriteMoviesString = (await asyncStorage.ASmovieList.getData("favoriteMovies"));
        const favoriteMoviesParsed= JSON.parse(favoriteMoviesString);
        setFavoriteMovies(favoriteMoviesParsed);
    }

    return (
        <SafeAreaView style={styles.container}

        >
            <View style={styles.header}


            >

                <Text style={styles.title}>
                    Add movies to your favorites
                </Text>
            </View>

            <View style={styles.content}>

                <MovieSection
                    movieList={favoriteMovies}
                    navigation={navigation}
                    showTitle={false}

                />

            </View>


        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        marginTop: 31
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    },
    content: {
        paddingHorizontal: 24
    },
});

