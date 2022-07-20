import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from './src/Routes/index'

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
      <StatusBar
        style='light'
        backgroundColor="transparent"

      />
      <NavigationContainer>

        <Routes />
      </NavigationContainer>
    </>
  )
}

