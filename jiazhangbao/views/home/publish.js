
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';

export default class WoDe extends React.Component{
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

    publish(){
        alert('发布')
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <View style={styles.cancle}>
                            <Text style={{color:'#7A7A7A', fontSize:16}}>取消</Text>
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:20, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>发帖</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.publish()}}>
                        <View style={styles.publish}>
                            <Text style={{color:'#FFF', fontSize:16}}>确定</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    style={styles.titleLabel}
                    placeholder='请输入标题'/>
                <View style={{width:screenWidth, height:1, backgroundColor:'#E8E8E8'}}/>
            </View>
          )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
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
    cancle:{
        width:50, 
        height:28, 
        backgroundColor:'#F3F3F3', 
        justifyContent:'center', 
        alignItems:'center', 
        marginLeft:10, 
        borderRadius:3
    },
    publish:{
        width:50, 
        height:28, 
        backgroundColor:'#4FC3B8', 
        justifyContent:'center', 
        alignItems:'center',  
        borderRadius:3,
        marginRight:10
    },
    titleLabel:{
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        height:47, 
        width:screenWidth, 
        marginLeft:10, 
        marginRight:10
    }
});











