import React from "react";
import { StyleSheet } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../global/theme";

export function PrimaryGradient({ children, ...rest }) {
    return (
        <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            {...rest}
        >
            {children}
        </LinearGradient>
    )
}
