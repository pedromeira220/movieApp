import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Loading } from "../../components/Loading";
import { theme } from "../../global/theme";
import { PrimaryGradient } from '../PrimaryGradient';




export function PrimaryButton({ color, disabledColor, text, textColor, isLoading = false, onPress, ...rest }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}

            disabled={isLoading}
            {...rest}
        >
            <PrimaryGradient
                style={[styles.container, {
                    backgroundColor: isLoading ? disabledColor : color
                }]}
            >


                {
                    isLoading ? (
                        <Loading />
                    )
                        : (
                            <Text style={[styles.title, {
                                color: textColor,
                            }]}>{text}</Text>
                        )
                }


            </PrimaryGradient>
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