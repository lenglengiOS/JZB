
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
    ActionSheetIOS
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingShow  from '../component/react-native-loading';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '../tools/Toast';
import Tools from '../tools';

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
            loading:false,
            loadingWaitText:"正在上传..."
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

    changeIcon(){
        ActionSheetIOS.showActionSheetWithOptions({
            title:"更换头像",
            options: ["拍照","相册","取消"],
            cancelButtonIndex: 2,
            destructiveButtonIndex:0
        },
        (buttonIndex) => {
            if (buttonIndex == 0) {
                ImagePicker.openCamera({
                    includeBase64:true,
                    cropping:true,
                    cropperCircleOverlay:true
                }).then(image => {
                    console.log(image);
                    this.setState({
                        loading:true,
                        image:image.path
                    })
                    this.uploadImg(image.data);
                });
            }
            if (buttonIndex == 1) {
                ImagePicker.openPicker({
                    includeBase64:true,
                    cropping:true,
                    cropperCircleOverlay:true
                }).then(image => {
                    console.log(image);
                    this.setState({
                        loading:true,
                        image:image.path
                    })
                    this.uploadImg(image.data);
                });
            }
        });
    }

    uploadImg(image){
        var PostData ={
            data:{
               base64:image,
               id:this.props.param.id
            }
        }
        Tools.postNotBase64(IPAddr+"/user/updateUserInfo.php", PostData,(ret)=>{
            console.log("====dadadada=="+ret)
                this.setState({loading:false})
                Toast.show("头像上传成功！", 2000)
                let value = 'value';
                RCTDeviceEventEmitter.emit('undateUserInfo',value); 
                
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
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={JZBImages.back} style={{width:30, height:30}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, color:'#00B09D'}}>我的资料</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity style={styles.icon} activeOpacity={0.8} onPress={()=>{this.changeIcon()}}>
                        <Text style={{fontSize:16}}>我的头像</Text>
                        <View style={{width:80, height:60, flexDirection:'row', alignItems:'center'}}>
                            <Image source={{uri: !this.state.image?IPAddr+this.props.param.user_icon:this.state.image}} style={{width:60, height:60, borderRadius:30}} />
                            <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.child}>
                        <View style={styles.cell}>
                            <Text style={{fontSize:16}}>孩子学段</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>二年级</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{fontSize:16}}>孩子年龄</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>12岁以上</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </View>
                        <View style={[styles.cell, {borderBottomWidth:0}]}>
                            <Text style={{fontSize:16}}>孩子性别</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>男孩</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.child}>
                        <View style={styles.cell}>
                            <Text style={{fontSize:16}}>昵称</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center', paddingRight:20}}>
                                <TextInput
                                    style={{width:50, height:44, color:'#9A9A9A'}}
                                    textAlign='right'
                                    defaultValue = "冷冷"/>
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{fontSize:16}}>性别</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>男</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </View>
                        <View style={[styles.cell, {borderBottomWidth:0}]}>
                            <Text style={{fontSize:16}}>邮寄地址</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>填写地址,邮寄奖品</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <LoadingShow loading={this.state.loading} text={this.state.loadingWaitText}/>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
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
        borderBottomColor:'#E8E8E8'
    },
    TextInput:{
    	flex:1,
    	borderRadius:5,
    	backgroundColor:'#EAEBED',
    	marginLeft:20,
    	marginRight:20,
    	height:30,
    	alignItems:'center',
    	flexDirection:'row',
    	justifyContent:'center'
    },
    recommendCell:{
        flex:1, 
        marginLeft:10, 
        marginRight:10, 
        justifyContent:'space-between'
    },
    icon:{
        width:screenWidth,
        height:80,
        backgroundColor:'#FFF',
        borderTopWidth:1,
        borderTopColor:'#E8E8E8',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingLeft:15,
        paddingBottom:10,
        paddingRight:10,
        justifyContent:'space-between'
    },
    child:{
        width:screenWidth,
        height:44*3,
        backgroundColor:'#FFF',
        borderTopWidth:1,
        borderTopColor:'#E8E8E8',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        marginTop:15,
        paddingLeft:15
    },
    cell:{
        height:44, 
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between', 
        flex:1, 
        paddingRight:10, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8'
    }
});