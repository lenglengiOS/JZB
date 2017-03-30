
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console} from '../constStr';

export default class Yonghu extends React.Component{
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
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={JZBImages.back} style={{width:30, height:30}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, color:'#00B09D'}}>欢迎入驻</Text>
                </View>
                <View style={{width:screenWidth, flex:1, padding:10}}>
                    <Text style={{fontSize:16, marginTop:10, lineHeight:24}}>机构用户您好，欢迎登陆家长宝官网：http://www.appjzb.com登记入驻！</Text>
                    <Text style={{fontSize:16, marginTop:23, lineHeight:24}}>入驻的机构用户可以免费使用家长宝平台提供的各类机构服务项目，包括免费发布机构信息、招生宣传以及在线报班课程等！让您招生更方便！</Text>
                    <Text style={{fontSize:17, marginTop:23, lineHeight:24, color:'#FE9B00'}}>入驻流程：登陆官网 >> 商户入口 >> 注册账号即可!</Text>
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
        borderBottomColor:'#E8E8E8'
    }
});















