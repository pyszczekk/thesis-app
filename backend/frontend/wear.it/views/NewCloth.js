import React from 'react';
import {Dimensions, YellowBox, ScrollView, View, Modal,Text, Picker, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import {
    SliderHuePicker,
    SliderSaturationPicker,
    SliderValuePicker,
} from 'react-native-slider-color-picker';
import Carousel , { Pagination }from 'react-native-snap-carousel';
import tinycolor from 'tinycolor2';
import { styles } from '../style.js';
import MultiSelect from 'react-native-multiple-select';
import {imgs} from '../clothes-subcategories.js';
const {
    width,
} = Dimensions.get('window');

var subCat = imgs;
const data = require('../server-info.json')
const categories = require('../clothes-categories.json');


export default class NewCloth extends React.Component{
	constructor(props){
		super(props);
		this.state={
			login:"",
			part:"",
			category:"",
			clothCategory:"",
			clothColor:"#FF7700",
			clothMaterial:"",
			gender:"",
			activeSlide:0,
			addedClothID:"",
			dressCodes:[],
			selectedDresscodes:[],
			showInfo:false,
			showError:false,
			offeredDressCodes:[],
			searchCategory:"",
			dressCodeInfo:"",
			proposedMaterialDressCodes:[],
			proposedCategoryDresscodes:[],


		}
		 AsyncStorage.getItem('user', (err, result) => {
		  	if(result!=null){
		  	var res = JSON.parse(result);
		  	

		  	this.setState({login:res.login,
		  				   gender: res.gender,

		  				  // category: categories[res.gender][this.state.part][0]
		  					})
		  	subCat = imgs[res.gender]

			  }
		})
		  	this.setSelectedPart = this.setSelectedPart.bind(this);
		  	this.setSelectedCategory = this.setSelectedCategory.bind(this);
		  	this.setClothMaterial = this.setClothMaterial.bind(this)
	}
	componentDidMount(){
		this._isMounted=true;
		 YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
		 YellowBox.ignoreWarnings(['YellowBox has been replaced']);
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

 findDressCodesForMaterial(material){
		//console.log("searching for material: "+material)

		let url = 'http://'+data.IP+':'+data.PORT+'/app/dresscode/material/'+material
		 fetch(url, {
			      method: "GET"
			    })
			    .then((response) => {
			    	if(response.status==200){
			    		return response.json();
			    	}
			    	
			    })
			    .then((responseJson) => {
			    	
			       		var array = []
			       		for(var i =0; i<responseJson.length; i++){
			       			array.push(responseJson[i].name);
			       		}
			       		
			         this.setState({
			            proposedMaterialDressCodes: array
			         })
			          
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

			
	 
  
	}
	findDressCodesForCategory(cat){
		
		if(this.state.gender=="f"){
			let url = 'http://'+data.IP+':'+data.PORT+'/app/dresscode/woman'
			var body={
				category:cat
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
			    .then((response) => {
			    	if(response.status==200){
			    		return response.json();
			    	}
			    	
			    })
			    .then((responseJson) => {
			    	//console.log(responseJson)
			    	if(responseJson!=undefined){
			       		var array = [];
			       		for(var i =0; i<responseJson.length; i++){
			       			array.push(responseJson[i].name);
			       		}
			       		//console.log(array)
				         this.setState({
				            proposedCategoryDresscodes: array
				         })
			          }
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()

		}else{
			let url = 'http://'+data.IP+':'+data.PORT+'/app/dresscode/man'
			var body:{
				category:cat
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
			    .then((response) => {
			    	if(response.status==200){
			    		return response.json();
			    	}
			    	
			    })
			    .then((responseJson) => {
			    	//console.log(responseJson)
			    	if(responseJson!=undefined){
			       		var array = [];
			       		for(var i =0; i<responseJson.length; i++){
			       			array.push(responseJson[i].name);
			       		}
			       		//console.log(array)
				         this.setState({
				            proposedCategoryDresscodes: array
				         })
			          }
			      })
			      
			    .catch((error) => {
			         console.error(error)
			      })
			    .done()
		}
	}
	setSelectedPart(value){
		this.setState({part: value,
			activeSlide:0
		});
	}

	setSelectedCategory(value){

		this.setState({category: value, activeSlide:0});
		this.findDressCodesForCategory(value)
		
	}
	setClothMaterial(event){

		this.setState({ clothMaterial: event.nativeEvent.text})
		if(event.nativeEvent.text!=""){
			this.findDressCodesForMaterial(event.nativeEvent.text);
		}
	}
	loadCategories(){
		
		var cat = categories[this.state.gender];
		if(cat!=undefined){
			var catArray = cat[this.state.part];
			if(catArray!=undefined){
				var mainCategories = catArray.categories

			return mainCategories.map((item) =>{
					return(
						<Picker.Item  key={item} label={item} value={item} />
					)	
			})
			}
		}
	}
	_renderItem = ({item, index}) => {
		var dataSet = subCat[this.state.category];
		if(this.state.activeSlide==""){
			this.state.activeSlide=0;
			this.state.clothCategory= dataSet[0].name
			
		}
		if(dataSet!=undefined)
        return(
        	<View style={{width:150, justifyContent:'center', alignItems:'center'}}>
				<View style={{  width:150, height:150, backgroundColor:this.state.clothColor, marginTop:20, justifyContent:'center', alignItems:'center'}}>
					<Image source={dataSet[index].require} style={{width:150, height:150}}/>
				</View>
			</View>

		)
    }
    get pagination () {
        if(subCat[this.state.category]!=undefined)
        return (
            <Pagination

              dotsLength={subCat[this.state.category].length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{ backgroundColor: 'transparent',  width:width*0.8, flexGrow:0, margin:0 }}
              dotStyle={{
                  width: 5,
                  height: 5,
                  borderRadius: 5,
                  backgroundColor: 'black',
                  flex:1,

              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              dotContainerStyle={{
              	marginHorizontal:2,
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              initialNumToRender={4}
	              maxToRenderPerBatch={5}
			    updateCellsBatchingPeriod={30}
			    removeClippedSubviews={false}

			    onEndReachedThreshold={0.1}
            
            />
        );
    }
	showSubcategoryCarousell(){
		if(subCat[this.state.category]!=undefined){
		return(
			<View style={{alignItems:'center', justifyContent:'center', margin:0}}>
	            <Carousel
	              ref={(c) => { this._carousel = c; }}
	              data={subCat[this.state.category]}
	              renderItem={this._renderItem}

	              sliderWidth={150}
	              itemWidth={150}
	              containerCustomStyle={{ flexGrow:0}}
	              initialNumToRender={4}
	              maxToRenderPerBatch={5}
			    updateCellsBatchingPeriod={30}
			    removeClippedSubviews={false}
			    loop={false}
			    showsPageIndicator={true}
			    onEndReachedThreshold={0.1}

	              onSnapToItem={(index) => this.setState({ activeSlide: index , clothCategory:subCat[this.state.category][index].name, searchCategory:subCat[this.state.category][index].searchString}) }
			    

	            />
	            {this.pagination}
            </View>
      		
		)
	}else{
		return(
			<View style={{width:200, height:200, alignItems:'center', justifyContent:'center', margin:0}}>
	          
            </View>
            )
      		
	}
		
	}
	changeColor = (colorHsvOrRgb, resType) => {

        if (resType === 'end') {
            this.setState({
                clothColor: tinycolor(colorHsvOrRgb).toHexString(),
            });
        }
    }
	showColorPicker(){
		return(
		<View style={{justifyContent:'center', alignItems:'center', width:width}}>
			<View style={{marginTop: 10, height: 12}}>
                    <SliderHuePicker
                        ref={view => {this.sliderHuePicker = view;}}
                        oldColor={this.state.clothColor}
                        trackStyle={[{height: 12, width:width*0.8}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                    />
                </View>
                <View style={{ marginTop: 10, height: 12, width: width*0.8}}>
                    <SliderSaturationPicker
                        ref={view => {this.sliderSaturationPicker = view;}}
                        oldColor={this.state.clothColor}
                        trackStyle={[{height: 12, width: width*0.8}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: tinycolor({h: tinycolor(this.state.clothColor).toHsv().h, s: 1, v: 1}).toHexString()}}
                    />
                </View>
                <View style={{ marginTop: 10, height: 12, width: width*0.8}}>
                    <SliderValuePicker
                        ref={view => {this.sliderValuePicker = view;}}
                        oldColor={this.state.clothColor}
                        minimumValue={0.02}
                        step={0.05}
                        trackStyle={[{height: 12, width: width*0.8}]}
                        trackImage={require('react-native-slider-color-picker/brightness_mask.png')}
                        thumbStyle={styles.thumb}
                        onColorChange={this.changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: 'black'}}
                    />
                </View>
                </View>
             
		)
	}

	async saveClothe(){
		const pointerThis = this;
		//console.log(this.state.selectedDresscodes!="")
		if(this.state.part!=0 && this.state.category!=0 && this.state.selectedDresscodes!=[]&& this.state.selectedDresscodes!=""){
			if(this.state.clothColor !="" && this.state.clothCategory!="" && this.state.selectedDresscodes!=""){
				let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/part/'+this.state.part
  				let body = {
  					category: this.state.clothCategory,
	                color: this.state.clothColor,
	                material: this.state.clothMaterial,
  				}
  				 await fetch(url, {
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
			    .then(response=> {
			    	
				    if(response.ok){
				    	return response.json();
				    }
                               
                                 })
			    .then(response => {
			        pointerThis.addDressCodeRelation(response)
			        this.setState({
						showInfo:true
					})

			    })
			      
			    .catch((error) => {
			    	 this.setState({
						showError:true
					})
			         console.error(error)
			      })
			    .done()
			    

			}
			}
			
	
		
	}

	async addDressCodeRelation(id){
		let array = this.state.selectedDresscodes;
		this.setState({
			part:"",
			category:"",
			clothCategory:"",
			clothColor:"#FF7700",
			clothMaterial:"",
			activeSlide:"",
			addedClothID:"",
			selectedDresscodes:[],
			proposedMaterialDressCodes:[],
			proposedCategoryDresscodes:[],
			searchCategory:"",

		})
		return array.map((item,index) => {
			let url = 'http://'+data.IP+':'+data.PORT+'/app/people/'+this.state.login+'/clothes/'+id+'/dresscode';
  			var body = {
  				name: item
  			}
  			fetch(url,{
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
			    .then(response=> {

			    })
			    .catch((error) => {
			    	 
			         console.error(error)
			      })
			    .done()
		})
		
	}
	chooseDresscodes(){
		if(this.state.showDresscodes){
			return(
				<View
		       
		        style={{width:'100%',height:'100%', justifyContent:'center', alignItems:'center'}}
     		 >
     		 <View style={styles.overlay}  >
	     		 <View style={[styles.modal]}>
	     		 <View>
					  <MultiSelect
					          hideTags
					          items={this.state.dressCodes}
					          uniqueKey="name"
					          ref={(component) => { this.multiSelect = component }}
					          onSelectedItemsChange={this.onSelectionsChange}
					          selectedItems={this.state.selectedDresscodes}
					          selectText="choose dresscodes"
					          searchInputPlaceholderText="Search dresscodes..."
					          onChangeInput={ (text)=> console.log(text)}
					          tagRemoveIconColor="#CCC"
					          tagBorderColor="#CCC"
					          tagTextColor="#CCC"
					          selectedItemTextColor="#CCC"
					          selectedItemIconColor="#CCC"
					          itemTextColor="#000"
					          displayKey="name"
					          searchInputStyle={{ color: '#CCC' }}
					          submitButtonColor="#85ff85"
					          submitButtonText="Save"
					          searchInputStyle={{padding:5, marginLeft:5}}
					        />
					        </View>
			  </View>
			  </View>
			  </View>
			  )
		}
	}
	renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}
onSelectionsChange=(selectedDresscodes)=>{
    // selectedFruits is array of { label, value }
    this.setState({selectedDresscodes: selectedDresscodes })
  }
  clotheAdded(){
  	
  	if(this.state.showInfo){
  		this.scroll.scrollTo({x: 0, y: 0, animated: true})
  	return(
  		<View style={styles.positiveInfo}>
  			<Text>
  				Cloth added
  			</Text>
  		</View>
  		)
  }
  }
  sthWentWrong(){
  	if(this.state.showError){
  		this.scroll.scrollTo({x: 0, y: 0, animated: true})
  	return(
  		<View style={styles.negativeInfo}>
  			<Text>
  				Something went wrong... try again
  			</Text>
  		</View>
  		)
  }
  }
  loadMaterialDresscodes(){
  	return this.state.proposedMaterialDressCodes.map((item,index)=>{
  			var old = this.state.dressCodeInfo;

  			if(index==0){
  				old="Based on material, we suggest: \n" +item
  			}else{
  				old = old+ ", "+item
  			}
  			
  			this.state.dressCodeInfo=old;
  	})
  }
  loadCategoryDresscodes(){
  	return this.state.proposedCategoryDresscodes.map((item,index)=>{
  			var old = this.state.dressCodeInfo;

  			if(index==0){
  				if(old==""){
  					old= "Based on category, we suggest:\n"+item
  				
  				}else
  				old= old+ "\n \n Based on category, we suggest: \n"+item
  			}else{
  				old = old+ ", "+item
  			}
  			
  			this.state.dressCodeInfo=old;
  	})
  }
  reloadProposedDressCodes(){
  	//console.log(this.state.proposedMaterialDressCodes)
  	if(this.state.proposedMaterialDressCodes!=[] || this.state.proposedCategoryDresscodes!=[]){
  		this.state.dressCodeInfo="";
  		this.loadMaterialDresscodes();
  		this.loadCategoryDresscodes();
  	}
  	if(this.state.proposedMaterialDressCodes==[] && this.state.proposedCategoryDresscodes==[]){
  		this.state.dressCodeInfo="";
  		return;
  	}
  	
  }
  componentDidUpdate(prevProps,prevState){
  	//this.reloadProposedDressCodes();
  	if(this._isMounted)
  	if(prevState.activeSlide!=this.state.activeSlide || this.state.activeSlide==0)
  	if(this.state.searchCategory!=""){
  		this.findDressCodesForCategory(this.state.searchCategory)
  	}
  }
  componentWillUnmount(){
  	this._isMounted=false;
  }

	render(){
		if(this.state.showError){
			this.scroll.scrollTo({x: 0, y: 0, animated: true})
			setTimeout(() => {this.setState({showError: false})}, 4000)
		}
		if(this.state.showInfo){
			this.scroll.scrollTo({x: 0, y: 0, animated: true})
			setTimeout(() => {this.setState({showInfo: false})}, 4000)
		}

		this.reloadProposedDressCodes();
		return(
			<View >
			
			<ScrollView ref={(component) => { this.scroll = component }} style={{marginBottom:70}}>

			<View style={[styles.containerNoBackground,{justifyContent:'flex-start', marginTop:0}]}>
			
			<Text style={styles.title}>Add New Cloth</Text>
			<LinearGradient start={[0, 0.5]}
                              end={[1, 0.5]}
                              colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                              style={{ height: 1, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
             </LinearGradient>
             {this.clotheAdded()}
             {this.sthWentWrong()}
             <View style={{borderBottomWidth:1}}>
                 <Picker
			        selectedValue={this.state.part}
			        style={{ height: 30, width: width*0.8, marginTop:10}}
			        onValueChange={(itemValue) => this.setSelectedPart(itemValue)}
			      >
			       <Picker.Item label="select part" value="0" color='gray' disable='true' />
			        <Picker.Item label="top" value="top" />
			        <Picker.Item label="bottom" value="bottom" />
			        <Picker.Item label="set" value="set" />
			      </Picker>
			      </View>
			<View style={{borderBottomWidth:1}}>
				<Picker
			        selectedValue={this.state.category}
			        style={{ height: 30, width: width*0.8, margin:0}}
			        onValueChange={(itemValue) => this.setSelectedCategory(itemValue)}
			      >
			       <Picker.Item label="select category" value="0" color='gray' enable='false' />
			        {this.loadCategories()}
			      </Picker>
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
                        />

			 	
			   {this.showSubcategoryCarousell()}
  			<View>
			   {this.showColorPicker()}
			</View>
			  	 </View>
			  	 <View style={{width:'80%', marginLeft:'10%', marginTop:25}}>
			  	 
			  	 {this.state.dressCodeInfo!=""? <Text style={styles.dressCodeInfo}>
			  	 	{this.state.dressCodeInfo}
			  	 </Text> : null }
			  	 <MultiSelect
					          hideTags
					          items={this.state.dressCodes}
					          uniqueKey="name"
					          ref={(component) => { this.multiSelect = component }}
					          onSelectedItemsChange={this.onSelectionsChange}
					          selectedItems={this.state.selectedDresscodes}
					          selectText="  choose dresscodes"
					          searchInputPlaceholderText="Search dresscodes..."
					          onChangeInput={ (text)=> console.log(text)}
					          tagRemoveIconColor="#CCC"
					          tagBorderColor="#CCC"
					          tagTextColor="#CCC"
					          selectedItemTextColor="#CCC"
					          selectedItemIconColor="#85ff85"
					          itemTextColor="#000"
					          displayKey="name"
					          searchInputStyle={{ color: '#CCC' }}
					          submitButtonColor="#000"
					          submitButtonText="Save"
					          searchInputStyle={{padding:5, marginLeft:5}}

					          nestedScrollEnabled={true}
					        />
					       
			
				 <TouchableOpacity onPress={()=>{this.saveClothe()}} style={[styles.bgButton,{width:width*0.7, padding:10}]}
                          >
                          <LinearGradient start={[0, 1.0]}
                          end={[1, 1.0]}
                          colors={['#1F6570', '#4ECDC4', '#FF6B6B', '#FFE66D']}
                          style={{borderRadius: 10}}>
                              <View style={styles.circleGradient}>
                                  <Text style={{fontSize:18, textAlign:'center'}}>
                                        Add to your collection
                                    </Text>
                                </View>
                            </LinearGradient>
                           

                       </TouchableOpacity>

					     
</View>
			
			
			</ScrollView>
			</View>
		
			)
	}
}