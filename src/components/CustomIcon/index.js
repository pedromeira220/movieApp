import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';

export function CustomIcon({ children, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={onPress}
        >
            <View
                style={styles.content}
            >
                {children}
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        top: -16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: 64,
        height: 64,
        borderRadius: 35,
        backgroundColor: theme.colors.primary
    },
});