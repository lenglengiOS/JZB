
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
import Picker from 'react-native-picker';
import Toast from '../tools/Toast';
import Tools from '../tools';

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
            loading:false,
            loadingWaitText:"正在上传...",
            image:IPAddr+this.props.param.user_icon,
            flag:this.props.param.user_icon,
            info_1:'请输入',
            info_2:'请输入',
            info_3:'请输入',
            info_4:'请输入',
            info_5:'请输入',
		}
	}
    componentDidMount(){
        this.setState({
            info_1:this.props.param.data.c_grade?this.props.param.data.c_grade:'请输入',
            info_2:this.props.param.data.c_age?this.props.param.data.c_age:'请输入',
            info_3:this.props.param.data.c_sex?this.props.param.data.c_sex:'请输入',
            info_4:this.props.param.data.sex?this.props.param.data.sex:'请输入',
            info_5:this.props.param.data.user_name?this.props.param.data.user_name:'请输入',
            address:this.props.param.data.address,
            data:this.props.param.data
        })
        this.listener = RCTDeviceEventEmitter.addListener('undateUserAddr',(value)=>{  
            // 接受到通知后的处理  
            this.setState({
                address:value
            })
            // 重新获取新的数据
            this.login();
        });
    }

    componentWillUnmount(){  
      // 移除监听 一定要写  
      this.listener.remove();  
    } 

    login(){
        Tools.getStorage("maincfg",(resData)=>{
            if(Tools.isDataValid(resData))
            {
                this.setState({isLogin:true})
                var maincfgData=JSON.parse(resData)
                console.log("====maincfgData=="+maincfgData)
                var PostData ={
                    data:{
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    }
                }
                Tools.postNotBase64(IPAddr+"/login/login.php", PostData,(ret)=>{
                    console.log("====dadadada=="+JSON.stringify(ret))
                        if(ret.message == "登陆成功")
                        {
                            this.setState({
                                username:ret.data[0].user_name,
                                id:ret.data[0].id,
                                user_icon:ret.data[0].user_icon,
                                data:ret.data[0],
                                isLogin:true
                            })
                        }else{
                            Toast.show("获取用户信息失败", 2000)
                        }
                    }, (err)=>{
                        Toast.show(err);
                        this.setState({isLogin:false})
                        console.log("====444444==="+err)
                });
            }else{
                this.setState({
                    isLogin:false,
                    user_icon:null
                })
            }
        });  
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
                this.setState({
                    loading:false,
                    flag:'http://'
                    })
                Toast.show("头像上传成功！", 2000)
                let value = 'value';
                RCTDeviceEventEmitter.emit('undateUserInfo',value); 
                
            }, (err)=>{
                this.setState({
                    loading:false,
                    flag:'http://'
                    })
                Toast.show(err);
                console.log("====444444==="+err)
        });
    }

    uploadInfo(INDEX){
        var data = [];
        var pickerTitleText = '';
        var selectedValue = [];
        switch(INDEX){
            case 1:
                data = ['未入园','幼儿园','一年级','二年级','三年级','四年级','五年级','六年级','初中及以上'];
                //data = [1,2,3,4];
                pickerTitleText = '请选择孩子学段';
                selectedValue = ['未入园'];
            break;
            case 2:
                data = ['未出生','1岁以下','1岁','2岁','3岁','4岁','5岁','6岁','7岁','8岁','9岁','10岁','11岁','12岁','12岁以上'];
                pickerTitleText = '请选择孩子年龄';
                selectedValue = ['未出生'];
            break;
            case 3:
                data = ['男孩','女孩'];
                pickerTitleText = '请选择孩子性别';
                selectedValue = ['男孩'];
            break;
            case 4:
                data = ['男','女'];
                pickerTitleText = '请选择性别';
                selectedValue = ['男'];
            break;
        }


        Picker.init({
            pickerData: data,
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:pickerTitleText,
            pickerConfirmBtnColor:[0,116,251,1], 
            pickerCancelBtnColor:[107,107,107,1],   
            pickerTitleColor:[161,161,161,1],
            selectedValue: selectedValue,

            onPickerConfirm: data => {
                this.post(INDEX, data[0]);
            },
            onPickerCancel: data => {
                //alert(data);
            },
            onPickerSelect: data => {
                //alert(data);
            }
        });
        Picker.show();
    }

    post(INDEX, data){
        this.setState({
                    loading:true,
                    loadingWaitText:'正在上传...'
                })
                var PostData ={
                    data:{
                        index:INDEX,
                        info:data,
                        user_phone:this.props.param.data.user_phone
                    }
                }
                Tools.postNotBase64(IPAddr+"/user/updateUserInfo.php", PostData,(ret)=>{
                    console.log("====dadadada=="+ret)
                        switch(INDEX){
                            case 1:
                                this.setState({
                                    loading:false,
                                    info_1:data
                                })
                            break;
                            case 2:
                                this.setState({
                                    loading:false,
                                    info_2:data
                                })
                            break;
                            case 3:
                                this.setState({
                                    loading:false,
                                    info_3:data
                                })
                            break;
                            case 4:
                                this.setState({
                                    loading:false,
                                    info_4:data
                                })
                            break;
                            case 5:
                                this.setState({
                                    loading:false,
                                })
                            break;
                        }
                        Toast.show("更新成功！", 2000)
                        let value = 'value';
                        RCTDeviceEventEmitter.emit('undateUserInfo',value);
                        
                    }, (err)=>{
                        this.setState({loading:false})
                        Toast.show(err);
                        console.log("====444444==="+err)
                });
    }

    gotoAddress(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'postaddress',
                param:{
                    data:this.state.data
                }
            })
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
                        <Image source={JZBImages.back} style={{width:25, height:25}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, color:'#00B09D'}}>我的资料</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity style={styles.icon} activeOpacity={0.8} onPress={()=>{this.changeIcon()}}>
                        <Text style={{fontSize:16}}>我的头像</Text>
                        <View style={{width:80, height:60, flexDirection:'row', alignItems:'center'}}>
                            <Image source={this.state.flag?{uri: this.state.flag.indexOf('https://q.qlogo.cn') != -1?this.state.flag:this.state.image}:JZBImages.userIcon} style={{width:60, height:60, borderRadius:30, backgroundColor:'#F5F5F5'}} />
                            <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.child}>
                        <TouchableOpacity style={styles.cell} activeOpacity={0.8} onPress={()=>{this.uploadInfo(1)}}>
                            <Text style={{fontSize:16}}>孩子学段</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>{this.state.info_1}</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cell} activeOpacity={0.8} onPress={()=>{this.uploadInfo(2)}}>
                            <Text style={{fontSize:16}}>孩子年龄</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>{this.state.info_2}</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cell, {borderBottomWidth:0}]} activeOpacity={0.8} onPress={()=>{this.uploadInfo(3)}}>
                            <Text style={{fontSize:16}}>孩子性别</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>{this.state.info_3}</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.child}>
                        <View style={styles.cell}>
                            <Text style={{fontSize:16}}>昵称</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center', paddingRight:20, flex:1}}>
                                <TextInput
                                    style={{flex:1,height:44, color:'#9A9A9A'}}
                                    textAlign='right'
                                    placeholder='请输入昵称'
                                    fontSize={16}
                                    onSubmitEditing={(event)=>this.post(5,event.nativeEvent.text)}
                                    clearButtonMode='while-editing'
                                    onChangeText = {(text) => this.setState({info_5:text})}
                                    defaultValue = {this.state.info_5}/>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.cell} activeOpacity={0.8} onPress={()=>{this.uploadInfo(4)}}>
                            <Text style={{fontSize:16}}>性别</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>{this.state.info_4}</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cell, {borderBottomWidth:0}]} activeOpacity={0.8} onPress={()=>{this.gotoAddress()}}>
                            <Text style={{fontSize:16}}>邮寄地址</Text>
                            <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, color:'#9A9A9A'}}>{this.state.address?this.state.address:'填写地址,邮寄奖品'}</Text>
                                <Image source={JZBImages.chose} style={{width:20, height:20,}} />
                            </View>
                        </TouchableOpacity>
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