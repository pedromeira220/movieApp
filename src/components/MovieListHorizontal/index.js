import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../global/theme';
import { apiConfig } from '../../services/api';
import MovieItemSmall from '../MovieItemSmall';

export default function MovieListHorizontal({ title, movieList, navigation }) {
  return (
    <View style={styles.container}>

      {
        title && (
          <Text style={styles.title}>
            {title}
          </Text>
        )
      }

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >

        {
          movieList.map((movie) => {
            return (
              <MovieItemSmall
                key={movie.id}
                title={movie.title}
                poster={`${apiConfig.imgBaseURL}/${movie.poster_path}`}
                navigation={navigation}
                movieId={movie.id}
              />
            )

          })
        }

      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  scrollView: {

  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    color: theme.colors.text,
  },
});