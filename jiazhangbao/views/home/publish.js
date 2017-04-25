
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import ImagePicker from 'react-native-image-crop-picker';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
import Tools from '../tools';

export default class WoDe extends React.Component{
    constructor(props){
        super(props);
        this.state={
            images:[],
            loading:false,
            loadingWaitText:"发布中...",
        }
    }
    componentDidMount(){
        //alert(this.props.param.circleId)maincfgData
        //var timestamp=new Date().getTime();
        //alert(timestamp)
        //console.log("======circleId====="+this.props.param.circleId);
        //console.log("======userIcon====="+this.props.param.userIcon);
        //console.log("======userId====="+this.props.param.userId);
        //console.log("======userphone====="+this.props.param.userphone);
        //console.log("======username====="+this.props.param.username);
        //console.log("======timestamp====="+timestamp);
        //var createTime = this.getNowFormatDate();
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
        // 发布帖子，发布完了之后发送一个通知
        this.setState({loading:true})
        var timestamp=new Date().getTime();
        var createTime = this.getNowFormatDate();
        var PostData ={
                    data:{
                        id: timestamp,
                        circleId: this.props.param.circleId,
                        userIcon: this.props.param.userIcon,
                        userphone: this.props.param.userphone,
                        username: this.props.param.username,
                        title: this.state.title,
                        content: this.state.topic,
                        images: this.state.uploadImgs,
                        sizeArr:this.state.sizeArr,
                        createTime: createTime,
                        c_grade:this.props.param.c_grade
                    }
                }
        Tools.postNotBase64(IPAddr+"/jigou/postData.php", PostData,(ret)=>{
                console.log("====postData=="+JSON.stringify(ret))
                this.setState({loading:false})
                Toast.show("发布成功！", 2000);
                // 发送通知
                let value = 'value';
                RCTDeviceEventEmitter.emit('undatePosts',value);
                this.goBack(); 
            }, (err)=>{
                this.setState({loading:false})
                Toast.show(err);
                console.log("====444444==="+err)
        });
    }

    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
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
                    includeBase64:true,
                    cropping:true,
                    cropperCircleOverlay:true
                }).then(image => {
                    console.log(image);
                    var sizeArr = [image.width/image.height];
                    this.setState({
                        images:this.state.images.length<1?[image]:this.state.images.concat([image]),
                        uploadImgs: this.state.images.length<1?[image.data]:this.state.images.concat([image.data]),
                        sizeArr: sizeArr
                    })
                });
            }
            if (buttonIndex == 1) {
                ImagePicker.openPicker({
                    multiple: true,
                    maxFiles:8,
                    includeBase64:true,
                    cropping:true,
                    cropperCircleOverlay:true
                }).then(images => {
                    console.log("--------------------images-----------------"+JSON.stringify(images));
                    var uploadImgs = [];
                    var sizeArr = [];
                    for(var i = 0; i < images.length; i++){
                        uploadImgs.push(images[i].data);
                        sizeArr.push(images[i].width/images[i].height);
                    }
                    //console.log("--------------------uploadImgs-----------------"+JSON.stringify(uploadImgs));
                    this.setState({
                        images:this.state.images.length<1?images:this.state.images.concat(images),
                        uploadImgs: uploadImgs,
                        sizeArr:sizeArr
                    })
                });
            }
        });
    }

    renderSelImg(){
        if (this.state.images.length>0) {
            return this.state.images.map((item, index) => {
                return(
                    <View key={index}>
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
                <TouchableOpacity activeOpacity={0.8} style={{width:42, height:42, marginLeft:10, marginTop:5}} onPress={()=>this.pickImage()}>
                    <Image source={JZBImages.addImage} style={{width:42, height:42, marginLeft:10, marginTop:5}} /> 
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











