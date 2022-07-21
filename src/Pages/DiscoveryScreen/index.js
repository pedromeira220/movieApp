import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput } from "react-native";
import { theme } from "../../global/theme";

import { Ionicons } from '@expo/vector-icons';
import { MovieCategory } from "../../components/MovieCategory";
import { MovieSection } from "../../components/MovieSection";
import { api, apiConfig, apiFunctions } from '../../services/api';


export function DiscoveryScreen({ navigation }) {
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {

        async function loadData() {
            setTopRatedMovies((await apiFunctions.getPopular(2)).data.results);
        }

        loadData();

        return function () {
            setTopRatedMovies([]);
        }

    }, []);

    async function handleInputChange(text) {

        if (!text) {
            setTopRatedMovies((await apiFunctions.getPopular(2)).data.results);
        } else {
            setTopRatedMovies((await apiFunctions.getListByMovieName(text)).data.results);
        }

    }
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{
                    backgroundColor: theme.colors.background,
                }}
            >
                <View style={styles.header}>

                    <Text style={styles.title}>Find Movies, Tv series, and more...</Text>
                </View>
            </SafeAreaView>

            <View style={styles.main}>

                <View style={styles.containerInput}>

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Ionicons name="search" size={24} color={theme.colors.text} />

                    </View>

                    <TextInput
                        placeholder="Movie Name"
                        placeholderTextColor="#BBBBBB"
                        style={styles.movieInput}
                        keyboardAppearance="dark"
                        onChangeText={(text) => {
                            handleInputChange(text);
                        }}
                    ></TextInput>

                </View>



                <View style={{
                    marginTop: 36
                }}>
                    <MovieSection
                        showTitle={false}
                        movieList={topRatedMovies}
                        navigation={navigation}
                    />
                </View>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        color: theme.colors.text,

    },
    header: {
        marginTop: 40,
        marginHorizontal: 24,
    },
    main: {
        marginHorizontal: 24,
    },
    containerInput: {
        backgroundColor: theme.colors.gray,

        color: theme.colors.text,
        padding: 16,
        marginTop: 32,
        borderRadius: 24,
        flexDirection: 'row',
    },
    movieInput: {
        marginLeft: 16,
        height: "100%",
        width: "100%",
        color: "#ffffff",
        fontSize: 16,
        paddingRight: 16,

    },

});

//<Ionicons name="search" size={24} color="black" />