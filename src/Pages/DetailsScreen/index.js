import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { theme } from "../../global/theme";
import { AntDesign } from '@expo/vector-icons';
import { GenreCategory } from "../../components/GenreCategory";
import MovieListHorizontal from "../../components/MovieListHorizontal";
import { apiFunctions } from "../../services/api";

export function DetailsScreen() {

    const [ relatedMovies, setRelatedMovies ] = useState([]);

    useEffect(()=> {

        async function loadData() {
            setRelatedMovies((await apiFunctions.getRecommendations(634649)).data.results);
        }
        loadData()


    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imgView}>
                <Image
                    style={styles.img}
                    source={{ uri: "https://image.tmdb.org/t/p/w500/zGLHX92Gk96O1DJvLil7ObJTbaL.jpg" }}
                />
            </View>

            <ScrollView style={styles.main}>
                <View style={styles.primaryInformation}>
                    <Text style={styles.title}>
                        Star Wars: O último Jedi
                    </Text>
                    <View style={styles.secondaryInformationContainer}>
                        <View style={styles.secondaryInformation}>
                            <AntDesign name="clockcircleo" size={24} color={theme.colors.secondaryInformation} />
                            <Text style={[styles.minorTitle, {
                                marginLeft: 8,

                            }]}>
                                152 minutes
                            </Text>
                        </View>


                        <View style={styles.secondaryInformation}>
                            <AntDesign name="star" size={24} color={theme.colors.secondaryInformation} />
                            <Text style={[styles.minorTitle, {
                                marginLeft: 8,

                            }]}>
                                7.0
                            </Text>
                        </View>

                    </View>



                </View>

                <View style={styles.tertiaryInformationContainer}>
                    <View style={{
                        width: "50%"
                    }}>
                        <Text style={[styles.minorTitle, {
                            color: theme.colors.text

                        }]}>
                            Release date
                        </Text>

                        <Text style={[{
                            color: theme.colors.secondaryInformation,
                            fontSize: 12,
                            marginTop: 16,
                        }]}>
                            December 9, 2017
                        </Text>
                    </View>

                    <View style={{
                        width: "50%"
                    }}>
                        <Text style={[styles.minorTitle, {
                            color: theme.colors.text
                        }]}>
                            Genre
                        </Text>

                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            marginTop: 8,
                            marginBottom: 16,
                        }}>
                            <GenreCategory>
                                Action
                            </GenreCategory>

                            <GenreCategory>
                                Sci-Fi
                            </GenreCategory>
                        </View>
                    </View>
                </View>

                <View style={{
                    marginVertical: 16,
                }}>
                    <Text style={[styles.minorTitle, {
                        color: theme.colors.text
                    }]}>
                        Synopsis
                    </Text>
                    <Text
                        style={[{
                            color: theme.colors.secondaryInformation,
                            fontSize: 12,
                            marginTop: 16,
                        }]}
                        numberOfLines={4}
                    >
                        Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam a descobrir o que realmente significa ser o Homem-Aranha...
                    </Text>
                </View>
                <MovieListHorizontal
                    title="Related Movies"
                    movieList={relatedMovies}
                />
            </ScrollView>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: theme.colors.background,
    },
    main: {
        marginTop: 16,
        paddingHorizontal: 24,
    },
    imgView: {
        width: "100%",
        height: "35%",
    },
    img: {
        width: "100%",
        height: "100%",

    },
    primaryInformation: {

        borderBottomWidth: 1,
        borderBottomColor: theme.colors.inactiveTabBar,


    },
    title: {
        fontSize: 24,
        color: theme.colors.text,
    },
    secondaryInformationContainer: {
        marginTop: 16,
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",

    },
    minorTitle: {
        color: theme.colors.secondaryInformation,
        fontSize: 12,
        fontWeight: 'bold',
    },
    secondaryInformation: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,


    },
    tertiaryInformationContainer: {
        flexDirection: "row",
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.inactiveTabBar,

    }
})