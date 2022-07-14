import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MovieListItem } from '../../components/MovieListItem';

import { theme } from '../../global/theme';

import { AntDesign, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { InputWithIcon } from '../../components/InputWithIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function MovieListScreen({ navigation }) {

    const [isAddListButtonActive, setIsAddListButtonActive] = useState(false);
    const [canFocus, setCanFocus] = useState(false);

    function handleAddListButtonClick() {
        setIsAddListButtonActive(true);
        setCanFocus(true);

    }

    return (
        <KeyboardAwareScrollView
            onKeyboardWillHide={function () {
                setIsAddListButtonActive(false);
            }}
            style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.title}>My lists</Text>
                </View>


            </SafeAreaView>

            <View style={styles.content}>

                {
                    isAddListButtonActive ? (
                        <View style={{
                            marginBottom: 18
                        }}>
                            <InputWithIcon canAutoFocus={canFocus} cannotPutMarginTop={true} placeholder="List name" Icon={<AntDesign name="pluscircle" size={24} color={theme.colors.text} />} />
                        </View>

                    ) : (
                        <TouchableOpacity
                            style={styles.addListButton}
                            onPress={function () {
                                handleAddListButtonClick();
                            }}
                        >
                            <AntDesign name="pluscircle" size={24} color={theme.colors.text} />
                            <Text style={styles.listName}>Add a new list</Text>
                        </TouchableOpacity>
                    )
                }


                <MovieListItem title="Main list" Icon={<AntDesign name="clockcircle" size={24} color={theme.colors.text} />} />
                <MovieListItem title="Favorite" Icon={<Fontisto name="favorite" size={24} color={theme.colors.text} />} />
                <MovieListItem title="Friends recommendations" Icon={<FontAwesome5 name="user-friends" size={24} color={theme.colors.text} />} />
            </View>
        </KeyboardAwareScrollView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    header: {
        marginTop: 25,
        paddingHorizontal: 24,

    },
    title: {
        color: theme.colors.text,
        fontSize: 24,
    },
    content: {
        marginHorizontal: 24,
        marginTop: 47,

    },
    addListButton: {
        backgroundColor: theme.colors.gray,
        width: "100%",
        padding: 16,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 20,
        paddingHorizontal: 14,
        marginBottom: 18
    },
    listName: {
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 16,
    },
});

