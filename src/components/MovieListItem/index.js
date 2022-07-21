import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from "../../global/theme";

import { AntDesign } from '@expo/vector-icons';
import { Loading } from "../Loading";

export function MovieListItem({ title, isLoading, Icon, onPress, hasCheck = false, isActive = false }) {
    return (
        <TouchableOpacity
            style={[styles.container, {
                backgroundColor: isLoading ? theme.colors.gray : theme.colors.gray
            }]}
            onPress={onPress}
            disabled={isLoading}
        >
            {
                isLoading ?
                    <View
                        style={styles.loadingView}
                    >
                        <Loading />
                    </View>

                    : (
                        <>
                            <View style={{
                                flexDirection: "row",
                                minWidth: 99,

                                alignItems: "center"
                            }}>
                                {Icon}
                                <Text numberOfLines={1} style={styles.listName}>{title}</Text>
                            </View>
                            <View>
                                {
                                    hasCheck ? (
                                        <>
                                            {
                                                isActive && <AntDesign name="checkcircle" size={24} color={theme.colors.inactiveTabBar} />
                                            }
                                        </>
                                    ) : <AntDesign name="right" size={24} color={theme.colors.text} />
                                }

                            </View>
                        </>
                    )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

        width: "100%",
        padding: 16,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 20,
        paddingHorizontal: 14,
        marginBottom: 18
    },
    loadingView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    listName: {
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 20,
    },
});