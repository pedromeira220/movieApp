import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { theme } from '../../global/theme';

export function MovieItem({ poster, title, releaseDate }) {
 return (
   <View style={styles.container}>
        <Image 
            source={{uri: poster}}
            style={styles.image}
        />
        <View style={styles.titleView}>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.releaseDateTitle}>({releaseDate})</Text>
        </View>
   </View>
  );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    titleView: {
        marginTop: 16,
        flexDirection: "row",
    },
    title: {
        color: theme.colors.text,
        fontSize: 16,
    },
    releaseDateTitle: {
        color: "#BCBCBC",
        marginLeft: 4,
        fontSize: 16,

    },
    image:{
        width: 152,
        height: 184,
        borderRadius: 24,
    },
});