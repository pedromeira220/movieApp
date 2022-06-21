import React from "react";

import {View, Text, StyleSheet} from "react-native";

export function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})