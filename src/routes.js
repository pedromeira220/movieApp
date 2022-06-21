import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Foundation, FontAwesome  } from '@expo/vector-icons'; 

import {Home} from './Pages/Home'
import {ProfileScreen} from './Pages/ProfileScreen'
import {DiscoveryScreen} from './Pages/DiscoveryScreen'
import { theme } from './global/theme';

const Tab = createBottomTabNavigator();

export function Routes() {
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
            

            }}
            
        
        >
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarIcon: ({ size, color, focused })=>(
                    <Foundation name="home" size={size} color={color} />
                )
            }}
            />
            <Tab.Screen 
            name="DiscoveryScreen" 
            component={DiscoveryScreen}
            options={{
                tabBarIcon: ({ size, color, focused })=>(
                    <FontAwesome name="play-circle" size={size} color={color} />
                    
                )
            }}
            />
            <Tab.Screen 
            name="ProfileScreen" 
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ size, color, focused })=>(
                    <FontAwesome name="user" size={size} color={color} />
                    
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