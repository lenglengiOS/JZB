
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
    StatusBar,
    Linking
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import Publish from './publish';
import BaiduMap from './BaiduMap';
import GuanLi from './jigouguanli';


const nav = require('../../resources/home/home_nav.png');
const back = require('../../resources/login/nav_back@2x.png');
const common_more = require('../../resources/home/common_more@2x.png');
const chose = require('../../resources/user/common_getin@2x.png');
const location = require('../../resources/home/agency_location@2x.png');
const phone = require('../../resources/home/agency_phone@2x.png');
const showMore = require('../../resources/home/common_getin@2x.png');
const showMoreNor = require('../../resources/home/common_getinNor@2x.png');


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
        if(navigator) {
            navigator.pop() 
        }
    }

    submit(){
        if(this.state.submitText)
        {   
            alert(this.state.submitText)
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
                    <Text numberOfLines={1} style={styles.title}>建议反馈</Text>
                    <TouchableOpacity style={[styles.submit,{backgroundColor:this.state.submitText?'#00B6A5':'#99DDD5'}]} activeOpacity={1} onPress={()=>{this.submit()}}>
                        <Text style={{color:'#FFF', fontSize:16}}>提交</Text>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    autoFocus={true}
                    style={styles.input}
                    onChangeText={(text)=>this.setState({submitText:text})}
                    multiline={true}
                    placeholder="说点什么吧"/>
               
            </View>
          )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
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
        borderBottomColor:'#E8E8E8',
        flexDirection:'row',
    },
    title:{
        fontSize:20, 
        marginLeft:20, 
        marginRight:20, 
        flex:1, 
        color:'#00B09D', 
        textAlign:'center'
    },
    input:{
        width:screenWidth,
        paddingLeft:10,
        backgroundColor:'red',
        height:160, 
        backgroundColor:'#FFF',
        fontSize:14
    },
    submit:{
        marginRight:10, 
        width:56, 
        height:28, 
        borderRadius:5, 
        alignItems:'center', 
        justifyContent:'center'
    }
});















