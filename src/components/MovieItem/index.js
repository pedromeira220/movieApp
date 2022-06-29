import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';
import { navigateToDetails } from '../publicFunctions/navigateToDetails';

export function MovieItem({ poster, title, releaseDate, navigation, movieId }) {
    return (
        <TouchableOpacity
        onPress={() => {
            navigateToDetails(navigation, movieId )
        }}
        style={styles.container}>
            <Image
                source={{ uri: poster }}
                style={styles.image}
            />
            <View style={styles.titleView}>

                <Text style={styles.title}
                    numberOfLines={1}
                >
                    {title}

                </Text>


                <Text style={styles.releaseDateTitle}>
                    {"\n"}
                    ({releaseDate})
                </Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: 152,
        marginRight: 0,
    },
    titleView: {
        marginTop: 8,
        width: "100%",
    },
    title: {
        color: theme.colors.text,
        fontSize: 16,
    },
    releaseDateTitle: {
        marginTop: -16,
        color: "#BCBCBC",
        fontSize: 16,
    },
    image: {
        width: 152,
        height: 184,
        borderRadius: 24,
    },
});