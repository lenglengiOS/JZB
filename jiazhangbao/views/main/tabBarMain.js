/*
*   tabBar
*/
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
    ScrollView,
    Image,
    Navigator
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../../constStr';
import TabNavigator from 'react-native-tab-navigator';
import Home from './shouye';
import JiaZhang from './jiazhang';
import BaoBan from './baoban';
import WoDe from './wode';

var HomeIcon = require('../../resources/Main/tab_home@2x.png');
var HomeIcon_sel = require('../../resources/Main/tab_home-on@2x.png');
var JZIcon = require('../../resources/Main/tab_user-group@2x.png');
var JZIcon_sel = require('../../resources/Main/tab_user-group-on@2x.png');
var BBIcong = require('../../resources/Main/tab_graduation@2x.png');
var BBIcon_sel = require('../../resources/Main/tab_graduation-on@2x.png');
var WDIcon = require('../../resources/Main/tab_user@2x.png');
var WDIcon_sel = require('../../resources/Main/tab_user-on@2x.png');

export default class TabBarMain extends React.Component{
	constructor(props){
		super(props);
		this.state={
           selectedTab: 'home'
		}
	}
    componentDidMount(){
       
    }

	render(){
		return(
			<View style={styles.container}>
                <TabNavigator>
                  <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="首页"
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={() => <Image source={HomeIcon} />}
                    renderSelectedIcon={() => <Image source={HomeIcon_sel} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <Navigator
                      initialRoute={{ name: '首页', component: Home }}
                      configureScene={(route) => {
                        return Navigator.SceneConfigs.VerticalDownSwipeJump;
                      }}
                      renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                      }} />
                      
                  </TabNavigator.Item>
                  <TabNavigator.Item
                    selected={this.state.selectedTab === 'jiazhang'}
                    title="家长"
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={() => <Image source={JZIcon} />}
                    renderSelectedIcon={() => <Image source={JZIcon_sel} />}
                    onPress={() => this.setState({ selectedTab: 'jiazhang' })}>
                    <JiaZhang />
                  </TabNavigator.Item>
                </TabNavigator>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
		justifyContent:"center",
        width:screenWidth, 
        height:screenHeight
    },
    selectedTabText:{
        color:'#48B9A9'
    }
    
});
