
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
import Tools from '../tools';

//var NativeTools = NativeModules.NativeTools;

export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
            loading:false,
            loadingWaitText:"注册中..",
		}
	}
    
    componentDidMount(){
       
    }

    componentWillUnmount() {

    }

    _cancel(){
        let value = 'value';
        RCTDeviceEventEmitter.emit('undateUserInfo',value); 
    	const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.param} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.pop();
        }
    }

    popToTop(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop();
        }
    }

    _pressRegister(){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"register",
                param:{
                }
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



        //NativeTools.registerUSer((error, events) => {
        //      if (error) {
        //        console.error(error);
        //      } else {
        //        this.setState({events: events});
        //        alert(events[1])
        //      }
        //    });
        var check = Tools.checkPhone(this.state.phone);
        if(check)
        {
            Toast.show(check, 2000);
            return;
        }
        if(!this.state.password)
        {
            Toast.show('请输入密码', 2000);return;
        }
        this.setState({loading:true})
        //登陆
        var PostData ={
                    data:{
                        userphone:this.state.phone,
                        userpwd:this.state.password,
                        isLogin:true
                    }
                }
        Tools.postNotBase64(IPAddr+"/login/login.php", PostData,(ret)=>{
            console.log("====dadadada=="+JSON.stringify(ret))
                if(ret.message == "登陆成功")
                {
                    this.setState({loading:false})
                    Toast.show("登陆成功", 2000)
                    Tools.setStorage("maincfg", JSON.stringify(PostData));
                    this._cancel();
                }
                else if(ret.message == "密码错误")
                {
                    this.setState({loading:false})
                    Toast.show("密码错误!", 2000)
                }else{
                    this.setState({loading:false})
                    Toast.show("该用户不存在！!", 2000)
                }
            }, (err)=>{
                this.setState({loading:false})
                Toast.show(err);
                console.log("====444444==="+err)
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
                    	<TouchableOpacity activeOpacity={0.8} onPress={()=>{this.popToTop()}}>
                    	<Image source={JZBImages.cancel} />
                    	</TouchableOpacity>
                    </View>
                    <Text style={styles.jiazhangbao}>家长宝</Text>
                    <View style={{width:screenWidth, height:103, marginTop:40, marginBottom:40}}>
                    	<View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                    	<View style={styles.phone}>
                    		<Image source={JZBImages.login_phone} style={{width:25, height:25, marginLeft:20}}/>
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
                    		<Image source={JZBImages.pwd} style={{width:25, height:25, marginLeft:20}}/>
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
            			<Image source={JZBImages.wx} style={{width:60, height:60}}/>
            			<Image source={JZBImages.qq} style={{width:60, height:60}}/>
            			<Image source={JZBImages.wb} style={{width:60, height:60}}/>
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
















