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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import Login from '../login/login_index';
import TabNavigator from 'react-native-tab-navigator';
import Home from './shouye';
import JiaZhang from './jiazhang';
import BaoBan from './baoban';
import WoDe from './wode';

const HOMETITLE = '首页';
const HOMETAG = 'home';
const HomeIcon = require('../../resources/Main/tab_home@2x.png');
const HomeIcon_sel = require('../../resources/Main/tab_home-on@2x.png');

const JZTITLE = '家长';
const JZTAG = 'jiazhang';
const JZIcon = require('../../resources/Main/tab_user-group@2x.png');
const JZIcon_sel = require('../../resources/Main/tab_user-group-on@2x.png');

const BBTITLE = '报班';
const BBTAG = 'baoban';
const BBIcong = require('../../resources/Main/tab_graduation@2x.png');
const BBIcon_sel = require('../../resources/Main/tab_graduation-on@2x.png');

const WDTITLE = '我的';
const WDTAG = 'wode';
const WDIcon = require('../../resources/Main/tab_user@2x.png');
const WDIcon_sel = require('../../resources/Main/tab_user-on@2x.png');

export default class TabBarMain extends React.Component{

	constructor(props){
		super(props);
		this.state={
      isLogin:false,
      selectedTab: 'home'
		}
	}

  componentDidMount(){
     
  }

	render(){
    return(
      <View style={styles.container}>
        <TabNavigator>
          {this._renderTabItem(HOMETAG, HOMETITLE, HomeIcon, HomeIcon_sel, <Home navigator={this.props.navigator}/>)}
          {this._renderTabItem(JZTAG, JZTITLE, JZIcon, JZIcon_sel, <JiaZhang navigator={this.props.navigator}/>)}
          {this._renderTabItem(BBTAG, BBTITLE, BBIcong, BBIcon_sel, <BaoBan navigator={this.props.navigator}/>)}
          {this._renderTabItem(WDTAG, WDTITLE, WDIcon, WDIcon_sel, <WoDe navigator={this.props.navigator}/>)}
        </TabNavigator>
      </View>
    )
	}

  _renderTabItem(tag, title, Icon, Icon_sel, childView){
    return(
       <TabNavigator.Item
        selected={this.state.selectedTab === tag}
        title={title}
        selectedTitleStyle={styles.selectedTabText}
        renderIcon={() => <Image source={Icon} />}
        renderSelectedIcon={() => <Image source={Icon_sel} />}
        onPress={() => this.setState({ selectedTab: tag })}>
        {childView}
      </TabNavigator.Item>
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
