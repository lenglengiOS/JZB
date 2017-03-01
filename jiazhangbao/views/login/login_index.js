
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
    StatusBar,
    NativeModules,
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import Register from '../login/register';
import Toast from '../tools/Toast';

const cancel = require('../../resources/login/login_cancel@2x.png');  
const phone = require('../../resources/login/login_phone@2x.png');
const pwd = require('../../resources/login/login_psw@2x.png');
const wx = require('../../resources/login/share_weixin.png');
const qq = require('../../resources/login/share_qq.png');
const wb = require('../../resources/login/share_sina.png');

var NativeTools = NativeModules.NativeTools;

export default class Login extends React.Component{
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

    _pressRegister(){
    	const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'zhuce',
                component: Register,
            })
        }
    }

    login(){
        // this.inputphone&&this.inputphone.blur();
        // this.inputpwd&&this.inputpwd.blur();
        // if (!this.state.phone){
        //     Toast.show("请输入手机号", 2000);
        // }
        // else if (!this.state.password){
        //     Toast.show("请输入密码", 2000);
        // }



        NativeTools.registerUSer((error, events) => {
              if (error) {
                console.error(error);
              } else {
                this.setState({events: events});
                alert(events[1])
              }
            });
    }

	render(){
		return(
            <View style={styles.container}>
                <StatusBar
                         backgroundColor="blue"
                         barStyle="default"
                         animated={true}/>
                <ScrollView scrollEnabled={false} style={{height:200}}>
                    <View style={styles.cancel}>
                    	<TouchableOpacity activeOpacity={0.8} onPress={()=>{this._cancel()}}>
                    	<Image source={cancel} />
                    	</TouchableOpacity>
                    </View>
                    <Text style={styles.jiazhangbao}>家长宝</Text>
                    <View style={{width:screenWidth, height:103, marginTop:40, marginBottom:40}}>
                    	<View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    	<View style={styles.phone}>
                    		<Image source={phone} style={{width:25, height:25, marginLeft:20}}/>
                    		<TextInput 
                                ref={(o)=>this.inputphone=o}
                                onFocus={() => {this.inputphone.focus()}}
                                onBlur={() => {this.inputphone.blur()}}
                    			style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                                autoFocus={true}
                                keyboardType='number-pad'
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({phone:text})}
    							placeholder='手机号'/>
                    	</View>
                    	<View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    	<View style={styles.phone}>
                    		<Image source={pwd} style={{width:25, height:25, marginLeft:20}}/>
                    		<TextInput 
                                ref={(o)=>this.inputpwd=o}
                    			style={{flex:1, height: 40, marginLeft:20, marginTop:5}}
                                clearButtonMode='while-editing'
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password:text})}
    							placeholder='密码'/>
    						<Text style={{color:'#8A8A8A'}}>忘记密码？</Text>
                    	</View>
                    	<View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={styles.login} onPress={()=>{this.login()}}> 
    	                <Text style={{color:'#FFF', fontSize:20}}>登录</Text>
                    </TouchableOpacity>
                </ScrollView>    

            	<View style={{flex:1,  width:screenWidth, marginTop:10}}>
            		<Text style={styles.loginText}>还可以使用以下账号登录</Text>
            		<View style={styles.loginWay}>
            			<Image source={wx} style={{width:60, height:60}}/>
            			<Image source={qq} style={{width:60, height:60}}/>
            			<Image source={wb} style={{width:60, height:60}}/>
            		</View>
            	</View>

            	<View style={{flexDirection:'row'}}>
            		<TouchableOpacity activeOpacity={0.8} onPress={()=>{this._pressRegister()}}>
            			<Text style={{color:'#F88700', fontSize:18, marginTop:3}}>注册家长宝账号</Text>
            		</TouchableOpacity>
            		<View style={styles.line}/>
            		<TouchableOpacity activeOpacity={0.8} onPress={()=>{this._cancel()}}>
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
    cancel:{
		width:screenWidth, 
		height:60, 
		paddingTop:20, 
		paddingRight:20, 
		justifyContent:'center', 
		alignItems:'flex-end'
	},
	jiazhangbao:{
		width:screenWidth, 
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
        marginLeft:20,
		justifyContent:'center', 
		alignItems:'center'
	},
    loginWay:{
    	width:screenWidth-80, 
    	marginLeft:40,
        flex:1, 
    	flexDirection:'row', 
    	justifyContent:'space-around', 
    },
    loginText:{
    	width:screenWidth, 
    	height:50,
    	fontSize:16, 
    	color:'#8A8A8A', 
    	textAlign:'center', 
    },
    line:{
    	height:25, 
    	width:1, 
    	backgroundColor:'#DBDBDB',
    	marginLeft:10, 
    	marginRight:10
    }
});
















