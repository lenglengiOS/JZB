
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../../constStr';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
const back = require('../../resources/login/nav_back@2x.png'); 

var NativeTools = NativeModules.NativeTools;

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            loadingWaitText:"注册中..",
            countDown:5,
            counting:true
        }
    }

    componentDidMount(){
        this.interval = setInterval(
        ()=>{this.setState({countDown:this.state.countDown>0?this.state.countDown-1:0,
                            counting:this.state.countDown===0?false:true
                            })},1000
        );
    }

    _resend(){
        this.setState({
            counting:true,
            countDown:60
        })
    }
  
    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    _submit(){
        alert('66')
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={back} style={{width:30, height:30}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, color:'#00B09D'}}>手机验证</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{color:'#A1A1A1', fontSize:15}}>验证码已发送到手机<Text style={{color:'#F88100'}}>15680222613</Text>，请注意查收</Text>
                </View>
                <View style={styles.yzm}>
                    <TextInput
                    placeholder='请输入验证码'
                    style={styles.inputView}
                    clearButtonMode='while-editing'
                    onChangeText={(text) => this.setState({yanzhengma:text})}
                    keyboardType='numeric'/>
                    <TouchableOpacity onPress={()=>{this._resend()}}>
                        <View style={[styles.countDown, {backgroundColor:this.state.counting?'#C8C8C8':'#48B9A9'}]}>
                            <Text style={{color:'#FFF', fontSize:14}}>{this.state.counting?this.state.countDown+'秒':'重发'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submit} onPress={()=>{this._submit()}}> 
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