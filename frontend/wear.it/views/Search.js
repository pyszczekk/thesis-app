import React from 'react';
import {ScrollView,Dimensions, View, Modal,Text, Image, StyleSheet, Picker,ImageBackground, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from '../style.js';
import {imgs} from '../clothes-subcategories.js';

import Carousel , { Pagination }from 'react-native-snap-carousel';
const {
    width,
} = Dimensions.get('window');


const data = require('../server-info.json')
export default class Search extends React.Component{
	constructor(){
		super();
		this.state={
			events:null,
			selectedEvent:"",
			activeSlideSets:0,
			activeSlideTops:0,
			activeSlideBottoms:0,
			showSets:false,
			showTopsAndBottoms:true,
		}
	}
	setSelectedEvent(event){
		this.setState({
			selectedEvent:event,
			activeSlideSets:0,
			activeSlideTops:0,
			activeSlideBottoms:0,
		})
		this.loadSets(event);
		this.loadTops(event);
		this.loadBottoms(event);
	}

	loadSets(ev){

		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/part/set/event/';
  		
			var body={
				name:ev
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
			      body:JSON.stringify(body)
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			         
			         this.setState({

			            sets: responseJson
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()


	}
	loadTops(ev){

		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/part/top/event/';
  		
			var body={
				name:ev
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
			      body:JSON.stringify(body)
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			        
			         this.setState({

			            tops: responseJson
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()
	}
	loadBottoms(ev){

		let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/part/bottom/event/';
  		
			var body={
				name:ev
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
			      body:JSON.stringify(body)
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			       // console.log(responseJson)
			         this.setState({

			            bottoms: responseJson
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()
	}
	componentDidMount(){
			AsyncStorage.getItem('user', (err, result) => {
		  	if(result!=null){
			  	var res = JSON.parse(result);
			 
			  	this.setState({name: res.name,
			  				   login:res.login,
			  				   password: res.password,
			  				   gender: res.gender
			  					})
			}
		});

		  let url = 'http://'+data.IP+':'+data.PORT+'/app/events'
  		

			fetch(url, {
			      method: "GET"
			    })
			    .then((response) => response.json())
			    .then((responseJson) => {
			         
			         this.setState({
			            events: responseJson
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

	}
	renderEventSelect(){
		if(this.state.events!=null)
		return this.state.events.map((item) =>{
					return(
						<Picker.Item  key={item} label={item.name} value={item.name} />
					)	
			})
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
	_renderItem = ({item, index}) => {
		
		if(this.state.activeSlideSets==""){
			this.state.activeSlideSets=0;
			
			
		}
		var img = this.getImageForClothe(item.category);
		if(img!=undefined)
        return(
        	<View style={{width:150, justifyContent:'center', alignItems:'center'}}>
				<View style={{  width:150, height:150, backgroundColor:this.state.sets[index].color, marginTop:20, justifyContent:'center', alignItems:'center'}}>
					<Image source={img} style={{width:150, height:150}}/>
				</View>
			</View>

		)
    }
    _renderTopItem = ({item, index}) => {
		
		if(this.state.activeSlideTops==""){
			this.state.activeSlideTops=0;
			
			
		}
		var img = this.getImageForClothe(item.category);
		if(img!=undefined)
        return(
        	<View style={{width:150, justifyContent:'center', alignItems:'center'}}>
				<View style={{  width:150, height:150, backgroundColor:this.state.tops[index].color, marginTop:20, justifyContent:'center', alignItems:'center'}}>
					<Image source={img} style={{width:150, height:150}}/>
				</View>
			</View>

		)
    }
   
   _renderBottomItem = ({item, index}) => {
		
		if(this.state.activeSlideBottoms==""){
			this.state.activeSlideBottomss=0;
			
			
		}
		var img = this.getImageForClothe(item.category);
		if(img!=undefined)
        return(
        	<View style={{width:150, justifyContent:'center', alignItems:'center'}}>
				<View style={{  width:150, height:150, backgroundColor:this.state.bottoms[index].color, marginTop:20, justifyContent:'center', alignItems:'center'}}>
					<Image source={img} style={{width:150, height:150}}/>
				</View>
			</View>

		)
    }
   
    geneareTopAndBottomCarousel(){
		
			this.generateTopCarousel()
			this.generateBottomCarousel()
			
	}
	 generateTopCarousel(){
		if(this.state.tops!=undefined)
			return(
			<View style={{alignItems:'center', justifyContent:'center', margin:0, width:'100%', flexDirection:'column'}}>
	            <Carousel
	              ref={(c) => { this._carouselTops = c; }}
	              data={this.state.tops}
	              renderItem={this._renderTopItem}

	              sliderWidth={width*0.8}
	              itemWidth={150}
	              inactiveSlideOpacity={1.0}
	              containerCustomStyle={{ flexGrow:0}}
	              initialNumToRender={4}
	              maxToRenderPerBatch={5}
			    updateCellsBatchingPeriod={30}
			    removeClippedSubviews={false}
			    loop={false}
			    showsPageIndicator={true}
			    onEndReachedThreshold={0.1}

	              onSnapToItem={(index) => this.setState({ activeSlideTops: index }) }
			    

	            />
	           
            </View>
			)
	}
	generateBottomCarousel(){
		if(this.state.bottoms!=undefined)
			return(
			<View style={{alignItems:'center', justifyContent:'center', margin:0, width:'100%', flexDirection:'column'}}>
	            <Carousel
	              ref={(c) => { this._carouselBottoms = c; }}
	              data={this.state.bottoms}
	              renderItem={this._renderBottomItem}

	              sliderWidth={width*0.8}
	              itemWidth={150}
	              inactiveSlideOpacity={1.0}
	              containerCustomStyle={{ flexGrow:0}}
	              initialNumToRender={4}
	              maxToRenderPerBatch={5}
			    updateCellsBatchingPeriod={30}
			    removeClippedSubviews={false}
			    loop={false}
			    showsPageIndicator={true}
			    onEndReachedThreshold={0.1}

	              onSnapToItem={(index) => this.setState({ activeSlideBottoms: index }) }
			    

	            />
	           
            </View>
			)
	}
	generateSetsCarousel(){
		if(this.state.sets!=undefined)
			return(
			<View style={{alignItems:'center', justifyContent:'center', margin:0, width:'100%', flexDirection:'column'}}>
	            <Carousel
	              ref={(c) => { this._carousel = c; }}
	              data={this.state.sets}
	              renderItem={this._renderItem}

	              sliderWidth={width*0.8}
	              itemWidth={150}
	              inactiveSlideOpacity={1.0}
	              containerCustomStyle={{ flexGrow:0}}
	              initialNumToRender={4}
	              maxToRenderPerBatch={5}
			    updateCellsBatchingPeriod={30}
			    removeClippedSubviews={false}
			    loop={false}
			    showsPageIndicator={true}
			    onEndReachedThreshold={0.1}

	              onSnapToItem={(index) => this.setState({ activeSlideSets: index }) }
			    

	            />
	           
            </View>
			)
	}
	showSets(){
		this.setState({
			showSets:true,
			showTopsAndBottoms:false,
		})
	}
	showTopsAndBottoms(){
		this.setState({
			showSets:false,
			showTopsAndBottoms:true,
		})
	}
	render(){
		return(
				
					<View style={[styles.containerNoBackground,{flex:1, justifyContent:'flex-start', marginTop:0}]}>
					
						<Text style={styles.title}>Search Clothes</Text>
						<LinearGradient start={[0, 0.5]}
			                              end={[1, 0.5]}
			                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
			                              style={{ height: 1, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
			             </LinearGradient>
			             
						        <View style={{borderBottomWidth:1, marginTop:10}}>
			                		<Picker
								        selectedValue={this.state.selectedEvent}
								        style={{ height: 30, width: width*0.8, marginTop:10}}
								        onValueChange={(itemValue) => this.setSelectedEvent(itemValue)}
								      >
								       <Picker.Item label="select event" value="0" color='gray' enable='false' />
			       
								      {this.renderEventSelect()}
								      </Picker>
   								</View>
   							
   								<View style={{flex:1, justifyContent:'center', alignItems:'center', textAlign:'canter'}}>
   									
   									
   											{this.state.showTopsAndBottoms? this.generateTopCarousel():null}
   											{this.state.showTopsAndBottoms? this.generateBottomCarousel():null}
   									
   									
   											{this.state.showSets? this.generateSetsCarousel():null}
   									
   								</View>
   								<View style={{flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'flex-end', textAlign:'canter', marginBottom:60}} >
   								 <TouchableOpacity onPress={() => this.showSets()}
                          style={{width:130, margin:20}}>
                            <Text style={styles.smButton}>
                                Show appropriate sets
                            </Text>
                            {this.state.showSets? <LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                              
                              </LinearGradient>:null}
                        </TouchableOpacity>
                         <TouchableOpacity onPress={() => this.showTopsAndBottoms()}
                          style={{width:130, margin:20}}>
                            <Text style={styles.smButton}>
                                Show appropriate tops and bottoms
                            </Text>
                            {this.state.showTopsAndBottoms? <LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                              
                              </LinearGradient>:null}
                        </TouchableOpacity>
                        </View>
	            	 </View>
				
			)
	}
}