import react, { useState, useEffect } from "react";
import {
    View, StyleSheet, Text, FlatList
} from 'react-native'
import { myApiFunctions } from "../../services/backend";
import { localstorage } from "../../services/localstorage";


import { AntDesign, Fontisto, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { theme } from "../../global/theme";
import { MovieListItem } from "../MovieListItem";
import { PrimaryButton } from "../PrimaryButton";
import { Loading } from "../Loading";

export function ListOfMovieList({ TMDBmovieId, setIsModalVisible }) {

    const [movieLists, setMovieLists] = useState([]);
    const [user, setUser] = useState({});

    async function loadData() {


        const id = localstorage.user.id;
        const token = localstorage.user.token;

        setUser({
            id,
            token
        });

        let response = await myApiFunctions.getAllLists({ token, userId: id });

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

            const listHasMovie = true;

            const movieResponse = await myApiFunctions.getMovieByListIdAndTMDBid({ listId: lists[i].id, TMDBmovieId: TMDBmovieId, token: localstorage.user.token });

            if (movieResponse.error || movieResponse.status == 404) {

                listHasMovie = false;

            }

            newLists.push(createList({ title: lists[i].name, type: lists[i].type, id: lists[i].id, listHasMovie }));
            //{ title: lists[i].name, icon: <FontAwesome name="list-ul" size={24} color={theme.colors.text} />, id: lists[i].id }
        }
        setMovieLists([...newLists]);

        //Checking if can set true to the isFavoriteIconClicked

        movieLists.forEach(function (list) {
            if (list.listHasMovie) {

            }
        });

    }

    useEffect(function () {
        loadData();
    }, []);

    function createList({ title, type, id, listHasMovie }) {

        const listName = title;
        const listIcon = getListIcon(type);
        const listId = id;

        //<FontAwesome name="list-ul" size={24} color={theme.colors.text} />

        const listCreated = { title: listName, icon: listIcon, id: listId, type, listHasMovie };

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


    async function handleMovieListItemClick({ listId, listName, listType, listHasMovie }) {

        if (listHasMovie) {
            const response = await myApiFunctions.deleteMovie({ listId, TMDBmovieId, token: localstorage.user.token });

            if (response.error) {
                console.error(response.msg);
                return;
            }

        } else {
            const response = await myApiFunctions.addMovieToList({ listId, TMDBmovieId, token: localstorage.user.token });

            if (response.error) {
                console.error(response.msg);
                return;
            }
        }

        setIsModalVisible(false);
    }




    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<FlatListHeaderComponent setIsModalVisible={setIsModalVisible} />}
                data={movieLists}
                ListEmptyComponent={Loading}
                renderItem={function ({ item }) {
                    return (
                        <MovieListItem
                            Icon={item.icon}
                            title={item.title}
                            listId={item.id}
                            hasCheck={true}
                            isActive={item.listHasMovie ? true : false}
                            onPress={function () {

                                handleMovieListItemClick({ listId: item.id, listName: item.title, listType: item.type, listHasMovie: item.listHasMovie });
                            }}

                        />
                    )
                }}
                keyExtractor={function (item) {
                    return item.id
                }}
                style={styles.movieListsList}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    movieListsList: {
        paddingHorizontal: 24,
    },
});


function FlatListHeaderComponent({ setIsModalVisible }) {

    function handleCloseModalButtonClick() {
        setIsModalVisible(false);
    }

    return (
        <View style={{
            marginBottom: 18
        }}>
            <PrimaryButton color={theme.colors.secondary} text="Close" textColor={theme.colors.text} onPress={handleCloseModalButtonClick} />
        </View>
    )
}