import React from 'react';
import {View, Text, Image, Modal, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert,AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from '../style.js';

const data = require('../server-info.json')
//widok i obsługa logowania

export default class Load extends React.Component {
     constructor(props) {
        super(props);
       
        //AsyncStorage.clear();
      

         AsyncStorage.getItem('user', (err, result) => {
           if(result!=null){
                      if(JSON.parse(result).name!=null){
                        var log = false;
                        let url = 'http://'+data.IP+':'+data.PORT+'/app/login'
                        var body = {
                            login: JSON.parse(result).login,
                            password: JSON.parse(result).password
                        }
                        fetch(url, {
                            method: "POST",
                            mode: 'cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                              'Content-Type': 'application/json'
                              // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(body)
                    })
                            .then(function(response) {
                                if (response.status==200){
                                    
                                    props.navigation.navigate('App')
                                 }
                                 })
                            .catch((error) => {
                                
                                console.error(error)
                                
                                
                            })
                            .done()
            
                            
                      }
                }else{
                    props.navigation.navigate('Login')
                }
                
        });
         
    }

    

    render() {
      
       
        return(
            <View style={styles.container} >
                <Image source={require('../assets/load.gif')} style={{width:200, height:200}} />
            </View>
        )
    }
}
