import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Foundation, FontAwesome } from '@expo/vector-icons';

import { Home } from '../Pages/Home'
import { ProfileScreen } from '../Pages/ProfileScreen'
import { DiscoveryScreen } from '../Pages/DiscoveryScreen'
import { DetailsScreen } from '../Pages/DetailsScreen'
import { theme } from '../global/theme';
import { Image, View } from 'react-native';
import { MovieListScreen } from '../Pages/MovieListScreen';


import HomeSvg from '../assets/Home.svg';
import { CustomIcon } from '../components/CustomIcon';

const Tab = createBottomTabNavigator();
export function TabBarNavigator() {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: "transparent",


                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.inactiveTabBar,
                tabBarShowLabel: false,

            }}


        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <HomeSvg width="36px" height="36px" fill={focused ? theme.colors.primary : theme.colors.inactiveTabBar} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="MovieListScreen"
                component={MovieListScreen}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <FontAwesome name="plus" size={36} color={focused ? theme.colors.text : theme.colors.inactiveTabBar} />

                    ),
                    tabBarButton: (props) => (
                        <CustomIcon {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="DiscoveryScreen"
                component={DiscoveryScreen}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <FontAwesome name="search" size={36} color={color} />

                    )
                }}
            />



        </Tab.Navigator>



    )
}


//<FontAwesome name="play-circle" size={24} color="black" />

 //<Foundation name="home" size={size} color={color} />
//<img src="./assets/Home.svg"></img>
//<FontAwesome name="user" size={24} color="black" />


/*

<RootStack.Navigator>
            <RootStack.Group>
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name="Details" component={DetailsScreen} />
            </RootStack.Group>m
</RootStack.Navigator>
*/ 