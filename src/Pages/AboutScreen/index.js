import { ThemeProvider } from '@react-navigation/native';
import React from 'react';

import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { MovieListItem } from '../../components/MovieListItem';
import { theme } from '../../global/theme';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';


export function AboutScreen() {
    return (
        <View
            style={styles.container}
        >
            <SafeAreaView
                style={styles.header}
            >
                <Text style={[styles.title, {
                    marginTop: 24
                }]}>About</Text>

            </SafeAreaView>

            <View
                style={styles.content}
            >
                <MovieListItem
                    title="Settings"
                    Icon={<Ionicons name="settings-sharp" size={20} color={theme.colors.text} />}
                    onPress={() => {

                    }}
                />
                <MovieListItem
                    title="About the developer"
                    Icon={<FontAwesome name="user" size={20} color={theme.colors.text} />}
                    onPress={() => {

                    }}
                />
                <MovieListItem
                    title="Support developer"
                    Icon={<Ionicons name="code" size={20} color={theme.colors.text} />}
                    onPress={() => {

                    }}
                />
                <MovieListItem
                    title="Share this app"
                    Icon={<Entypo name="share" size={20} color={theme.colors.text} />}
                    onPress={() => {

                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        marginHorizontal: 24,

    },
    title: {
        color: theme.colors.text,
        fontSize: 24,

    },
    content: {
        marginHorizontal: 24,
        marginTop: 32,
    },
})