import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { theme } from '../../global/theme';
import {MovieItem} from '../MovieItem';

export function MovieSection({title}) {
 return (
   <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.movieList}>
            <MovieItem 
                poster="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bzDAfXoqNAvWUe7uss2NE3BmRqy.jpg"
                title="Soul"
                releaseDate={2020}
            />
            <MovieItem 
                poster="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bzDAfXoqNAvWUe7uss2NE3BmRqy.jpg"
                title="Soul"
                releaseDate={2020}
            />
            <MovieItem 
                poster="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bzDAfXoqNAvWUe7uss2NE3BmRqy.jpg"
                title="Soul"
                releaseDate={2020}
            />
            <MovieItem 
                poster="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bzDAfXoqNAvWUe7uss2NE3BmRqy.jpg"
                title="Soul"
                releaseDate={2020}
            />
            <MovieItem 
                poster="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bzDAfXoqNAvWUe7uss2NE3BmRqy.jpg"
                title="Soul"
                releaseDate={2020}
            />
        </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 56,
        marginHorizontal: 24,
        width: Dimensions.get('window').width - 48,
    },
    movieList: {
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        fontSize:  theme.sizes.title.fontSize,
        color: theme.colors.text,
        marginBottom: 16,
    }
})