import React from 'react';

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





const Stack = createNativeStackNavigator();

export function Routes() {
    return (
        <Stack.Navigator>
            {
                localstorage.user.token ? (
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
        <Stack.Navigator>

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

        </Stack.Navigator>
    )
}


function NonAuthRoutes() {
    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    )
}