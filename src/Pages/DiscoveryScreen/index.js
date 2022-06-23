import React from "react";

import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput } from "react-native";
import { theme } from "../../global/theme";

import { Ionicons } from '@expo/vector-icons'; 

export function DiscoveryScreen() {
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
                <TextInput
                    placeholder="Movie Name"
                    placeholderTextColor="#BBBBBB"
                    style={styles.movieInput}
                ></TextInput>
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
    movieInput: {
        backgroundColor: theme.colors.gray,
        height: 48,
        borderRadius: 20,
        color: theme.colors.text,
        padding: 16,
        marginTop: 32,
    },
});

//<Ionicons name="search" size={24} color="black" />