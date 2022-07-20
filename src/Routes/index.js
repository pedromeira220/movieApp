import React, { useEffect, useState } from 'react';

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



const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const NonAuthStack = createNativeStackNavigator();




export function Routes() {

    const [userToken, setUserToken] = useState("");




    async function loadData() {

        const AStoken = await asyncStorage.ASuser.getData("user_token");
        const ASid = await asyncStorage.ASuser.getData("user_id");
        localstorage.user.token = AStoken;
        localstorage.user.id = ASid;


        if (AStoken) {
            setUserToken(AStoken);
        }

    }
    useEffect(function () {

        loadData();


    }, []);

    useEffect(function () {

        loadData();


    }, [localstorage.user.token]);


    return (
        <Stack.Navigator>
            {
                userToken ? (
                    <Stack.Screen
                        name="AuthRoutes"
                        component={AuthRoutes}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="NonAuthRoutes"
                        component={NonAuthRoutes}
                        options={{ headerShown: false }}
                    />
                )
            }

        </Stack.Navigator>


    )
}



function AuthRoutes() {
    return (
        <AuthStack.Navigator>

            <AuthStack.Screen
                name="TabBarNavigator"
                component={TabBarNavigator}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="ListOfMovies"
                component={ListOfMovies}
                options={{ headerShown: false }}
            />

        </AuthStack.Navigator>
    )
}


function NonAuthRoutes() {
    return (
        <NonAuthStack.Navigator>
            <NonAuthStack.Screen
                name="Onboarding1"
                component={Onboarding1}
                options={{ headerShown: false }}
            />
            <NonAuthStack.Screen
                name="Onboarding2"
                component={Onboarding2}
                options={{ headerShown: false }}
            />
            <NonAuthStack.Screen
                name="Onboarding3"
                component={Onboarding3}
                options={{ headerShown: false }}
            />
            <NonAuthStack.Screen
                name="LogInScreen"
                component={LogInScreen}
                options={{ headerShown: false }}
            />
            <NonAuthStack.Screen
                name="SingUpScreen"
                component={SingUpScreen}
                options={{ headerShown: false }}
            />
        </NonAuthStack.Navigator>
    )
}

