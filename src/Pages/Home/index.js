import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { MovieItemBig } from '../../components/MovieItemBig';
import { theme } from '../../global/theme';


export function Home() {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.namePrimary}>Stream </Text>
                    <Text style={styles.name}>Everywhere</Text>
                    
                </View>


                <View style={styles.trendingMovieSection}>
                    <Text style={styles.title}>Trending</Text>

                    <ScrollView horizontal={true} >
                        <MovieItemBig
                            title="doutor estranho"
                            image="https://www.themoviedb.org/t/p/w220_and_h330_face/iM1hlVGZ5Qwn3gO6ewTszY7OrLY.jpg"
                            rating="8.4"
                        />
                        <MovieItemBig
                            title="de volta para o futuro"
                            image="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4BTW7PyEYFUFlNpuSeS9hAbpk9P.jpg"
                            rating="8.4"
                        />
                        <MovieItemBig
                            title="doutor estranho"
                            image="https://www.themoviedb.org/t/p/w220_and_h330_face/iM1hlVGZ5Qwn3gO6ewTszY7OrLY.jpg"
                            rating="8.4"
                        />

                    </ScrollView>

                </View>


            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: "row",
        marginHorizontal: 24,
        marginTop: 40,
        marginBottom: 24,
    },
    name: {
        color: theme.colors.text,
        fontSize: 24,
        fontWeight: 'bold',

    },
    namePrimary: {
        color: theme.colors.primary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    trendingMovieSection: {
    },
    title: {
        marginHorizontal: 24,
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 16,
    },
   
})

