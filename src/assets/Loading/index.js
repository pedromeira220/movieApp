import React from 'react';
import {
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { theme } from '../../global/theme';


export function Loading({ color = theme.colors.text, size = "small", ...rest }) {
    return (
        <>
            <ActivityIndicator
                color={color}
                size={size}
                {...rest}
            />
        </>
    )
}


const styles = StyleSheet.create({

});