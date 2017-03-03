
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
    AlertIOS,
    ActionSheetIOS
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import ImagePicker from 'react-native-image-crop-picker';
const addImage = require('../../resources/home/sendPost_add@2x.png');
import Toast from '../tools/Toast';

export default class WoDe extends React.Component{
    constructor(props){
        super(props);
        this.state={
           images:[]
        }
    }
    componentDidMount(){
       
    }

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    cancel(){
        AlertIOS.alert(
            '确定退出？',
            '退出后编辑的内容将不会保存',
            [
                {text: '取消', onPress: () => console.log('取消')},
                {text: '确定', onPress: () => this.goBack()},
            ]
        )
    }

    publish(){
        if (!this.state.title) {
            Toast.show('请输入标题');
            return;
        }
        if (!this.state.topic) {
            Toast.show('请输入正文');
            return;
        }
        alert('发布')
    }

    pickImage(){
        ActionSheetIOS.showActionSheetWithOptions({
            title:"选取照片",
            options: ["拍照","相册","取消"],
            cancelButtonIndex: 2,
            destructiveButtonIndex:0
        },
        (buttonIndex) => {
            if (buttonIndex == 0) {
                ImagePicker.openCamera({

                }).then(image => {
                    console.log(image);
                    this.setState({
                        images:this.state.images.length<1?[image]:this.state.images.concat([image])
                    })
                });
            }
            if (buttonIndex == 1) {
                ImagePicker.openPicker({
                    multiple: true,
                    maxFiles:8
                }).then(images => {
                    console.log(images);
                    this.setState({
                        images:this.state.images.length<1?images:this.state.images.concat(images)
                    })
                });
            }
        });
    }

    renderSelImg(){
        if (this.state.images.length>0) {
            return this.state.images.map((item, index) => {
                return(
                    <View>
                        <Image source={{uri:item.path}} style={{width:80, height:80, marginRight:5}} />
                    </View>
                )
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.cancel()}>
                        <View style={styles.cancle}>
                            <Text style={{color:'#7A7A7A', fontSize:16}}>取消</Text>
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:20, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>发帖</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.publish()}>
                        <View style={styles.publish}>
                            <Text style={{color:'#FFF', fontSize:16}}>确定</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    style={styles.titleLabel}
                    onChangeText={(text) => this.setState({title:text})}
                    placeholder='请输入标题'/>
                <View style={{width:screenWidth, height:1, backgroundColor:'#E8E8E8'}}/>
                <TextInput 
                    style={styles.topic}
                    multiline={true}
                    onChangeText={(text) => this.setState({topic:text})}
                    placeholder='说点什么吧'/>
                <View style={{width:screenWidth, height:1, backgroundColor:'#E8E8E8'}}/>
                <View>
                    <ScrollView 
                        horizontal={true}
                        style={{width:screenWidth-20, marginTop:5, marginLeft:10}}>
                        {this.renderSelImg()}
                    </ScrollView>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pickImage()}>
                    <Image source={addImage} style={{width:42, height:42, marginLeft:10, marginTop:5}} /> 
                </TouchableOpacity>
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
        height:47, 
        width:screenWidth-20,
        marginLeft:10, 
    },
    topic:{
        height:100, 
        width:screenWidth-20,
        marginLeft:10,
        fontSize:16,
        fontWeight:'100'
    }
});











