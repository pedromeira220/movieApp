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

                <View style={styles.containerInput}>

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Ionicons name="search" size={24} color="#ffffff"

                    />

                    </View>

                    <TextInput
                        placeholder="Movie Name"
                        placeholderTextColor="#BBBBBB"
                        style={styles.movieInput}
                    ></TextInput>
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