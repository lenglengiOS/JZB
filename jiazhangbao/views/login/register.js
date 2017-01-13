
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
    Image
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../../constStr';
const cancel = require('../../resources/login/login_cancel@2x.png'); 
const nicheng = require('../../resources/login/login_user@2x.png'); 
const phone = require('../../resources/login/login_phone@2x.png');
const pwd = require('../../resources/login/login_psw@2x.png'); 

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
           
        }
    }
    componentDidMount(){
       
    }

    _cancel(){
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.pop();
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.calcel}>
                    <TouchableOpacity onPress={()=>{this._cancel()}}>
                    <Image source={cancel} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.jiazhangbao}>家长宝</Text>
                <View style={{width:screenWidth, height:154, marginTop:40, backgroundColor:'blue'}}>
                    <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    <View style={styles.phone}>
                        <Image source={nicheng} style={{width:25, height:25, marginLeft:20}}/>
                        <TextInput 
                            style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                            placeholder='昵称'/>
                    </View>
                    <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    <View style={styles.phone}>
                        <Image source={phone} style={{width:25, height:25, marginLeft:20}}/>
                        <TextInput 
                            style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                            placeholder='手机号'/>
                    </View>
                    <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    <View style={styles.phone}>
                        <Image source={pwd} style={{width:25, height:25, marginLeft:20}}/>
                        <TextInput 
                            style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                            placeholder='密码'/>
                    </View>
                    <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                </View>
                <TouchableOpacity onPress={()=>{alert('登录')}}> 
                    <View style={styles.login}>
                        <Text style={{color:'#FFF', fontSize:20}}>注册账号</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flex:1,  width:screenWidth, marginTop:10, alignItems:'center'}}>

                    <Text style={styles.protocolText}>点击“注册账号”表示您同意并愿意遵守家长宝
                        <Text style={{color:'#5A8FDE'}} > 用户协议</Text>
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this._cancel()}}>
                        <Text style={{color:'#F88700', fontSize:18, marginTop:3}}>返回登录页</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity onPress={()=>{alert('先去逛逛')}}>
                        <Text style={{color:'#8A8A8A', fontSize:18, marginTop:3}}>先去逛逛</Text>
                    </TouchableOpacity>
                </View>
            </View>
          )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
        alignItems:'center',
        paddingBottom:30
    },
    calcel:{
        width:screenWidth, 
        height:60, 
        paddingTop:20, 
        paddingRight:20, 
        justifyContent:'center', 
        alignItems:'flex-end'
    },
    jiazhangbao:{
        width:screenWidth, 
        height:80, 
        textAlign:'center', 
        fontSize:45, 
        color:'#48B9A9', 
        paddingTop:20,
        marginTop:10
    },
    phone:{
        width:screenWidth, 
        height:50, 
        backgroundColor:'#FFF', 
        flexDirection:'row', 
        alignItems:'center',
        paddingRight:10
    },
    login:{
        height:50, 
        width:screenWidth-40, 
        marginTop:35,
        backgroundColor:'#48B9A9', 
        borderRadius:5, 
        justifyContent:'center', 
        alignItems:'center',
    },
    line:{
        height:25, 
        width:1, 
        backgroundColor:'#DBDBDB',
        marginLeft:10, 
        marginRight:10
    },
    protocolText:{
        width:screenWidth-120, 
        textAlign:'center',
        lineHeight:18, 
        marginTop:30, 
        color:'#888888'
    }
});