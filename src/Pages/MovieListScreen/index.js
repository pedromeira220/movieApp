import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import { MovieListItem } from '../../components/MovieListItem';

import { theme } from '../../global/theme';

import { AntDesign, Fontisto, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { InputWithIcon } from '../../components/InputWithIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { useIsFocused, useNavigation } from '@react-navigation/native';
import { myApiFunctions } from '../../services/backend';
import { asyncStorage } from '../../services/asyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import { localstorage } from '../../services/localstorage';

import { Loading } from '../../components/Loading/index'
import { AuthContext } from '../../utils/contexts/AuthContext';

export function MovieListScreen() {

    const navigation = useNavigation();
    const isScreenFocused = useIsFocused();

    const [canGetMovieListFromApi, setCanGetMovieListFromApi] = useState(true);

    const [movieLists, setMovieLists] = useState([]);

    const [user, setUser] = useState({});

    const auth = useContext(AuthContext);



    function handleMovieListItemClick({ listId, listName, listType }) {

        auth.checkInternetConnection();

        navigation.navigate("ListOfMovies", { listId, listName, listType });
    }

    async function loadData() {

        auth.checkInternetConnection();


        const id = localstorage.user.id;
        const token = localstorage.user.token;

        setUser({
            id,
            token
        });

        const response = await myApiFunctions.getAllLists({ token, userId: id });

        if (response.error) {
            console.error(response.msg);
            return;
        }



        if (response.list == []) {
            return;
        }

        const lists = response.lists;

        const newLists = [];

        for (let i = lists.length - 1; i >= 0; i--) {
            newLists.push(createList({ title: lists[i].name, type: lists[i].type, id: lists[i].id }));
            //{ title: lists[i].name, icon: <FontAwesome name="list-ul" size={24} color={theme.colors.text} />, id: lists[i].id }
        }
        setMovieLists([...newLists]);
    }


    useEffect(function () {
        loadData();

    }, []);

    useEffect(function () {
        loadData();
    }, [isScreenFocused, navigation]);

    /*
    function addNewListToList({ listName, listId }) {
        const newMovieLists = [{ title: listName, icon: <FontAwesome name="list-ul" size={24} color={theme.colors.text} />, id: listId }, ...movieLists]
        setMovieLists(newMovieLists);
        return newMovieLists;
    }
    */
    function createList({ title, type, id }) {

        const listName = title;
        const listIcon = getListIcon(type);
        const listId = id;

        //<FontAwesome name="list-ul" size={24} color={theme.colors.text} />

        const listCreated = { title: listName, icon: listIcon, id: listId, type };

        return listCreated;
    }

    function getListIcon(type) {
        const iconOptions = [
            <AntDesign name="clockcircle" size={24} color={theme.colors.text} />,
            <Fontisto name="favorite" size={24} color={theme.colors.text} />,
            <FontAwesome5 name="user-friends" size={24} color={theme.colors.text} />,
            <FontAwesome name="list-ul" size={24} color={theme.colors.text} />
        ];

        let icon;

        iconOptions.forEach(function (option, currentOptionIndex) {
            if (currentOptionIndex == type) {
                icon = option;
            }
        });

        return icon;

        /*
[
        { title: "Main List", icon: <AntDesign name="clockcircle" size={24} color={theme.colors.text} />, id: 1 },
        { title: "Favorite", icon: <Fontisto name="favorite" size={24} color={theme.colors.text} />, id: 2 },
        { title: "Friends recommendations", icon: <FontAwesome5 name="user-friends" size={24} color={theme.colors.text} />, id: 3 },

    ]
*/
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.colors.background
        }}>
            <FlatList
                data={movieLists}
                ListEmptyComponent={Loading}
                renderItem={function ({ item }) {
                    return (
                        <MovieListItem Icon={item.icon} title={item.title} listId={item.id} onPress={function () {
                            handleMovieListItemClick({ listId: item.id, listName: item.title, listType: item.type });
                        }} />
                    )
                }}
                keyExtractor={function (item) {
                    return item.id
                }}
                ListHeaderComponent={<FlatListHeader movieLists={movieLists} createList={createList} setMovieLists={setMovieLists} user={user} />}
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

function FlatListHeader({ movieLists, setMovieLists, user, createList }) {

    const [isAddListButtonActive, setIsAddListButtonActive] = useState(false);
    const [canFocus, setCanFocus] = useState(false);
    const [newNameListText, setNewNameListText] = useState("");

    const auth = useContext(AuthContext);
    const platform = Platform.OS;

    function handleAddListButtonClick() {
        auth.checkInternetConnection();
        setIsAddListButtonActive(true);
        setCanFocus(true);

    }



    async function handleOnInputWithIconKeyboardOut() {

        const listType = 3;

        const response = await myApiFunctions.createList({ listName: newNameListText, listType, userId: user.id, token: user.token });

        if (response.error) {
            console.error(response.msg);
            return;
        }

        const newMovieLists = [createList({ title: newNameListText, type: listType, id: response.listCreated.id }), ...movieLists]
        setMovieLists(newMovieLists);
        setIsAddListButtonActive(false);
    }

    function handleOnInputWithIconChangeText(text) {
        setNewNameListText(text);
    }
    return (
        <KeyboardAwareScrollView
            enableAutomaticScroll={false}


        >

            <View
                style={styles.container}
            >
                <SafeAreaView>
                    <View style={[styles.header, {
                        marginTop: platform == 'android' ? 25 + 16 : 25,
                    }]}>
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
            </View>
        </KeyboardAwareScrollView>
    )
}


/*
[
        { title: "Main List", icon: <AntDesign name="clockcircle" size={24} color={theme.colors.text} />, id: 1 },
        { title: "Favorite", icon: <Fontisto name="favorite" size={24} color={theme.colors.text} />, id: 2 },
        { title: "Friends recommendations", icon: <FontAwesome5 name="user-friends" size={24} color={theme.colors.text} />, id: 3 },

    ]
*/ 