import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { theme } from "../../global/theme";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { MovieSection } from '../../components/MovieSection'
import { api, apiFunctions } from "../../services/api";

export function ListOfMovies() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function loadData() {
            setMovies((await apiFunctions.getPopular(1)).data.results);



        }

        loadData()

    }, [])

    const navigation = useNavigation();

    function handleGoBackClick() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity
                    onPress={function () {
                        handleGoBackClick();
                    }}
                >
                    <AntDesign name="left" size={24} color={theme.colors.text} />

                </TouchableOpacity>

                <Text style={styles.title}>Main list</Text>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteText}>Delete list</Text>
                        <MaterialIcons name="delete" size={18} color={theme.colors.secondary} />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <MovieSection movieList={movies} navigation={navigation} showTitle={false} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 62,
        marginHorizontal: 24,
        marginBottom: 40,
    },
    title: {
        color: theme.colors.text,
        fontSize: 24,
    },
    deleteButton: {
        backgroundColor: theme.colors.gray,
        flexDirection: "row",
        width: 132,
        height: 36,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 20,
        paddingHorizontal: 16
    },
    deleteText: {
        fontSize: 14,
        color: theme.colors.inactiveTabBar,
    },
    content: {
        marginHorizontal: 24,
    },
});