
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
const back = require('../../resources/login/nav_back@2x.png');
const showMoreNor = require('../../resources/home/main_showMoreNor@2x.png');
const search = require('../../resources/home/lxr_icon_search@2x.png');
const search_history = require('../../resources/home/search_history@2x.png');
const search_clearHistory = require('../../resources/home/search_clearHistory@2x.png');
const options = require('../../resources/home/options_pointer@2x.png');  
const nav = require('../../resources/home/home_nav.png');
const location = require('../../resources/home/location@2x.png');

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

	render(){
		return(
			<View style={styles.container}>
				<StatusBar
                     backgroundColor="blue"
                     barStyle="default"
                     animated={true}/>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
    				<View style={styles.nav}>
                            <Image source={back} style={{width:30, height:30, marginLeft:10}} />
                        <View style={styles.TextInput}>
                        	<Image source={search} style={{width:15, height:15, marginLeft:5}} />
                        	<Text style={{flex:1, marginLeft:5}}>{"\""+this.props.searchText+"\""+"的搜索结果"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
            <View style={{flexDirection:'row', backgroundColor:'#FFF', paddingTop:15, paddingBottom:15, paddingLeft:10, borderBottomWidth:1, borderBottomColor:'#E8E8E8'}}>
                <Image source={nav} style={{width:85, height:70}}/>
                <View style={styles.recommendCell}>
                    <View>
                        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={{fontSize:18}}>金苹果天府国际幼儿园</Text>
                        </View>
                        <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>四川省成都市武侯区</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={location} style={{width:8, height:12}}/>
                        <Text style={{fontSize:13, color:'#9B9B9B'}}> 1.26km</Text>
                    </View>
                </View>
            </View>
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
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        flexDirection:'row'
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
        marginLeft:10, 
        marginRight:10, 
        justifyContent:'space-between'
    }
});
