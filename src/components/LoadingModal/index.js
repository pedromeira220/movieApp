import React, { useEffect, useState } from "react"
import { Modal, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { theme } from "../../global/theme";
import { Loading } from "../Loading";


export function LoadingModal({ setIsLoadingModalVisible, ...rest }) {

    useEffect(function () {
        setTimeout(() => {
            setIsLoadingModalVisible(false);
        }, 5000);
    }, [])


    return (

        <Modal
            transparent
            animationType="fade"
            {...rest}
        >


            <View style={styles.overlay}>
                <View style={styles.container}>

                    <Loading />
                </View>

            </View>


        </Modal>

    )
}


const styles = StyleSheet.create({
    overlay: {

        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        height: 100,
        width: 100,
        borderRadius: 16,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
    },

});