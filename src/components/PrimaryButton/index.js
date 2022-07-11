import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../global/theme";





export function PrimaryButton({ color, text, textColor, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, {
            backgroundColor: color
        }]}>
            <Text style={[styles.title, {
                color: textColor
            }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        marginTop: 24
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    }

})