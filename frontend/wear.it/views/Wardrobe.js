import React from 'react';
import {ScrollView,Dimensions, RefreshControl, View, Modal,Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from '../style.js';
import {imgs} from '../clothes-subcategories.js';
import {
    SliderHuePicker,
    SliderSaturationPicker,
    SliderValuePicker,
} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
const data = require('../server-info.json')
const categories = require('../clothes-categories.json');
const {
    width,
} = Dimensions.get('window');

export default class Wardrobe extends React.PureComponent{
	constructor(){
		super();
		this.state={
			name:"",
			gender:"",
			login:"",
			clothes:"",
			refreshing: false,
			visibleDialog:false,
			dialogItem:"",
			dialogImg:"",
			dialogItemColor:"",
			dialogItemMaterial:"",
			

		}

		
		this.setClothMaterial = this.setClothMaterial.bind(this)
	
	}
	componentDidMount(){
		this._isMounted=true
		AsyncStorage.getItem('user', (err, result) => {
		  	if(result!=null){
		  	var res = JSON.parse(result);
		  	if(this._isMounted)
		  	this.setState({name: res.name,
		  				   login:res.login,
		  				   gender: res.gender,
		  				   load:true
		  					})
		  	this.loadClothes();
		  	}
		  })

	}
	setClothMaterial(event){
		if(this._isMounted)
		this.setState({ dialogItemMaterial: event.nativeEvent.text })
	}
	loadClothes(){
		if(this.state.login!=""){
		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes'
  
			  fetch(url, {
			      method: "GET"
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			        if(this._isMounted)
			         this.setState({
			            clothes: responseJson
			         })
			        // console.log(responseJson);
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

			}
	}
	saveChanges(){
		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/'+this.state.dialogItem.id
	  	let body = {
  					id: this.state.dialogItem.id,
	                color: this.state.dialogItemColor,
	                material: this.state.dialogItemMaterial,
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
			 
			    .then(function(response){
			    	//console.log(response.ok)
			    })
			    
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

			
		if(this._isMounted)
		this.setState({visibleDialog:false, refreshing:true})
	}
	deleteCloth(){
		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/'+this.state.dialogItem.id
	  
  			fetch(url, {
				      method: "DELETE",
				    
			    })
			 
			    .then(function(response){
			    	//console.log(response.ok)
			    })
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

			
	    if(this._isMounted)
		this.setState({visibleDialog:false, refreshing:true})
	}

	getImageForClothe(category){
		let images = imgs[this.state.gender];
		var words = category;
		var res = words.split("_").splice(-1)
		
		let subcat = images[res];
		if(subcat!=undefined)
		for(var i =0; i<subcat.length; i++){
			if(subcat[i].name==category){
				return subcat[i].require
			}
		}
	}
	showClothes(){
		if(this.state.clothes!=""){
			return this.state.clothes.map((item, index)=>{
				var img = this.getImageForClothe(item.category);
				return(
					
					<View key={index} style={{width:'33%', justifyContent:'center', alignItems:'center'}}>
						<TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={()=>{this.setState({dialogItem:item, visibleDialog:true, dialogImg:img, dialogItemColor:item.color, dialogItemMaterial:item.material})}}>
						<View style={{  width:100, height:100, backgroundColor:item.color, marginTop:20, justifyContent:'center', alignItems:'center'}}>
							<Image source={img} style={{width:100, height:100}}/>
							
						</View>
						<Text>{item.material}</Text>
						</TouchableOpacity>
					
					</View>
					
					)
			})
		}
	}
	changeColor = (colorHsvOrRgb, resType) => {

        if (resType === 'end') {
        	if(this._isMounted)
        	this.setState({
        		dialogItemColor:tinycolor(colorHsvOrRgb).toHexString(),
        	})
           
        }
    }
	showColorPicker(){
		return(
		<View style={{justifyContent:'center', alignItems:'center', width:width}}>
			<View style={{marginTop: 10, height: 12}}>
                    <SliderHuePicker
                        ref={view => {this.sliderHuePicker2 = view;}}
                        oldColor={this.state.dialogItemColor}
                        trackStyle={[{height: 12, width:width*0.6}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                    />
                </View>
                <View style={{ marginTop: 10, height: 12, width: width*0.6}}>
                    <SliderSaturationPicker
                        ref={view => {this.sliderSaturationPicker2 = view;}}
                        oldColor={this.state.dialogItemColor}
                        trackStyle={[{height: 12, width: width*0.6}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: tinycolor({h: tinycolor(this.state.dialogItemColor).toHsv().h, s: 1, v: 1}).toHexString()}}
                    />
                </View>
                <View style={{ marginTop: 10, height: 12, width: width*0.6}}>
                    <SliderValuePicker
                        ref={view => {this.sliderValuePicker2 = view;}}
                        oldColor={this.state.dialogItemColor}
                        minimumValue={0.02}
                        step={0.05}
                        trackStyle={[{height: 12, width: width*0.6}]}
                        trackImage={require('react-native-slider-color-picker/brightness_mask.png')}
                        thumbStyle={styles.thumb}
                        onColorChange={this.changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: 'black'}}
                    />
                </View>
                  <TextInput
                            placeholder = "main material (ex. silk, cotton)"
                            textAlign = 'center'
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {styles.input}
                            returnKeyType = "next"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setClothMaterial}
                            value={this.state.dialogItemMaterial}
                        />
                </View>
             
		)
	}

	openEditDialog(){
      return(
			<View
		        animationType="fade"
		        transparent={true}
		        visible={this.state.visibleDialog}
		        style={{width:'100%',height:'100%', justifyContent:'center', alignItems:'center'}}
     		 >
     		 <View style={styles.overlay}  >
	     		 <View style={styles.modal}>
	     		 <Text style={{fontWeight:'bold',fontSize:16, textTransform:'uppercase'}}>{this.state.currentDresscode}</Text>
	     		<View style={{  width:100, height:100, backgroundColor:this.state.dialogItemColor, marginTop:20, justifyContent:'center', alignItems:'center'}}>
							<Image source={this.state.dialogImg} style={{width:100, height:100}}/>
							
				</View>

				{this.showColorPicker()}
	     		<TouchableOpacity onPress={()=>{this.saveChanges()}} style={{width:120, marginTop:30}}>
	     		 <Text style={styles.smButton}>
	                                Save changes
	                            </Text>
	                             <LinearGradient start={[0, 0.5]}
	                              end={[1, 0.5]}
	                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
	                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
	                              
	                              </LinearGradient>
	     		 </TouchableOpacity >
	     		 <TouchableOpacity onPress={()=>{this.deleteCloth()}} style={{width:90, marginTop:30}}>
	     		 <Text style={styles.smButton}>
	                                Delete it
	                            </Text>
	                             <LinearGradient start={[0, 0.5]}
	                              end={[1, 0.5]}
	                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
	                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
	                              
	                              </LinearGradient>
	     		 </TouchableOpacity >
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
     		 </View>
     		 </View>
		)
	}
	componentWillUnmount(){
		this._isMounted=false
	}

	onRefresh(){
		
		this.loadClothes();
		this.state.refreshing=false;
		
	}
	render(){
		
		return(
			<View style={styles.containerNoBackground}>
			{this.state.visibleDialog ? this.openEditDialog() : null}
			
			<Text style={styles.title}>Your clothes</Text>
			<LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                              
                              </LinearGradient>
			<ScrollView style={styles.scrollContainer}
			 refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh()} />}
			 >
			<View style={styles.scrollBackground}>
				<View style={{flex: 1,
					    flexDirection: 'row',
					    flexWrap: 'wrap'}}>
					{this.showClothes()}
				</View>
			</View>
			</ScrollView>
			</View>

             		)
		}
	
}