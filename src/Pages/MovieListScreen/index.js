import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { MovieListItem } from '../../components/MovieListItem';

import { theme } from '../../global/theme';

import { AntDesign, Fontisto, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { InputWithIcon } from '../../components/InputWithIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { useNavigation } from '@react-navigation/native';
import { myApiFunctions } from '../../services/backend';
import { asyncStorage } from '../../services/asyncStorage';
import { useFocusEffect } from '@react-navigation/native';

export function MovieListScreen() {

    const navigation = useNavigation();


    const [movieLists, setMovieLists] = useState([
        { title: "Main List", icon: <AntDesign name="clockcircle" size={24} color={theme.colors.text} />, id: 1 },
        { title: "Favorite", icon: <Fontisto name="favorite" size={24} color={theme.colors.text} />, id: 2 },
        { title: "Friends recommendations", icon: <FontAwesome5 name="user-friends" size={24} color={theme.colors.text} />, id: 3 },

    ]);

    const [user, setUser] = useState({});

    function handleMovieListItemClick() {
        navigation.navigate("ListOfMovies");
    }

    async function loadData() {
        setUser({
            id: await asyncStorage.ASuser.getData("user_id"),
            token: await asyncStorage.ASuser.getData("user_token"),
        });
        const response = await myApiFunctions.getAllLists({ token: user.token, userId: user.id });

        const lists = response.lists;

        console.log(lists);

        lists.forEach(function (list) {
            console.log("uma lista");
            addNewListToList({ listId: list.id, listName: list.name });
        });

    }

    //useFocusEffect(
    //    useCallback(() => {
    //        loadData();
    //    }, [])
    //);



    useEffect(function () {
        //loadData();
        (async function () {
            setUser({
                id: await asyncStorage.ASuser.getData("user_id"),
                token: await asyncStorage.ASuser.getData("user_token"),
            });
        })()


    }, []);

    function addNewListToList({ listName, listId }) {
        const newMovieLists = [{ title: listName, icon: <FontAwesome name="list-ul" size={24} color={theme.colors.text} />, id: listId }, ...movieLists]
        setMovieLists(newMovieLists);
        return newMovieLists;
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.colors.background
        }}>
            <FlatList

                data={movieLists}
                renderItem={function ({ item }) {
                    return (
                        <MovieListItem Icon={item.icon} title={item.title} onPress={handleMovieListItemClick} />
                    )
                }}
                keyExtractor={function (item) {
                    return item.id
                }}
                ListHeaderComponent={<FlatListHeader movieLists={movieLists} setMovieLists={setMovieLists} user={user} />}
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

function FlatListHeader({ movieLists, setMovieLists, user }) {

    const [isAddListButtonActive, setIsAddListButtonActive] = useState(false);
    const [canFocus, setCanFocus] = useState(false);
    const [newNameListText, setNewNameListText] = useState("");

    function handleAddListButtonClick() {
        setIsAddListButtonActive(true);
        setCanFocus(true);

    }



    async function handleOnInputWithIconKeyboardOut() {

        const newMovieLists = [{ title: newNameListText, icon: <FontAwesome name="list-ul" size={24} color={theme.colors.text} />, id: movieLists.length + 1 }, ...movieLists]
        setMovieLists(newMovieLists);
        setIsAddListButtonActive(false);
        console.log(user);
        await myApiFunctions.createList({ listName: newNameListText, listType: 4, userId: user.id, token: user.token });
    }

    function handleOnInputWithIconChangeText(text) {
        setNewNameListText(text);
    }
    return (
        <KeyboardAwareScrollView
            enableAutomaticScroll={false}

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
                            <InputWithIcon
                                autoComplete={true}
                                autoCorrect={true}
                                secureTextEntry={false}
                                onSubmitEditing={handleOnInputWithIconKeyboardOut}
                                onChangeText={handleOnInputWithIconChangeText}
                                canAutoFocus={canFocus} cannotPutMarginTop={true}
                                placeholder="List name"
                                Icon={<AntDesign name="pluscircle" size={24} color={theme.colors.text} />}
                            />
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