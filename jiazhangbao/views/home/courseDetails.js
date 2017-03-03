
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
    WebView,
    StatusBar
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
const nav = require('../../resources/home/home_nav.png');
const back = require('../../resources/login/nav_back@2x.png');
const common_more = require('../../resources/home/common_more@2x.png');
const common_mes = require('../../resources/home/common_mes@2x.png');
const common_phone = require('../../resources/home/common_phone@2x.png');

export default class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){

    }

    _back(){
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
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
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <Image source={back} style={{width:30, height:30, marginLeft:10}} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:20, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>{this.props.title}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('分享')}}>
                    	<Image source={common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <ScrollView style={{flex:1, width:screenWidth}}>
                    <Image source={nav} style={{width:screenWidth, height:180}}>
                        <View style={{width:screenWidth, height:30, backgroundColor:'rgba(0,0,0, 0.6)' , position:'absolute', bottom:0, justifyContent:'center'}}>
                            <Text style={{color:'#FFF', fontSize:16, marginLeft:10}}>钢琴培训季度套餐</Text>
                        </View>
                    </Image>
                    
                </ScrollView>
                <View style={styles.bottomBar}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={common_phone} style={{width:25, height:25, marginLeft:18}} />
                        <Image source={common_mes} style={{width:25, height:25, marginLeft:22}} />
                    </View>
                </View>
            </View>
          )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#FFF'
    },
    nav:{
        width:screenWidth, 
        height:64, 
        backgroundColor:'#FFF', 
        paddingTop:20, 
        justifyContent:'center', 
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        flexDirection:'row',
    },
    bottomBar:{
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor:'#FFF', 
        borderTopWidth:1, 
        borderTopColor:'#E8E8E8',
        width:screenWidth, 
        height:47, 
        position:'absolute', 
        bottom:0
    }
});















