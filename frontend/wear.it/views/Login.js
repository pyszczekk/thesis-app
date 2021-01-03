import React from 'react';
import {View, Text, Image, Modal, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert,AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from '../style.js';

const data = require('../server-info.json')
//widok i obsługa logowania

export default class Login extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            showError: false,
        }
        //AsyncStorage.clear();
        this.setLogin = this.setLogin.bind(this)
        this.setPassword = this.setPassword.bind(this)

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
            
                            
                      }
                }
        });
    }



   setLogin(event) {

        this.setState({ login: event.nativeEvent.text })
      

    }

    setPassword(event) {

        
        this.setState({ password: event.nativeEvent.text })
    }


    authenticateUser = () => { 
      
        let url = 'http://'+data.IP+':'+data.PORT+'/app/login/'
        var body = {
                login: this.state.login,
                password: this.state.password
        }     
       const pointerToThis = this;
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
                             pointerToThis.setState({
                                            showError:false
                                       })
                            let url2 = 'http://'+data.IP+':'+data.PORT+'/app/people/'+body.login;
                            fetch(url2,{
                                    method:"GET"
                                })
                                .then(res => res.json())
                                .then(result => {
                                        let user = {
                                            id: result.id,
                                            name: result.name,
                                            login: result.login,
                                            password: result.password,
                                            gender: result.gender
                                        };

                                        AsyncStorage.setItem('user', JSON.stringify(user), () => {
                                            AsyncStorage.getItem('user', (err, r) => {
                                             pointerToThis.props.navigation.navigate('App');
                                          });
                                        });
                                    
                                 })
                                .catch((err) => {
                                    pointerToThis.setState({showError:true, error:"Cannot connect to server"})
                               
                                    console.log(err)
                                });
                               
                                
                            }
                            if(response.status==404){
                                        console.log("błędny login bądź hasło")
                                       pointerToThis.setState({
                                            showError:true,
                                            error: "Wrong login or password"
                                       })
                                        AsyncStorage.clear();
                                        return;
                                    }
                        })
                            .catch((error) => {
                                pointerToThis.setState({showError:true, error:"Cannot connect to server"})
                                console.error(error)
                                return;
                                
                            });
    }
    incorrectData(){
        if(this.state.showError)
            return(
                
                 <View style={styles.errorView}>
                    <Text style={styles.errorText}>{this.state.error}</Text>
                 </View>
                
                )
    }

    render() {
      
       
        return(
            <View style={styles.container} >
                
                  <View style={styles.loginLogo}>
                     <Image source={require('../assets/icon-transparent.png')} style={{padding:0,margin:0,width:100, height:100}}/>
                   
                  </View>
                  {this.incorrectData()}
                        <View style = {styles.formContainer}>
                   
                        <TextInput
                            placeholder = "login"
                            textAlign = 'center'
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {styles.input}
                            returnKeyType = "next"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onSubmitEditing = {() => this.passwordInput.focus()}
                            
                            onChange={this.setLogin}
                           
                        />
                        <TextInput
                            ref = {(input) => this.passwordInput = input}
                            textAlign = 'center'
                            placeholder = "password"
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setPassword}
                           
                        />
                  
                </View>
                     
                        <TouchableOpacity onPress={()=>{this.authenticateUser()}} style={styles.bgButton}
                          >
                          <LinearGradient start={[0, 1.0]}
                          end={[1, 1.0]}
                          colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                          style={{borderRadius: 10}}>
                              <View style={styles.circleGradient}>
                                  <Text style={{fontSize:18}}>
                                        Sign In
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}
                          style={{width:130, marginTop:50}}>
                            <Text style={styles.smButton}>
                                Create Account
                            </Text>
                            <LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                              
                              </LinearGradient>
                        </TouchableOpacity>

              
            </View>
        )
    }
}
