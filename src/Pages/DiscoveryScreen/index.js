import React from "react";

import {View, Text, StyleSheet} from "react-native";

export function DiscoveryScreen() {
    return (
        <View style={styles.container}>
            <Text>Discovery Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})