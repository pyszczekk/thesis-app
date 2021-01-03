import React from 'react';
import {ScrollView, View, Modal,Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from '../style.js';

const data = require('../server-info.json')
const rules = require('../dresscode.json')

export default class DressCodes extends React.Component{
	constructor(){
		super();
		this.state={
			dressCodes:[],
			tileColors: ["#8F7700","#660000","#247F79", "#003D00"],
			visibleDialog:false,
			currentDresscode:"other",
		}

	}
	componentDidMount(){
			let url = 'http://'+data.IP+':'+data.PORT+'/app/dresscode'
  
			  fetch(url, {
			      method: "GET"
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			       
			         this.setState({
			            dressCodes: responseJson
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

	}
	showDressCodeDialog(){
		
		
		return(
			<Modal
		        animationType="fade"
		        transparent={true}
		        visible={this.state.visibleDialog}
		        
     		 >
     		 <TouchableOpacity style={styles.overlay} onPress={()=>{this.setState({visibleDialog:false})}} >
	     		 <View style={styles.modal}>
	     		 <Text style={{fontWeight:'bold',fontSize:16, textTransform:'uppercase'}}>{this.state.currentDresscode}</Text>
	     		 
	     		 <Text><Text style={{fontWeight:'bold'}}>Women:</Text>{rules[this.state.currentDresscode]["woman"]}</Text>
	     		 <Text><Text style={{fontWeight:'bold'}}>Men:</Text>{rules[this.state.currentDresscode]["man"]}</Text>
	     		 <Text><Text style={{fontWeight:'bold'}}>When to wear it:</Text>{rules[this.state.currentDresscode]["event"]}</Text>
	     		 <TouchableOpacity onPress={()=>{this.setState({visibleDialog:false})}} 
	     		 style={{width:80, marginTop:30}}>
	     		 <Text style={styles.smButton}>
	                                Go back
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
	createDressCodeTab(){
		var colors = this.state.tileColors;
		return this.state.dressCodes.map((item,index) => {
				 var gradientColor = colors[index%4];
				 var img
				 switch(item.name){
				 	case 'casual':
				 		img = require("../assets/dresscodes/casual.jpg")
				 		break;
				 	case 'black tie optional':
				 		img = require("../assets/dresscodes/black_tie_optional.jpg")
				 		break;
				 	case 'smart casual':
				 		img = require("../assets/dresscodes/smart_casual.jpg")
				 		break;
				 	case 'dressy casual':
				 		img = require("../assets/dresscodes/dressy_casual.jpg")
				 		break;
				 	case 'country club casual':
				 	 	img = require("../assets/dresscodes/country_club_casual.jpg")
				 	 	break;
				 	case 'business casual':
				 	 	img = require("../assets/dresscodes/business_casual.jpg")
				 	 	break;
				 	case 'cocktail attire':
				 	 	img = require("../assets/dresscodes/cocktail_attire.jpg")
				 	 	break;
				 	case 'white tie':
				 	 	img = require("../assets/dresscodes/white_tie.jpg")
				 	 	break;
				 	case 'black tie':
				 	 	img = require("../assets/dresscodes/black_tie.jpg")
				 	 	break;
				 	case 'lounge':
				 	 	img = require("../assets/dresscodes/lounge.jpg")
				 	 	break;
				 	case 'creative black tie':
				 	 	img = require("../assets/dresscodes/creative_black_tie.jpg")
				 	 	break;
				 	case 'warm weather black tie':
				 	 	img = require("../assets/dresscodes/warm_weather_black_tie.jpg")
				 	 	break;
				 	default:
				 		img = require("../assets/dresscodes/clothes.jpg")
				 		break;
				 }
				
		      return ( 
		        <TouchableOpacity key={item.id} style={styles.tile} onPress={()=>{this.setState({currentDresscode: item.name, visibleDialog:true})}} >
		        	<ImageBackground source={img} style={styles.tileImage}>
		      		 <LinearGradient
					  colors={[gradientColor, 'transparent', 'transparent']}
					 start={[0, 1.0]}
                          end={[0, 0]}
					 style={styles.tileGradient}
					>
		      		<Text style={styles.tileText}>{item.name}</Text>
		      		</LinearGradient>
		      		</ImageBackground>
		      		
		      	</TouchableOpacity>
		      )
		    })
	}
	
	render(){
		return(
			<View style={styles.containerNoBackground}>
			{this.showDressCodeDialog()}
			<Text style={styles.title}>Available dresscodes</Text>
			<LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                              
                              </LinearGradient>
			<ScrollView style={styles.scrollContainer}>
			<View style={styles.scrollBackground}>
				{this.createDressCodeTab()}
			</View>
			</ScrollView>
			</View>
		)

		
	}
}