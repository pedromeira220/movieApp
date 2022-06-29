import React from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "../../global/theme";

import { navigateToDetails } from "../publicFunctions/navigateToDetails";

export function MovieItemBig({ rating, image, title, navigation, movieId }) {
    return (

        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigateToDetails(navigation, movieId);

            }}
        >
            <Image
                source={{ uri: image }}
                style={styles.img}

            />


            <View style={styles.viewTop}>
                <AntDesign name="star" size={16} color="#F3BE00" />
                <Text style={styles.title}>{rating}

                </Text>
            </View>



            <View style={styles.viewBottom}
            >
                <Text style={styles.title}
                    numberOfLines={2}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>


    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 224,
        marginLeft: 24,
    },
    img: {
        width: 224,
        height: 292,
        resizeMode: 'cover',
        borderRadius: 32,
    },
    title: {
        fontSize: 18,
        color: theme.colors.text,
    },

    viewTop: {
        backgroundColor: "rgba(50, 50, 50, 0.9))",
        flexDirection: 'row',
        width: 80,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        position: 'absolute',
        top: 16,
        right: 16,

    },

    viewBottom: {
        top: 240 - 44,
        left: 16,
        right: 16,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        backgroundColor: "rgba(50, 50, 50, 0.9))",
        borderRadius: 16,
        paddingHorizontal: 16,


    },
    imgBlur: {
        position: 'absolute',
        borderRadius: 32,
    },
    imgBlurBig: {
        zIndex: -1,
        position: 'absolute',
        borderRadius: 16,
        height: 72,
        width: "100%",
    }

})