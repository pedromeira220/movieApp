import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../global/theme';

export function GenreCategory({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {
                    children
                }
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        borderColor: "#4e4e54",
        borderWidth: 1,
        backgroundColor: "#201f27",
        padding: 8,
        borderRadius: 16,
        marginRight: 12,
        minWidth: 60,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: theme.colors.secondaryInformation,
        fontSize: 12,
        
    },
});