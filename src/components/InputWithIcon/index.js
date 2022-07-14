import React from "react";

import { View, Text, StyleSheet, TextInput } from "react-native";
import { theme } from "../../global/theme";
import { Ionicons } from '@expo/vector-icons'

export function InputWithIcon({ placeholder, canAutoFocus = false, Icon, onChangeText, cannotPutMarginTop = false, secureTextEntry = false, ...props }) {
    return (
        <View style={[styles.containerInput, {
            marginTop: cannotPutMarginTop ? 0 : 32,
        }]}>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {Icon}

            </View>

            <TextInput
                autoFocus={canAutoFocus}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor="#BBBBBB"
                style={styles.movieInput}
                keyboardAppearance="dark"
                onChangeText={onChangeText}
                {...props}
            ></TextInput>

        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        backgroundColor: theme.colors.gray,

        color: theme.colors.text,
        padding: 16,
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








