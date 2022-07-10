import AS_movieList from '@react-native-async-storage/async-storage';
import AS_favoritesMovies from '@react-native-async-storage/async-storage';


export const asyncStorage = {
    ASmovieList: {
        storeData: function (key, value) {
            //AS_movieList.setItem(key, value);
            //this.data[key].push(value);
        },
        getData: async function (key) {
            return (await AS_movieList.getItem(key));
        },
        clearData: function (key) {
            this.storeData(key, []);
        },
        storeDataInSessionStorage: function (key, value) {
            this.data[key].push(value);
        },
        getDataFromSessionStorage: function () {

        },
        data: {
            favoriteMovies: []
        }
    }
}