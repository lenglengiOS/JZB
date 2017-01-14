
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../../constStr';
import JiaZhang from './jiazhang';
import Login from '../login/login_index';

import YongHu from '../login/yonghu';

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
           
		}
	}
    componentDidMount(){
       
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'denglu',
                component: YongHu,
            })
        }
    }

	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity onPress={()=>{this._pressButton()}}>
                	<Text>登录</Text>
                </TouchableOpacity>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
		justifyContent:"center",
        backgroundColor:'red',
        alignItems:'center'
    },
    
});
