import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../global/theme";

import { AntDesign } from '@expo/vector-icons';

export function MovieListItem({ title, Icon }) {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                minWidth: 99,

                alignItems: "center"
            }}>
                {Icon}
                <Text numberOfLines={1} style={styles.listName}>{title}</Text>
            </View>
            <View>
                <AntDesign name="right" size={24} color={theme.colors.text} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.gray,
        width: "100%",
        padding: 16,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 20,
        paddingHorizontal: 14,
        marginBottom: 18
    },
    listName: {
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 20,
    },
});