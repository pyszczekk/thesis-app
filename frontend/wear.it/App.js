import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppContainer from './views/SwitchContainer.js'

export default class App extends React.Component{
  render(){
  	return   <AppContainer/>
  }
   
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBFFEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
