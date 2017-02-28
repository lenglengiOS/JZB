
'use strict';
import React from 'react';
import {
 	View,
 	StyleSheet,
 	Text,
 	TouchableOpacity,
 	TextInput,
 	ListView,
 	Platform,
    Alert,
    ScrollView
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           
		}
	}
    componentDidMount(){
       
    }

	render(){
		return(
			<View style={styles.container}>
                <Text>我的</Text>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
		justifyContent:"center",
        backgroundColor:'red',
        alignItems:'center',
    },
    
});
