import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';

import { MovieSection } from '../../components/MovieSection'
import { asyncStorage } from '../../services/asyncStorage';
import { apiFunctions } from '../../services/api';


export function MovieListScreen({ navigation }) {

    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(function () {
        loadData()
    }, []);

    useEffect(function () {
        loadData()
    }, [favoriteMovies]);

    async function loadData() {
        const favoriteMoviesString = (await asyncStorage.ASmovieList.getData("favoriteMovies"));
        const favoriteMovies= JSON.parse(favoriteMoviesString);
        setFavoriteMovies(favoriteMovies);



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

