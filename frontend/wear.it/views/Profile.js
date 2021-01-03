import React from 'react';
import {ScrollView, View, Modal,Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from '../style.js';


const data = require('../server-info.json')
export default class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			name: "",
			login:"",
			password:"",
			gender:"",
			allClothes:0,
			oldPassword:"",
			newPassword:"",
			newRepeatedPassword:"",
			showPasswordChangingDialog:false,
			oldPasswordError:false,
			newPasswordError:false,
			newRepeatedPasswordError:false,
			showError:false,

		}
  
		  AsyncStorage.getItem('user', (err, result) => {
		  	if(result!=null){
		  	var res = JSON.parse(result);
		  	if(this._isMounted)
		  	this.setState({name: res.name,
		  				   login:res.login,
		  				   password: res.password,
		  				   gender: res.gender
		  					})

		  	}
		  	
		  })

		  this.setPassword = this.setPassword.bind(this)
		  this.setNewPassword = this.setNewPassword.bind(this)
		  this.setRepeatedNewPassword = this.setRepeatedNewPassword.bind(this)
	}
	componentDidMount(){
		this._isMounted=true
	}
	
	componentWillUnmount(){
		this._isMounted=false
	}
	 setPassword(event) {
        
        if(event.nativeEvent.text!='' && event.nativeEvent.text==this.state.password){
            if(this._isMounted)
            this.setState({ oldPassword: event.nativeEvent.text, oldPasswordError:false })
        }else{
        	if(this._isMounted)
            this.setState({ oldPassword: event.nativeEvent.text, oldPasswordError:true })
        }
    }
    setNewPassword(event) {
        
        if(event.nativeEvent.text!=''){
        	if(this._isMounted)
            this.setState({ newPassword: event.nativeEvent.text, newPasswordError:false })
        }else{
        	if(this._isMounted)
            this.setState({ newPassword: event.nativeEvent.text, newPasswordError:true })
        }
    }
    setRepeatedNewPassword(event){
        if(event.nativeEvent.text!=''){
        	if(this._isMounted)
            this.setState({ repeatedNewPassword: event.nativeEvent.text, newRepeatedPasswordError:false })
        }else{
        	if(this._isMounted)
            this.setState({ repeatedNewPassword: event.nativeEvent.text, newRepeatedPasswordError:true })
        }
    }
	componentDidUpdate(prevProps, prevState) {
	  if (prevState.allClothes !== this.state.allClothes) {
	  	let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes'
         if(this._isMounted)
	     fetch(url, {
			      method: "GET"
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			        if(this._isMounted)
			         this.setState({
			            allClothes: responseJson.length
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

			}
		}
  
	logOut = async() =>{
      	await AsyncStorage.clear();
    	this.props.goBack();
    }
    
	deleteAccount(){
		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login
  		const pointerThis = this;
  		if(this._isMounted)
	     fetch(url, {
			      method: "DELETE"
			    })
			    .then(function(response){
			    	if(response.status==204){
			    		pointerThis.logOut();
			    	}
			    })
			    
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

	}
	changePassword(){
		if(this._isMounted)
		this.setState({
			showPasswordChangingDialog:true
		})


	}
	incorrectData(){
        if(this.state.showError)
            return(
                
                 <View style={styles.errorView}>
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                 </View>
                
                )
    }

	showPasswordChangingDialog(){
		
		
		return(
			<Modal
		        animationType="fade"
		        transparent={true}
		        visible={this.state.showPasswordChangingDialog}
		        
     		 >
     		 <TouchableOpacity style={styles.overlay} onPress={()=>{this.setState({showPasswordChangingDialog:false, showError:false, oldPasswordError:false, newPasswordError:false, newRepeatedPasswordError:false})}} >
	     		 <View style={styles.modal}>
	     		  {this.incorrectData()}
	     		
	     		  <TextInput
                            ref = {(input) => this.passwordInput = input}
                            textAlign = 'center'
                            placeholder = "old password"
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {this.state.oldPasswordError ? styles.inputError : styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setPassword}
                           
                        />
	     		  <TextInput
                            ref = {(input) => this.newPasswordInput = input}
                            textAlign = 'center'
                            placeholder = "new password"
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {this.state.newPasswordError ? styles.inputError : styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setNewPassword}
                           
                        />
                         <TextInput
                            ref = {(input) => this.passwordInput = input}
                            textAlign = 'center'
                            placeholder = "repeat new password"
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {this.state.newRepeatedPasswordError ? styles.inputError : styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setRepeatedNewPassword}
                           
                        />
	     		 <TouchableOpacity onPress={()=>{this.updatePassword()}} 
	     		 style={{width:150, marginTop:30}}>
	     		 <Text style={styles.smButton}>
	                                Change password
	                            </Text>
	                             <LinearGradient start={[0, 0.5]}
	                              end={[1, 0.5]}
	                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
	                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
	                              
	                              </LinearGradient>
	     		 </TouchableOpacity >
	     		 <TouchableOpacity onPress={()=>{this.setState({showPasswordChangingDialog:false, showError:false, oldPasswordError:false, newPasswordError:false, newRepeatedPasswordError:false})}} 
	     		 style={{width:60, marginTop:30}}>
	     		 <Text style={styles.smButton}>
	                                Close
	                            </Text>
	                             <LinearGradient start={[0, 0.5]}
	                              end={[1, 0.5]}
	                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
	                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
	                              
	                              </LinearGradient>
	     		 </TouchableOpacity >
	     		 </View>
     		 </TouchableOpacity>
     		 </Modal>
		)
	}
	updatePassword(){
		this.setState({
			oldPasswordError:false,
			newPasswordError:false,
			newRepeatedPasswordError:false,
			showError:false,
		})
		if(this.state.oldPassword=="" || this.state.oldPassword!=this.state.password){
			this.setState({
				oldPasswordError:true,
				errorMessage:"Incorrect old password",
				showError:true,
			})
			return;
		}
		else if(this.state.newPassword==""){
			this.setState({
				newPasswordError:true,
				errorMessage: "New password cannot be empty",
				showError:true,
			})	
			return;
		}
		else if(this.state.repeatedNewPassword==""){
			this.setState({
				newRepeatedPasswordError:true,
				errorMessage: "Please repeat new password",
				showError:true,
			})	
			return;
		}

		else if(this.state.newPassword!=this.state.repeatedNewPassword){
			this.setState({
				newPasswordError:true,
				newRepeatedPasswordError:true,
				errorMessage: "New password and repeated new password are different",
				showError:true
			})	
			return;
		}
		else{
		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login
	  	let body = {
  					
  					name:this.state.name,
  					login:this.state.login,
  					password:this.state.newPassword,
  					gender:this.state.gender

  				}
  			fetch(url, {
				      method: "PUT",
				      mode: 'cors', // no-cors, *cors, same-origin
	                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	                  credentials: 'same-origin', // include, *same-origin, omit
	                  headers: {
	                     'Content-Type': 'application/json'
	                              // 'Content-Type': 'application/x-www-form-urlencoded',
	                  },
	                  body: JSON.stringify(body)
  				
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

		                              	this.setState({
		                              		password:result.password
		                              	})
                                          });
          				});

			    })
			    
			    .catch((error) => {

			         console.error(error)
			      })
			    .done()
			    this.setState({
			    	oldPasswordError:false,
			        newPasswordError:false,
					newRepeatedPasswordError:false,
					showError:false,
					showPasswordChangingDialog:false,

			    })
			}
			

	}

	render(){
		return(
			<View style={[styles.containerNoBackground,{justifyContent:'flex-start', marginTop:0}]}>
				{this.showPasswordChangingDialog()}
				<Text style={styles.title}>Hello {this.state.name}!</Text>
				<LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '80%', alignItems: 'center', justifyContent: 'center', marginBottom:30}}>
                              
                </LinearGradient>

                <Image source={require('../assets/icon-transparent.png')} style={{padding:0,margin:0,width:120, height:120}}/>
                   
                <Text style={{marginBottom:50}}>What you wanna do?</Text>
                 <TouchableOpacity onPress={()=>{this.changePassword()}} style={{margin:20, marginBottom:0, textAlign:'center'}}
                          >
                          <LinearGradient start={[0, 1.0]}
                          end={[1, 1.0]}
                          colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                          style={{borderRadius: 10}}>
                              <View style={styles.circleGradient}>
                                  <Text style={{fontSize:18, textAlign:'center'}}>
                                        Change password
                                    </Text>
                                </View>
                            </LinearGradient>
                           

                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.logOut()}} style={styles.bgButton}
                          >
                          <LinearGradient start={[0, 1.0]}
                          end={[1, 1.0]}
                          colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                          style={{borderRadius: 10}}>
                              <View style={styles.circleGradient}>
                                  <Text style={{fontSize:18}}>
                                        Logout
                                    </Text>
                                </View>
                            </LinearGradient>
                           

                        </TouchableOpacity>
                         <TouchableOpacity onPress={() => this.deleteAccount()}
                          style={{width:140, marginTop:50}}>
                            <Text style={styles.smButton}>
                                Delete Account
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