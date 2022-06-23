import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export function MovieCategory({ name, active }) {
 return (
   <View style={styles.container}>
        <Text style={[styles.name, {
            color: active == true ? theme.colors.primary : theme.colors.text,
        }]}>{name}</Text>

        {
            active && (
                <View style={styles.bottomLine}/>
            )
        }
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginRight: 24,
    },
    name: {
        fontSize: 16,
    },
    bottomLine: {
        marginTop: 4,
        width: 24,
        backgroundColor: theme.colors.primary,
        height: 3,
        borderRadius: 100,
    }
});