
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
    NativeModules,
    AsyncStorage
} from 'react-native';

import Storage from 'react-native-storage';
import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import LoadingShow  from '../component/react-native-loading';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '../tools/Toast';
import Tools from '../tools';

var NativeTools = NativeModules.NativeTools;

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            loadingWaitText:"注册中..",
            countDown:60,
            counting:true,
            sendSuccess:false,
        }
    }

    componentDidMount(){
        NativeTools.getVerificationCode(this.props.param.phonenum,(error, events) => {
            if (events[0] == '获取验证码成功') {
                this.setState({sendSuccess:true})
            } else {
                this.setState({loading:false})
                Toast.show("验证码发送失败！", 2000)
            }
        });

        this.interval = setInterval(
        ()=>{this.setState({countDown:this.state.countDown>0?this.state.countDown-1:0,
                            counting:this.state.countDown===0?false:true
                            })},1000
        );
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        NativeTools = null;
    }



    _resend(){
        if (!this.state.counting) {
            this.setState({
                counting:true,
                countDown:60,
                sendSuccess:false
            })
        }
        NativeTools.getVerificationCode(this.props.param.phonenum,(error, events) => {
            if (events[0] == '获取验证码成功') {
                this.setState({sendSuccess:true})
            } else {
                this.setState({loading:false})
                Toast.show("操作失败", 2000)
            }
        });
    }
  
    _backToHome(){
        let value = 'value';
        RCTDeviceEventEmitter.emit('undateUserInfo',value); 
        const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop() 
        }
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }
    
    // 提交验证码
    _submit(){
        this.setState({loading:true})
        if (this.state.sendSuccess) {
            NativeTools.commitVerificationCode(this.state.yanzhengma, this.props.param.phonenum, (error, events) => {
                if (events[0] != '验证成功') {
                    this.setState({loading:false})
                    Toast.show("验证失败", 2000)
                    return;
                } 
                {/*验证成功后注册*/}
                var PostData ={
                    data:{
                        userphone:this.props.param.phonenum,
                        userpwd:this.props.param.pwd,
                        username:this.props.param.username,
                        isLogin:true
                    }
                }
                Tools.postNotBase64(IPAddr+"/reigster/register.php", PostData,(ret)=>{
                    console.log("====dadadada=="+JSON.stringify(ret))
                        if(ret.message == "注册成功")
                        {
                            // 注册成功后，状态为登陆状态，存储登陆信息，并pop到首页
                            this.setState({loading:false})
                            Toast.show("注册成功！", 2000)
                            Tools.setStorage("maincfg", JSON.stringify(PostData));
                            {this._backToHome()}
                        }
                        else if(ret.message == "该手机号已注册")
                        {
                            this.setState({loading:false})
                            Toast.show("该手机号已注册!", 2000)
                        }else{
                            this.setState({loading:false})
                            Toast.show("注册失败!", 2000)
                        }
                    }, (err)=>{
                        this.setState({loading:false})
                        Toast.show(err);
                        console.log("====444444==="+err)
                });
            });
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={JZBImages.back} style={{width:30, height:30}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, color:'#00B09D'}}>手机验证</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{color:'#A1A1A1', fontSize:15}}>验证码已发送到手机<Text style={{color:'#F88100'}}>{this.props.param.phonenum}</Text>，请注意查收</Text>
                </View>
                <View style={styles.yzm}>
                    <TextInput
                        placeholder='请输入验证码'
                        style={styles.inputView}
                        clearButtonMode='while-editing'
                        onChangeText={(text) => this.setState({yanzhengma:text})}
                        keyboardType='numeric'/>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._resend()}}>
                        <View style={[styles.countDown, {backgroundColor:this.state.counting?'#C8C8C8':'#48B9A9'}]}>
                            <Text style={{color:'#FFF', fontSize:14}}>{this.state.counting?this.state.countDown+'秒':'重发'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.submit} onPress={()=>{this._submit()}}> 
                    <Text style={{color:'#FFF', fontSize:20}}>完成</Text>
                </TouchableOpacity>
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
    textView:{
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        padding:10,
        width:screenWidth,
    },
    yzm:{
        flexDirection:'row',
        paddingLeft:10,
        paddingTop:7,
        paddingBottom:7,
        borderBottomWidth:1,
        paddingRight:10,
        borderBottomColor:'#E8E8E8'
    },
    inputView:{
        flex:1,
    },
    countDown:{
        width:55,
        height:30,
        borderRadius:5,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:6,
        paddingBottom:6,
        justifyContent:'center', 
        alignItems:'center'
    },
    submit:{
        height:50, 
        width:screenWidth-40, 
        backgroundColor:'#48B9A9', 
        borderRadius:5, 
        justifyContent:'center', 
        alignItems:'center',
        marginTop:40
    },
});