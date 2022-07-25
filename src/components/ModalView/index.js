import react from "react";

import {
    View,
    Modal,
    StyleSheet,
    Platform
} from 'react-native'
import { theme } from "../../global/theme";



export function ModalView({ children, ...rest }) {

    const platform = Platform.OS;

    return (
        <Modal
            statusBarTranslucent={true}
            transparent
            animationType="slide"
            {...rest}
        >

            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.bar} />
                    {children}
                </View>

            </View>

        </Modal>
    )
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
    },
    container: {
        flex: 1,
        marginTop: 100,
        backgroundColor: theme.colors.background,

    },
    bar: {
        width: 39,
        height: 2,
        borderRadius: 2,
        backgroundColor: theme.colors.gray,
        alignSelf: "center",
        marginTop: 13,
        marginBottom: 24
    },
});