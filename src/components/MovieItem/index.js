import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { theme } from '../../global/theme';

export function MovieItem({ poster, title, releaseDate }) {
    return (
        <View style={styles.container}>
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
        </View>
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