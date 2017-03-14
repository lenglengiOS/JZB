
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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../parents/CustomTabBar';
import Jiazhangquan from '../parents/jiazhangquan';
import Taolun from '../parents/taolun';
 
export default class JiaZhang extends React.Component{
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
                <ScrollableTabView renderTabBar={() => <CustomTabBar textStyle={{fontSize:16}}/>}>
			        <Jiazhangquan tabLabel="家长圈" navigator={this.props.navigator}/>
			        <Taolun tabLabel="讨论群" navigator={this.props.navigator}/>
			    </ScrollableTabView>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#F5F5F5',
    },
    nav:{
    	justifyContent:'center',
    	alignItems:'center',
    	backgroundColor:'#48B9A9',
    	height:64,
    	paddingTop:20
    }
});




















