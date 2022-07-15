import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { MovieListItem } from '../../components/MovieListItem';

import { theme } from '../../global/theme';

import { AntDesign, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { InputWithIcon } from '../../components/InputWithIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const movieLists = [
    { title: "Main List", icon: <AntDesign name="clockcircle" size={24} color={theme.colors.text} />, id: 1 },
    { title: "Favorite", icon: <Fontisto name="favorite" size={24} color={theme.colors.text} />, id: 2 },
    { title: "Friends recommendations", icon: <FontAwesome5 name="user-friends" size={24} color={theme.colors.text} />, id: 3 },

];


export function MovieListScreen({ navigation }) {



    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.colors.background
        }}>
            <FlatList
                bounces={false}
                data={movieLists}
                renderItem={function ({ item }) {
                    return (
                        <MovieListItem Icon={item.icon} title={item.title} />
                    )
                }}
                keyExtractor={function (item) {
                    return item.id
                }}
                ListHeaderComponent={FlatListHeader}
                style={styles.movieListsList}
            />
        </View>


    )

}




const styles = StyleSheet.create({
    movieListsList: {
        paddingHorizontal: 24,
    },
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    header: {
        marginTop: 25,


    },
    title: {
        color: theme.colors.text,
        fontSize: 24,
    },
    content: {

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

function FlatListHeader() {

    const [isAddListButtonActive, setIsAddListButtonActive] = useState(false);
    const [canFocus, setCanFocus] = useState(false);

    function handleAddListButtonClick() {
        setIsAddListButtonActive(true);
        setCanFocus(true);

    }

    function handleOnInputWithIconKeyKeyboardOut() {
        setIsAddListButtonActive(false);
    }
    return (
        <KeyboardAwareScrollView
            enableAutomaticScroll={false}
            onKeyboardWillHide={function () {
                handleOnInputWithIconKeyKeyboardOut();

            }}
            bounces={false}

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





            </View>
        </KeyboardAwareScrollView>
    )
}