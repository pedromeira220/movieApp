import { asyncStorage } from "./asyncStorage";

const userToSave = {};

async function loadData() {
    userToSave.id = await asyncStorage.ASuser.getData('user_id');
    userToSave.token = await asyncStorage.ASuser.getData('user_token');
}



export const localstorage = {
    user: {
        id: userToSave.id,
        token: userToSave.token,
    },
    system: {
        canGetMovieListFromApi: false,
    }
}