import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../global/theme';
import { apiConfig } from '../../services/api';
import MovieItemSmall from '../MovieItemSmall';

export default function MovieListHorizontal({ title, movieList }) {
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
      >

        {
          movieList.map((movie) => {
            return (
              <MovieItemSmall
                key={movie.id}
                title={movie.title}
                poster={`${apiConfig.imgBaseURL}/${movie.poster_path}`}
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
  title: {
    marginBottom: 16,
    fontSize: 24,
    color: theme.colors.text,
  },
});