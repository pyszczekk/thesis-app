import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:1
    },
    container: {
    	flex: 1, 
    	justifyContent: 'center', 
    	alignItems: 'center', 
    	backgroundColor:'#EBFFEB',
    	width:'100%',
    },
    containerNoBackground:{
    	flex: 1, 
    	justifyContent: 'center', 
    	alignItems: 'center', 
    	width:'100%',
    },
    logo:{
    	height:25, 
    	width:150,
    	margin:5,
    	marginBottom:10,
    	marginTop:55,
    },
    header:{  
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',   
        paddingHorizontal: 18,  
        paddingTop: 5,
        shadowColor: "#000",
 }  ,
	loginLogo:{
			width:'100%',
			alignItems:'center',
	    	justifyContent: 'center', 
	 },
	 title:{
	 		fontSize:24,
	 		marginTop:10,
	 },
	input:{
	 	width:200,
	 	borderBottomWidth:1,
	 	borderBottomColor:'gray',
	 	margin: 10,

	 },
	 inputError:{
	 	width:200,
	 	borderBottomWidth:1,
	 	borderBottomColor:'red',
	 	margin: 10,

	 },
	bgButton:{
	 	margin:20,
	 	width:150,
	 	textAlign:'center',
	 },
	smButton:{
	 	width:'100%',
	 	alignItems:'center',
	 	textAlign:'center',
	 	color:'#0D2B30',
	 	textTransform: 'uppercase'
	 },
	gradient: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems:'center',
	    borderRadius: 10,

	  },
	circleGradient: {
	  margin: 1,
	  backgroundColor: "#EBFFEB",
	  borderRadius: 10,
	  padding:30,
	  paddingTop:5,
	  paddingBottom:5,
	  justifyContent:'center',
	  alignItems:'center',

	},
	scrollContainer:{
		marginTop:20,
		width:'100%',
		marginBottom:65,

	},
	scrollBackground:{

    	flex: 1, 
    	justifyContent: 'center', 
    	alignItems: 'center', 
   

	},
	tile:{
		width:'80%',
		height:120,
		marginBottom:20,
		justifyContent:'center',
		alignItems:'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,

	},
	tileText:{
		textTransform: 'uppercase',
		fontWeight:'700',
		fontSize:18,
		textAlign:'center',
		color:'white',
		textShadowColor: 'rgba(0, 0, 0, 1)',
	    textShadowOffset: { width: 0, height: 0 },
	    textShadowRadius: 3,
	},
	tileImage:{
		width:'100%',
		height:'100%',
		resizeMode: 'cover',
		justifyContent:'flex-start',
		alignItems:'center',
		alignSelf: "flex-end"

	},
	tileGradient:{
		width:'100%',
		height:'100%',
		justifyContent:'center',
		alignItems:'center',
	},
	overlay:{
		flex:1,
		position:'absolute',
		width:'100%',
		height:'100%',
		backgroundColor:'#0000009f',
		justifyContent:'center',
		alignItems:'center',

	},
	modal:{
		backgroundColor:'#EBFFEB',
		width:'90%',
		height:'auto',
		justifyContent:'center',
		alignItems:'center',
		padding:15,
		paddingTop:20,
		paddingBottom:20,
		borderRadius:10,
		borderWidth:1,
		borderColor:'black'

	},
	errorView:{
		
		padding:10,
		width:'80%',
		borderWidth:0,
		borderColor:"#660000",
		backgroundColor:"#FF6B6B",
		justifyContent:'center',
		alignItems:'center',
		borderRadius:5
	},
	errorText:{
		color:'#660000',
		fontWeight:'bold',
		textAlign:'center'
	},
	positiveInfo:{
		backgroundColor:'#99FF99',
		borderColor:'#5CFF5C',
		color:'black',
		width:'80%',
		justifyContent:'center',
		alignItems:'center',
		textAlign:'center',
		padding:15,
		margin:20,
		fontSize:14,
		borderRadius:5,
	},
	negativeInfo:{
		backgroundColor:'#FF8585',
		borderColor:'#FF3333',
		color:'black',
		width:'80%',
		justifyContent:'center',
		alignItems:'center',
		textAlign:'center',
		padding:15,
		margin:20,
		fontSize:14,
		borderRadius:5,
	},
	dressCodeInfo:{
		textAlign:'center',
		marginBottom:10,
		backgroundColor:'rgba(0,0,0,0.1)',
		padding:10,
		borderRadius:3,
	}

});

export { styles }   