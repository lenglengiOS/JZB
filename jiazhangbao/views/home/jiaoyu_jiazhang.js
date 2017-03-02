
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
    StatusBar
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import MyListView from '../component/MyListView';
import NewsDetail from '../recomNews/newsDetail';

const back = require('../../resources/login/nav_back@2x.png');
const showMoreNor = require('../../resources/home/main_showMoreNor@2x.png');
const search = require('../../resources/home/lxr_icon_search@2x.png');
const search_history = require('../../resources/home/search_history@2x.png');
const search_clearHistory = require('../../resources/home/search_clearHistory@2x.png');
const options = require('../../resources/home/options_pointer@2x.png');  
const nav = require('../../resources/home/home_nav.png');
const location = require('../../resources/home/location@2x.png');
const edite = require('../../resources/home/main_articles_edit@2x.png');

const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           dataSource:defaultData.cloneWithRows(['','','']),
           dataSize:5,
           count:3
		}
	}
    componentDidMount(){
       
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    goToNewsDetail(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'newsDetail',
                component: NewsDetail,
                params: {
                    title:"金苹果天府国际幼儿园",
                    url:'http://www.baidu.com'
                }
            })
        }
    }

	render(){
		return(
			<View style={styles.container}>
				<StatusBar
                     backgroundColor="blue"
                     barStyle="default"
                     animated={true}/>
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={back} style={{width:30, height:30}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, color:'#00B09D'}}>{this.props.TITLE}</Text>
                </View>
                <MyListView
                    onRefresh={this._onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
			</View>
		  )
	}

    renderRow(){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToNewsDetail()}}>
                <View style={{flexDirection:'row', backgroundColor:'#FFF', paddingTop:15, paddingBottom:15, paddingLeft:10, paddingRight:10, borderBottomWidth:1, borderBottomColor:'#E8E8E8'}}>
                    <View style={styles.recommendCell}>
                        <View>
                            <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                <Text style={{fontSize:18}}>金苹果天府国际幼儿园</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={edite} style={{width:13, height:13}}/>
                            <Text style={{fontSize:13, color:'#9B9B9B'}}> 家长宝</Text>
                            <View style={{backgroundColor:'#9B9B9B', height:10, width:1, marginLeft:5}}/>
                            <Text style={{fontSize:13, color:'#9B9B9B'}}> 今日知识</Text>
                        </View>
                    </View>
                    <Image source={nav} style={{width:85, height:70}}/>
                </View>
            </TouchableOpacity>
        )
    }

    _onRefresh() {  
        this.page=1;
        var firstData=[];
        if(this.state.isLocationSearch){
            this.loadManualFwqData()
            return;
        }
    }

}

var styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#F5F5F5'
    },
    nav:{
        width:screenWidth, 
        height:64, 
        backgroundColor:'#FFF', 
        paddingTop:20, 
        justifyContent:'center', 
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8'
    },
    TextInput:{
    	flex:1,
    	borderRadius:5,
    	backgroundColor:'#EAEBED',
    	marginLeft:20,
    	marginRight:20,
    	height:30,
    	alignItems:'center',
    	flexDirection:'row',
    	justifyContent:'center'
    },
    recommendCell:{
        flex:1, 
        marginRight:10, 
        justifyContent:'space-between'
    }
});
