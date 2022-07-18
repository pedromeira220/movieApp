import AS_movieList from '@react-native-async-storage/async-storage';
import AS_favoritesMovies from '@react-native-async-storage/async-storage';
import AS_user from '@react-native-async-storage/async-storage';


export const asyncStorage = {
    ASmovieList: {
        storeData: (key, value) => {
            AS_movieList.setItem(key, value);
        },
        getData: async (key) => {
            return (await AS_movieList.getItem(key));
        }
    },
    ASuser: {
        storeData: (key, value) => {
            AS_user.setItem(key, value);
        },
        getData: async (key) => {
            return (await AS_user.getItem(key));
        }
    }
}