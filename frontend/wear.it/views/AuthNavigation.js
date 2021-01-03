import React from "react";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import Login from "./Login.js";
import Register from "./Register.js";
import Load from "./Load.js"; 
import {createStackNavigator} from "react-navigation-stack";


//nawigacja pomiedzy logowaniem/rejestracją, a główną aplikacją
const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        Load: {screen: Load}
    },
    {
        initialRouteName: 'Load',
        headerMode: 'none'
    }
)

export default AuthNavigation;