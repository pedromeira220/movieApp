import React, { useEffect, useMemo, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBarNavigator } from '../navigators/TabBarNavigator';
import { DetailsScreen } from '../Pages/DetailsScreen';
import { ListOfMovies } from '../Pages/ListOfMovies';
import { Onboarding1 } from '../Pages/onboarding/Onboarding1';
import { Onboarding2 } from '../Pages/onboarding/Onboarding2';
import { Onboarding3 } from '../Pages/onboarding/Onboarding3';
import { SingUpScreen } from '../Pages/SingUpScreen';
import { LogInScreen } from '../Pages/LogInScreen'
import { localstorage } from '../services/localstorage';
import { asyncStorage } from '../services/asyncStorage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../utils/contexts/AuthContext';
import { LoadingScreen } from '../Pages/LoadingScreen';
import { myApiFunctions } from '../services/backend';
import { ErrorScreen } from '../Pages/ErrorScreen';



const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const NonAuthStack = createNativeStackNavigator();




export function Routes() {


    const [userToken, setUserToken] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [canLoadContent, setCanLoadContent] = useState(true);

    const navigation = useNavigation();




    const authContext = useMemo(function () {
        return {
            logIn: async function () {
                setUserToken(await this.getUserToken());
            },
            register: async function () {
                setUserToken(await this.getUserToken());
            },
            logOut: function () {
                setUserToken(null);
            },
            getUserToken: async function () {
                const userToken = await asyncStorage.ASuser.getData("user_token");

                return userToken;
            },
            checkInternetConnection: async function () {

                const user = {
                    token: await asyncStorage.ASuser.getData("user_token"),
                    id: await asyncStorage.ASuser.getData("user_id")
                }

                //Trying to get data from API

                const response = await myApiFunctions.getUserData({ token: user.token, userId: user.id });


                if (!response) {
                    setCanLoadContent(false);
                    setIsLoading(false);
                    return true;
                }

                if (response.error) {


                    if (!response?.msg) {
                        setCanLoadContent(false);
                        setIsLoading(false);
                        return true;
                    }

                    console.error(response.msg);
                    setCanLoadContent(false);
                    return true;
                }

                setCanLoadContent(true);
                setIsLoading(false);
                return false;
            },
        }
    }, []);




    async function loadData() {




        const AStoken = await asyncStorage.ASuser.getData("user_token");
        const ASid = await asyncStorage.ASuser.getData("user_id");
        localstorage.user.token = AStoken;
        localstorage.user.id = ASid;




        authContext.checkInternetConnection();
        setUserToken(AStoken);






        setIsLoading(false);
    }


    useEffect(function () {

        loadData();


    }, []);

    useEffect(function () {

        loadData();


    }, [localstorage.user.token, userToken, navigation]);

    useEffect(function () {
        setUserToken(localstorage.user.token);

    });

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator>

                {
                    canLoadContent ?
                        <>
                            {
                                !userToken ?


                                    <Stack.Group>

                                        <Stack.Screen
                                            name="Onboarding1"
                                            component={Onboarding1}
                                            options={{ headerShown: false }}
                                        />
                                        <Stack.Screen
                                            name="Onboarding2"
                                            component={Onboarding2}
                                            options={{ headerShown: false }}
                                        />
                                        <Stack.Screen
                                            name="Onboarding3"
                                            component={Onboarding3}
                                            options={{ headerShown: false }}
                                        />
                                        <Stack.Screen
                                            name="LogInScreen"
                                            component={LogInScreen}
                                            options={{ headerShown: false }}
                                        />
                                        <Stack.Screen
                                            name="SingUpScreen"
                                            component={SingUpScreen}
                                            options={{ headerShown: false }}
                                        />

                                    </Stack.Group>

                                    :
                                    <Stack.Group>


                                        <Stack.Screen
                                            name="TabBarNavigator"
                                            component={TabBarNavigator}
                                            options={{ headerShown: false }}
                                        />
                                        <Stack.Screen
                                            name="DetailsScreen"
                                            component={DetailsScreen}
                                            options={{ headerShown: false }}
                                        />
                                        <Stack.Screen
                                            name="ListOfMovies"
                                            component={ListOfMovies}
                                            options={{ headerShown: false }}
                                        />


                                    </Stack.Group>


                            }
                        </>
                        :
                        <>
                            <Stack.Screen
                                name="ErrorScreen"
                                component={ErrorScreen}
                                options={{ headerShown: false }}
                            />
                        </>
                }







            </Stack.Navigator>
        </AuthContext.Provider>


    )
}



function AuthRoutes() {
    return (
        <>

            <Stack.Screen
                name="TabBarNavigator"
                component={TabBarNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ListOfMovies"
                component={ListOfMovies}
                options={{ headerShown: false }}
            />

        </>
    )
}


function NonAuthRoutes() {
    return (
        <>
            <Stack.Screen
                name="Onboarding1"
                component={Onboarding1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Onboarding2"
                component={Onboarding2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Onboarding3"
                component={Onboarding3}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LogInScreen"
                component={LogInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SingUpScreen"
                component={SingUpScreen}
                options={{ headerShown: false }}
            />
        </>
    )
}

