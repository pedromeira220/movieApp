import React from "react";

import { View, Text, StyleSheet, TextInput } from "react-native";
import { theme } from "../../global/theme";
import { Ionicons } from '@expo/vector-icons'

export function InputWithIcon({ placeholder, Icon }) {
    return (
        <View style={styles.containerInput}>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {Icon}

            </View>

            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#BBBBBB"
                style={styles.movieInput}
                keyboardAppearance="dark"
                onChangeText={(text) => {
                    handleInputChange(text);
                }}
            ></TextInput>

        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        backgroundColor: theme.colors.gray,

        color: theme.colors.text,
        padding: 16,
        marginTop: 32,
        borderRadius: 24,
        flexDirection: 'row',
    },
    movieInput: {
        marginLeft: 16,
        height: "100%",
        width: "100%",
        color: "#ffffff",
        fontSize: 16,
        paddingRight: 16,

    },

})








