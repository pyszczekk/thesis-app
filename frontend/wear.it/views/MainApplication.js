import React, {Component} from 'react';  
import {View,Text, Image, ImageBackground, StatusBar, SafeAreaView} from 'react-native';  
import {createAppContainer} from 'react-navigation';  
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { styles } from '../style.js';

import Dresscodes from './Dresscodes.js';
import Profile from './Profile.js'; 
import NewCloth from './NewCloth.js';
import Wardrobe from './Wardrobe.js';
import Search from './Search.js';
class HomeScreen extends React.Component {

  render() {
    return(
      <View style={styles.container}>
            
        <View style={{width:'100%',
        paddingTop:40,
        backgroundColor:'#1F6570', 
        shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
           }}>  
                   <Image
                       style={styles.logo}
                      source={require('../assets/wearIt.png')}
                      resizeMode="contain"
                    />
                </View> 
       <ImageBackground source={require('../assets/background.png')} style={styles.background}>
                   <Dresscodes/>
        </ImageBackground>
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  render() {
    return(
       <View style={styles.container}>
        
                <View style={{width:'100%',
                paddingTop:40,
        backgroundColor:'#4ECDC4',
         shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
    }}>  
                   <Image
                       style={styles.logo}
                      source={require('../assets/wearIt.png')}
                      resizeMode="contain"
                    />
                </View> 
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
       
            <Search />
        </ImageBackground>
      </View>
    );
  }
}
class NewClothScreen extends React.Component {
  render() {
    return(
       <View style={styles.container}>
        <View style={{width:'100%',
        paddingTop:40,
        backgroundColor:'#85ff85',
         shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
    }}>  
                   <Image
                       style={styles.logo}
                      source={require('../assets/wearIt.png')}
                      resizeMode="contain"
                    />
                </View> 
       <ImageBackground source={require('../assets/background.png')} style={styles.background}>
       
       <NewCloth />
        </ImageBackground>
      </View>
    );
  }
}
class WardrobeScreen extends React.Component {
  render() {
    return(
        <View style={styles.container}>
        <View style={{width:'100%',
        paddingTop:40,
        backgroundColor:'#FF6B6B',
         shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
    }}>  
                   <Image
                       style={styles.logo}
                      source={require('../assets/wearIt.png')}
                      resizeMode="contain"
                    />
                </View> 
         <ImageBackground source={require('../assets/background.png')} style={styles.background}>
                     <Wardrobe />
        </ImageBackground>
      </View>
    );
  }
}
class ProfileScreen extends React.Component {
  render() {
    return(
      <View style={styles.container}>
      <View style={{width:'100%',
      paddingTop:40,
        backgroundColor:'#FFE66D',
         shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
    }}>  
                   <Image
                       style={styles.logo}
                      source={require('../assets/wearIt.png')}
                      resizeMode="contain"
                    />
                </View> 
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
            <Profile navigation={this.props.navigation} goBack={()=>{this.props.navigation.navigate('Auth')}} />
        </ImageBackground>
      </View>
    );
  }
}
HomeScreen.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>{
               
                let iconName, iconFocus, iconId, iconLabel, flag = true;
               
              
                   iconName = require('../assets/icons/home.png'),
                 iconFocus = require('../assets/icons/focus/home.png')
                

                 return <Image source={(tintColor=='#a9ecf3') ? iconFocus
                    : iconName } style={{width:30, height:30}}  />
                
            },
            
} 
SearchScreen.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>{
               
                let iconName, iconFocus, iconId, iconLabel, flag = true;
               
              
                   iconName = require('../assets/icons/search.png'),
                 iconFocus = require('../assets/icons/focus/search.png')
                

                 return  <Image source={(tintColor=='#a9ecf3') ? iconFocus
                    : iconName } style={(tintColor=='#a9ecf3')? {width:30, height:30} : {width:30, height:30 }}  />
                
            },

         
} 
NewClothScreen.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>{
               
                let iconName, iconFocus, iconId, iconLabel, flag = true;
               
              
                   iconName = require('../assets/icons/addNew.png'),
                 iconFocus = require('../assets/icons/focus/addNew.png')
                

                 return  <Image source={(tintColor=='#a9ecf3') ? iconFocus
                    : iconName } style={{width:30, height:30}}  />
                
            },

         
} 
WardrobeScreen.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>{
               
                let iconName, iconFocus, iconId, iconLabel, flag = true;
               
              
                   iconName = require('../assets/icons/closet.png'),
                 iconFocus = require('../assets/icons/focus/closet.png')
                    if((tintColor=='#a9ecf3')){
                        currentColor = 'green';
                    }


                 return  <Image source={(tintColor=='#a9ecf3') ? iconFocus
                    : iconName } style={{width:30, height:30}}   onPress={() => this.props.navigation.setParams({color: 'green'})} />
                
            },

         
}       
ProfileScreen.navigationOptions = {  
  
    tabBarIcon:({tintColor, focused})=>{
               
                let iconName, iconFocus, iconId, iconLabel, flag = true;
               
              
                   iconName = require('../assets/icons/profile.png'),
                 iconFocus = require('../assets/icons/focus/profile.png')
                  

                 return  <Image source={(tintColor=='#a9ecf3') ? iconFocus
                    : iconName } style={ {width:30, height:30}}  />
                
            }
       
}   

const AppNavigator = createMaterialTopTabNavigator(  
    {  
        Home:  HomeScreen, 
            
        Search: SearchScreen,
        NewCloth: NewClothScreen,
        Wardrobe: WardrobeScreen,
        Profile: ProfileScreen,  
       
    },  
    {  initialRouteName:"Home",
        tabBarPosition: "bottom",
        tabBarOptions: {  
            activeTintColor: '#a9ecf3',
            style: {
                backgroundColor: '#EBFFEB',
                borderTopWidth: 0.5,
                borderTopColor:'#ddd'

            },
            showIcon:true,
            showLabel: false,
            indicatorStyle:{
                height: null,
                top: 0,
               // backgroundColor: '#f0fff0',
                backgroundColor:'#EBFFEB',
                borderTopWidth:1,
                borderTopColor:'black'
            },
             
        },

    }  
)  
const App = createAppContainer(AppNavigator); 


export default App;