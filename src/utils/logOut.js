import { useContext } from 'react';
import { asyncStorage } from '../services/asyncStorage';
import { localstorage } from '../services/localstorage'



export function logOut() {


    localstorage.user.id = "";
    localstorage.user.token = "";

    asyncStorage.ASuser.storeData("user_token", "");
    asyncStorage.ASuser.storeData("user_id", "");



}