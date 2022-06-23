import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { MovieItemBig } from '../../components/MovieItemBig';
import { MovieSection } from '../../components/MovieSection';
import { theme } from '../../global/theme';


export function Home() {
    return (
        <>

            <ScrollView style={styles.container}>

                <SafeAreaView style={{
                    backgroundColor: theme.colors.background,
                }}>
                    <View style={styles.header}>
                        <Text style={styles.namePrimary}>Stream </Text>
                        <Text style={styles.name}>Everywhere</Text>

                    </View>
                </SafeAreaView>

                <View style={styles.main}>
                    <View style={styles.trendingMovieSection}>
                        <Text style={styles.title}>Trending</Text>

                        <ScrollView
                            horizontal={true}
                            style={styles.trendingMovies}
                            showsHorizontalScrollIndicator={false}
                        >
                            <MovieItemBig
                                title="Doutor Estranho"
                                image="https://www.themoviedb.org/t/p/w220_and_h330_face/iM1hlVGZ5Qwn3gO6ewTszY7OrLY.jpg"
                                rating="8.4"
                            />
                            <MovieItemBig
                                title="De volta para o futuro"
                                image="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4BTW7PyEYFUFlNpuSeS9hAbpk9P.jpg"
                                rating="8.3"
                            />
                            <MovieItemBig
                                title="Homem-Aranha: Sem Volta Para Casa"
                                image="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fVzXp3NwovUlLe7fvoRynCmBPNc.jpg"
                                rating="8.1"
                            />

                        </ScrollView>

                    </View>

                    <MovieSection
                        title="Recommendations"
                        showTitle={true}
                    />
                </View>




            </ScrollView>
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
        fontSize: theme.sizes.title.fontSize,
        fontWeight: 'bold',

    },
    namePrimary: {
        color: theme.colors.primary,
        fontSize: theme.sizes.title.fontSize,
        fontWeight: 'bold',
    },
    main: {
        marginHorizontal: 24,
    },
    trendingMovies: {
        borderRadius: 32,
    },
    title: {
        fontSize: theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    },

})

