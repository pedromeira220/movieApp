import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';

export default function MovieItemSmall({ title, poster, navigation }) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailsScreen');
            }}
            style={styles.container}>
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
        </TouchableOpacity>
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