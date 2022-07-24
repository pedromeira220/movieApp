import React from 'react';
import { Modal, StyleSheet, Text, View, Dimensions } from 'react-native';
import { theme } from '../../global/theme';


export function SuccessModal({ message, color = theme.colors.success, ...rest }) {

    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

    return (
        <Modal
            style={styles.container}
            transparent={true}
            animationType="fade"
            {...rest}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, {
                    marginTop: screenHeight * 0.90,
                    marginBottom: 30,
                    backgroundColor: color
                }]}>
                    <View style={styles.bar} />
                    <Text style={styles.title}>{message}</Text>
                </View>

            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({
    overlay: {
        flex: 1,


    },
    container: {
        flex: 1,

        borderRadius: 16,
        marginHorizontal: 24,
        justifyContent: "center",
        alignItems: "center"

    },
    title: {
        fontSize: 16,
        color: theme.colors.text,
    },
});