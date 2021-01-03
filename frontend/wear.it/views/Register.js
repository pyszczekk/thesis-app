import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert,AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { RadioButton } from 'react-native-paper';

import { styles } from '../style.js';

const data = require('../server-info.json')

//widok i obsługa logowania
export default class Register extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            repeatedPassword:'',
            name: '',
            gender: 'f',
            showError:false,
            error:"",
            loginError:false,
            nameError:false,
            passwordError:false,
            repeatedPasswordError:false
        }
        
        this.setLogin =  this.setLogin.bind(this)
        this.setPassword = this.setPassword .bind(this)
        this.setRepeatedPassword = this.setRepeatedPassword.bind(this)
        this.setName = this.setName.bind(this)
        this.setGender = this.setGender.bind(this)
        
    }

    setLogin(event) {
        this.setState({ login: event.nativeEvent.text })
        if(event.nativeEvent.text!=''){
            this.setState({ login: event.nativeEvent.text, loginError:false })
        }else{
            this.setState({ login: event.nativeEvent.text, loginError:true })
        }
    }
    setPassword(event) {
        
        if(event.nativeEvent.text!=''){
            this.setState({ password: event.nativeEvent.text, loginError:false })
        }else{
            this.setState({ password: event.nativeEvent.text, loginError:true })
        }
    }
    setRepeatedPassword(event){
        
        if(event.nativeEvent.text!=''){
            this.setState({ repeatedPassword: event.nativeEvent.text, loginError:false })
        }else{
            this.setState({ repeatedPassword: event.nativeEvent.text, loginError:true })
        }
    }
    setName(event){
       
        if(event.nativeEvent.text!=''){
            this.setState({ name: event.nativeEvent.text, loginError:false })
        }else{
            this.setState({ name: event.nativeEvent.text, loginError:true })
        }
    }
    setGender(gender){
        this.setState({gender:gender})
    }

register = () => { 
    this.setState({
        loginError:false,
        nameError:false,
        passwordError:false,
        repeatedPasswordError:false,
        showError:false
    })
    if(this.state.name==""){
        this.setState({showError:true, error:"Name cannot be empty", nameError:true})
                          
        return;
    }
    if(this.state.login==""){
            this.setState({showError:true, error:"Login cannot be empty", loginError:true})
                          
        return;
    }
    if(this.state.password==""){
         this.setState({showError:true, error:"Password cannot be empty", passwordError:true})
                          
        return;
    }
    if(this.state.repeatedPassword==""){
         this.setState({showError:true, error:"Please repeat password", repeatedPasswordError:true})
                          
        return;
    }
    if(this.state.password!=this.state.repeatedPassword){
        this.setState({showError:true, error:"Password and repeated password are different", passwordError:true, repeatedPasswordError:true})
                          
        return;
    }
      
        let url = 'http://'+data.IP+':'+data.PORT+'/app/register/'
        var body = {
                name: this.state.name,
                login: this.state.login,
                password: this.state.password,
                gender: this.state.gender
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

                        if (response.status==201){
                            console.log("zarejestrowano");
                            pointerToThis.props.navigation.navigate('Login');
                                
                            }
                            if(response.status==409){
                                 pointerToThis.setState({showError:true, error:"This login is already taken", loginError:true})
                            }
                        })
                            .catch((error) => {
                                pointerToThis.setState({showError:true, error:"Cannot connect to server"})
                                console.error(error)
                            
                                
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
                            placeholder = "name"
                            textAlign = 'center'
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {this.state.nameError ? styles.inputError : styles.input}
                            returnKeyType = "next"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onSubmitEditing = {() => this.passwordInput.focus()}
                           
                            onChange={this.setName}
                          
                        />
                        <TextInput
                            placeholder = "login"
                            textAlign = 'center'
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {this.state.loginError ? styles.inputError : styles.input}
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
                            style = {this.state.passwordError ? styles.inputError : styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setPassword}
                           
                        />
                         <TextInput
                            ref = {(input) => this.passwordInput = input}
                            textAlign = 'center'
                            placeholder = "repeat password"
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {this.state.repeatedPasswordError ? styles.inputError : styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setRepeatedPassword}
                           
                        />
                       
                        <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <View style={{margin:10, alignItems:'center'}}>
                          <RadioButton
                            value="f"
                            status={ this.state.gender === 'f' ? 'checked' : 'unchecked' }
                            onPress={(str) => this.setGender('f')}
                            color="#4ECDC4"

                          /><Text>woman</Text>
                          </View>
                          <View style={{margin:10, alignItems:'center'}}>
                          <RadioButton
                            value="m"
                            status={ this.state.gender === 'm' ? 'checked' : 'unchecked' }
                            onPress={(str) => this.setGender('m')}
                            color="#4ECDC4"
                          />
                          <Text>man</Text>
                        </View>
                        </View>
                </View>
                   <TouchableOpacity onPress={() => this.register()} style={styles.bgButton}
                          >
                          <LinearGradient start={[0, 1.0]}
                          end={[1, 1.0]}
                          colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                          style={{borderRadius: 10}}>
                              <View style={styles.circleGradient}>
                                  <Text style={{fontSize:18}}>
                                       Register
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
                         style={{width:80, marginTop:50}} >
                            <Text style={styles.smButton}>
                                Go back
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
