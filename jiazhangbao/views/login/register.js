
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
    NativeModules
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import TabBarMain from '../../views/main/tabBarMain';
import Yonghu from './yonghu';
import Yzm from './yzm';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
const cancel = require('../../resources/login/login_cancel@2x.png'); 
const nicheng = require('../../resources/login/login_user@2x.png'); 
const phone = require('../../resources/login/login_phone@2x.png');
const pwd = require('../../resources/login/login_psw@2x.png'); 
var NativeTools = NativeModules.NativeTools;

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            loadingWaitText:"注册中..",
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
            navigator.popToTop() 
        }
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

    _register(){
        this.inputname&&this.inputname.blur();
        this.inputphone&&this.inputphone.blur();
        this.inputpwd&&this.inputpwd.blur();
        if (this.state.phonenum) {
            var pPhone=this.state.phonenum;
            pPhone=pPhone.replace(" ","");
            var phone=pPhone
        }
        if (!this.state.username) {
            Toast.show("请输入昵称", 2000);
        }else if (!this.state.phonenum) {
            Toast.show("请输入手机号", 2000);
        }else if (this.state.phonenum.length!==11) {
            Toast.show("请输入11位手机号", 2000);
        }else if (pPhone.indexOf("+86")>=0) {
            phone =pPhone.split("+86")[1];
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))){
                Toast.show("非法的手机号", 2000);
        }else if (!this.state.pwd) {
            Toast.show("请输入密码", 2000);
        }else{
            this.setState({
                loading:true
            })
            NativeTools.registerUSer(this.state.username, phone, this.state.pwd,(error, events) => {
                if (events[0] == '手机号已被注册') {
                    this.setState({loading:false})
                    Toast.show("手机号已被注册", 2000)
                } else {
                    this.setState({loading:false})
                    {/*跳转到验证码界面*/}
                    const { navigator } = this.props;
                    if(navigator) {
                        navigator.push({
                            name:'yanzhengma',
                            component:Yzm,
                            params:{
                                phonenum:phone,
                                pwd:this.state.pwd
                            }
                        })
                    }
                }
            });
        }
    }

    _yonghu(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'yonghu',
                component: Yonghu,
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView scrollEnabled={false} style={{height:200}}>
                    <View style={styles.calcel}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._cancel()}}>
                        <Image source={cancel} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.jiazhangbao}>家长宝</Text>
                    <View style={{width:screenWidth, height:154, marginBottom:35, backgroundColor:'blue', justifyContent:'center', alignItems:'center'}}>
                        <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.phone}>
                            <Image source={nicheng} style={{width:25, height:25, marginLeft:20}}/>
                            <TextInput 
                                ref={(o)=>this.inputname=o}
                                style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({username:text})}
                                placeholder='昵称'/>
                        </View>
                        <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.phone}>
                            <Image source={phone} style={{width:25, height:25, marginLeft:20}}/>
                            <TextInput 
                                ref={(o)=>this.inputphone=o}
                                style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                                keyboardType='number-pad'
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({phonenum:text})}
                                placeholder='手机号'/>
                        </View>
                        <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.phone}>
                            <Image source={pwd} style={{width:25, height:25, marginLeft:20}}/>
                            <TextInput 
                                ref={(o)=>this.inputpwd=o}
                                onChangeText={(text) => this.setState({pwd:text})}
                                style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                                clearButtonMode='while-editing'
                                secureTextEntry={true}
                                placeholder='密码'/>
                        </View>
                        <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    </View>
                </ScrollView>
                <TouchableOpacity activeOpacity={0.8} style={styles.login} onPress={()=>{this._register()}}> 
                    <Text style={{color:'#FFF', fontSize:20}}>注册账号</Text>
                </TouchableOpacity>
                <View style={{flex:1,  width:screenWidth, marginTop:10, alignItems:'center'}}>

                    <Text style={styles.protocolText}>点击“注册账号”表示您同意并愿意遵守家长宝
                        <Text style={{color:'#5A8FDE'}} onPress={()=>{this._yonghu()}}> 用户协议</Text>
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <Text style={{color:'#F88700', fontSize:18, marginTop:3}}>返回登录页</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._cancel()}}>
                        <Text style={{color:'#8A8A8A', fontSize:18, marginTop:3}}>先去逛逛</Text>
                    </TouchableOpacity>
                </View>
                <LoadingShow loading={this.state.loading} text={this.state.loadingWaitText}/>
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
        flex:1
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