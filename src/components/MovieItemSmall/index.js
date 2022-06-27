import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../../global/theme';

export default function MovieItemSmall({ title, poster }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: poster }}
                resizeMode="cover"
            />
            <Text
                style={styles.title}
                numberOfLines={2}
            >
                {title}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: 142,
        marginRight: 16,
    },
    img: {
        width: "100%",
        height: 106,
        borderRadius: 24,
    },
    title: {
        marginTop: 16,
        fontSize: 12,
        color: theme.colors.text,
    },

});