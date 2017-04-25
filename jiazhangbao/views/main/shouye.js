
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
    NativeModules
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
import Tools from '../tools';
import PageLoading from '../tools/Loading';


//import {org} from './youeryuan.js';
//import {org} from './xiaoxue.js';
//import {org} from './peixunban.js';
//import {org} from './tuoguanban.js';
import {org} from './jigouInfo.js';



export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
            network:true,
            isLogin:false,
            loading:true
		}
	}

    /////////////////////////////录入机构总览到数据库////////////////////////////////
    insertData(){
        for(var i = 0; i < org.length; i++){
            var PostData ={
                        data:{
                            orgId: org[i].id,
                            name: org[i].name,
                            address: org[i].address,
                            shortName: org[i].shortName,
                            logo: org[i].logo,
                            lng: org[i].lng,
                            lat: org[i].lat,
                            isIdentify: org[i].isIdentify,
                            viewNum: org[i].viewNum,
                            distance: org[i].distance,
                            tag:3
                        }
                    }
            Tools.postNotBase64(IPAddr+"/saveData.php", PostData,(ret)=>{
                console.log("====insertdadadada=="+JSON.stringify(ret))
                    
                }, (err)=>{
                    console.log("====insert444444==="+err)
            });
        }
    }
    //////////////////////////////////////////////////////////


    /////////////////////////////录入所有机构信息到数据库////////////////////////////////
    insertJigouInfo(){
        for(var i = 0; i < org.length; i++){
            var PostData ={
                        data:{
                            logo:org[i].ext.logo,
                            album:org[i].ext.album,
                            viewNum:org[i].ext.viewNum,
                            id:org[i].ext.id,
                            orgUserId:org[i].ext.orgUserId,
                            groupId:org[i].ext.groupId,
                            shareNum:org[i].ext.shareNum,
                            isIdentify:org[i].ext.isIdentify,
                            telPhone:'18202853094',
                            address:org[i].ext.address,
                            description:org[i].ext.description,
                            name:org[i].ext.name,
                            imGroupId:org[i].ext.imGroupId,
                            teacher:"冷洪林，陆彦雪",
                            circleId:org[i].ext.circleId,
                            isAgreement:org[i].ext.isAgreement,
                            lng:org[i].ext.lng,
                            lat:org[i].ext.lat
                        }
                    }
            Tools.postNotBase64(IPAddr+"/saveJigouInfoData.php", PostData,(ret)=>{
                console.log("====saveJigouInfoData=="+JSON.stringify(ret))
                    
                }, (err)=>{
                    console.log("====saveJigouInfoData444444==="+err)
            });
        }
    }

    insertPostEvent(){
        for(var i = 0; i < org.length; i++){
            var PostData ={
                        data:{
                            content:org[i].ext.posts[0].content,
                            id:org[i].ext.posts[0].id,
                            createTime:org[i].ext.posts[0].createTime,
                            title:org[i].ext.posts[0].title,
                            likeNum:org[i].ext.posts[0].likeNum,
                            childGrade:org[i].ext.posts[0].childGrade,
                            name:org[i].ext.posts[0].name,
                            circleId:org[i].ext.posts[0].userId,
                            avatar:org[i].ext.posts[0].avatar,
                            replyNum:org[i].ext.posts[0].replyNum,
                            photos:org[i].ext.event.photos
                        }
                    }
            Tools.postNotBase64(IPAddr+"/jigouInfo.php", PostData,(ret)=>{
                console.log("====jigouInfo=="+JSON.stringify(ret))
                    
                }, (err)=>{
                    console.log("====jigouInfo444444==="+err)
            });
        }
    }

    componentDidMount(){
        //this.insertData();
        //this.insertJigouInfo();
        //this.insertPostEvent();

        this.goLocation();
        this.login();
        this.listener = RCTDeviceEventEmitter.addListener('undateUserInfo',(value)=>{  
            // 接受到通知后的处理  
            this.login();
        }); 
    }

    componentWillUnmount(){  
      // 移除监听 一定要写  
      this.listener.remove();  
    }  

    goLocation(){
        navigator.geolocation.getCurrentPosition(
          (position) => {
                console.log("==position===="+JSON.stringify(position));
                this.setState({
                    longitude:position.coords.longitude,
                    latitude:position.coords.latitude
                })
                this.getData();
            },
            (error) =>{
                console.log("==error.message===="+error.message);
                Toast.show("获取定位失败！", 2000)
                this.getData();
            }
        );
    }

    getData(){
        this.setState({loading:true})
        Tools.get(IPAddr+"/home/home.php"+'?longitude='+this.state.longitude+'&latitude='+this.state.latitude,(data)=>{
                console.log("==getData===="+JSON.stringify(data));
                this.setState({
                    recomedNews:data.recomedNews,
                    recomedCourse:data.recomedCourse,
                    recomedOrg:data.recomedOrg,
                    network:true,
                    loading:false,
                    topItems:data.topItems
                })
                
        },(err)=>{
            this.setState({
              loadingWait:false,
              loaderr:true,
              network:false,
              loading:false
            })
            Toast.show(err)
        })
    }

    login(){
        Tools.getStorage("maincfg",(resData)=>{
            if(Tools.isDataValid(resData))
            {
                var maincfgData=JSON.parse(resData)
                this.setState({
                        isLogin:true,
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    })
                console.log("====maincfgData=="+resData)
                var PostData ={
                    data:{
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    }
                }
                Tools.postNotBase64(IPAddr+"/login/login.php", PostData,(ret)=>{
                    console.log("====登陆成功dadadada=="+JSON.stringify(ret))
                        if(ret.message == "登陆成功")
                        {
                            this.setState({
                                username:ret.data[0].user_name,
                                id:ret.data[0].id,
                                user_icon:ret.data[0].user_icon,
                                data:ret.data[0],
                                isLogin:true,
                                c_grade:ret.data[0].c_grade+"家长"
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

    pressUserIcon() {
            let {route,navigator} = this.props;
            if(navigator) {
                navigator.push({
                    name: this.state.isLogin?'userinfo':'login',
                    param:{
                        id:this.state.id?this.state.id:'',
                        user_icon:this.state.user_icon,
                        data:this.state.data
                    }
                })
            }
    }

    _search(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'search',
            })
        }
    }

    _showMsg(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'sysmsg',
                param:{
                    title:'系统消息'
                }
            })
        }
    }

    pressOrg(TITLE, INDEX){
        var com = 'jiaoyu';
        if (INDEX == 7) {com='homejiazhangquan'}
        if (INDEX == 8) {return}
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: INDEX<=4?'org':com,
                param:{
                    TITLE:TITLE,
                    INDEX:INDEX,
                    topItems:this.state.topItems,
                    userIcon:this.state.user_icon,
                    userId:this.state.id,
                    userphone:this.state.userphone,
                    username:this.state.username
                }
            })
        }
    }

    _goToNewsDetail(TITLE, URL) {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'newsdetail',
                param: {
                    title:TITLE,
                    url:URL
                }
            })
        }
    }

    goToCourseDetails(PRICE, NAME, ID){
        var TITLE = '';
        if (PRICE) {
            TITLE = "课程详情";
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'coursedetail',
                    param: {
                        title:TITLE,
                        name:NAME
                    }
                })
            }
        }else{
            TITLE = "机构信息";
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'jigouinfo',
                    param: {
                        title:TITLE,
                        id:ID,
                        name:NAME,
                        userIcon:this.state.user_icon,
                        userId:this.state.id,
                        userphone:this.state.userphone,
                        username:this.state.username,
                        c_grade:this.state.c_grade
                    }
                })
            }
        }
    }

    _renderCell(ICON, TITLE, INDEX){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressOrg(TITLE, INDEX)} style={{width:screenWidth, flex:1, justifyContent:'center', alignItems:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Image source={ICON} style={{width:42, height:42, borderRadius:21, marginBottom:5, backgroundColor:'#F5F5F5'}}/>
                    <Text style={{fontSize:14}}>{TITLE}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderBodyCell(ICON, TITLT, COLOR, TEXT, URL){
        return(
            <View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._goToNewsDetail(TEXT, URL)}}>
                    <View style={styles.bodyCell}>
                        <Image source={{uri: ICON}} style={{width:25, height:25, borderRadius:3}}/>
                        <Text style={{color:'#00B1FE', marginLeft:10}}>{TITLT}</Text>
                    </View>
                    <Text style={styles.textStyle} numberOfLines={1}>{TEXT}</Text>
                    <View style={{height:1, width:screenWidth-30, marginLeft:15, marginTop:15, backgroundColor:COLOR}}/>
                </TouchableOpacity>
            </View>
        )
    }

    _renderRecommendCell(ICON, TITLE, SUBTITLE, PRICE, DISTANCE, ID){
        var icon = this.state.recomedOrg?{uri: ICON}:JZBImages.default_holder;
        return(
            <View>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.goToCourseDetails(PRICE, TITLE, ID)}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={icon} style={{width:85, height:70, marginTop:15, marginLeft:10, backgroundColor:'#F5F5F5'}}/>
                        <View style={styles.recommendCell}>
                            <View>
                                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                    <Text style={{fontSize:16}}>{TITLE}</Text>
                                    <Text style={{fontSize:18, color:'#F87B00'}}>{PRICE}</Text>
                                </View>
                                <Text style={{fontSize:13, color:'#9B9B9B', marginTop:5}}>{SUBTITLE}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Image source={JZBImages.location} style={{width:8, height:12}}/>
                                <Text style={{fontSize:12, color:'#9B9B9B'}}> {DISTANCE}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{height:1, width:screenWidth, marginTop:15, backgroundColor:'#E8E8E8'}} />
            </View>
        )
    }

    _renderRecommendHeader(TITLE){
        return(
            <View>
                <View style={styles.recommendHeader}>
                    <View style={{width:4, height:20, backgroundColor:'#00B09D', marginLeft:10}}/>
                    <Text style={{color:'#8D8D8D', fontSize:15, marginLeft:5}}>{TITLE}</Text>
                </View>
                <View style={{width:screenWidth, height:1, backgroundColor:'#E8E8E8'}}></View>
            </View>
        )
    }

    _renderBody(){
        if (!this.state.network) {
            return(
                <View style={{alignItems:'center', marginTop:10}}>
                    <Text style={{color:'#272822'}} onPress={()=>this.getData()}>点击加载</Text>
                </View>
            )
        }
        return(
            <View style={{backgroundColor:'#FFF', marginTop:15}}>
                <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                {this._renderBodyCell(this.state.recomedNews?IPAddr+this.state.recomedNews[0].img:'http://', this.state.recomedNews?this.state.recomedNews[0].title:'', '#E8E8E8', this.state.recomedNews?this.state.recomedNews[0].subtitle:'', this.state.recomedNews?this.state.recomedNews[0].url:'')}
                {this._renderBodyCell(this.state.recomedNews?IPAddr+this.state.recomedNews[1].img:'http://', this.state.recomedNews?this.state.recomedNews[1].title:'', '#E8E8E8', this.state.recomedNews?this.state.recomedNews[1].subtitle:'', this.state.recomedNews?this.state.recomedNews[1].url:'')}
                {this._renderBodyCell(this.state.recomedNews?IPAddr+this.state.recomedNews[2].img:'http://', this.state.recomedNews?this.state.recomedNews[2].title:'', '#E8E8E8', this.state.recomedNews?this.state.recomedNews[2].subtitle:'', this.state.recomedNews?this.state.recomedNews[2].url:'')}
                {this._renderBodyCell(this.state.recomedNews?IPAddr+this.state.recomedNews[3].img:'http://', this.state.recomedNews?this.state.recomedNews[3].title:'', '#FFF', this.state.recomedNews?this.state.recomedNews[3].subtitle:'', this.state.recomedNews?this.state.recomedNews[3].url:'')}
                <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                <View style={{width:screenWidth, height:15, backgroundColor:'#F5F5F5'}}/>
                {this._renderRecommendHeader('推荐课程')}
                {this._renderRecommendCell(this.state.recomedCourse?IPAddr+this.state.recomedCourse[0].img:JZBImages.default_holder, this.state.recomedCourse?this.state.recomedCourse[0].title:'', this.state.recomedCourse?this.state.recomedCourse[0].school:'', this.state.recomedCourse?'¥ '+this.state.recomedCourse[0].price:'', this.state.recomedCourse?this.state.recomedCourse[0].location:'')}
                {this._renderRecommendCell(this.state.recomedCourse?IPAddr+this.state.recomedCourse[2].img:JZBImages.default_holder, this.state.recomedCourse?this.state.recomedCourse[2].title:'', this.state.recomedCourse?this.state.recomedCourse[2].school:'', this.state.recomedCourse?'¥ '+this.state.recomedCourse[2].price:'', this.state.recomedCourse?this.state.recomedCourse[2].location:'')}
                <View style={{width:screenWidth, height:15, backgroundColor:'#F5F5F5'}}/>
                {this._renderRecommendHeader('推荐机构')}
                {this._renderRecommendCell(this.state.recomedOrg?BimgURL+this.state.recomedOrg[0].logo+LimgURL:'http://', this.state.recomedOrg?this.state.recomedOrg[0].name:'', this.state.recomedOrg?this.state.recomedOrg[0].address:'', '', this.state.recomedOrg?this.state.recomedOrg[0].distance:'', this.state.recomedOrg?this.state.recomedOrg[0].orgId:'')}
                {this._renderRecommendCell(this.state.recomedOrg?BimgURL+this.state.recomedOrg[1].logo+LimgURL:'http://', this.state.recomedOrg?this.state.recomedOrg[1].name:'', this.state.recomedOrg?this.state.recomedOrg[1].address:'', '', this.state.recomedOrg?this.state.recomedOrg[1].distance:'', this.state.recomedOrg?this.state.recomedOrg[1].orgId:'')}
                {this._renderRecommendCell(this.state.recomedOrg?BimgURL+this.state.recomedOrg[2].logo+LimgURL:'http://', this.state.recomedOrg?this.state.recomedOrg[2].name:'', this.state.recomedOrg?this.state.recomedOrg[2].address:'', '', this.state.recomedOrg?this.state.recomedOrg[2].distance:'', this.state.recomedOrg?this.state.recomedOrg[2].orgId:'')}
                {this._renderRecommendCell(this.state.recomedOrg?BimgURL+this.state.recomedOrg[3].logo+LimgURL:'http://', this.state.recomedOrg?this.state.recomedOrg[3].name:'', this.state.recomedOrg?this.state.recomedOrg[3].address:'', '', this.state.recomedOrg?this.state.recomedOrg[3].distance:'', this.state.recomedOrg?this.state.recomedOrg[3].orgId:'')}
                <View style={{width:screenWidth, height:15, backgroundColor:'#F5F5F5'}}/>
            </View>
        )
    }

	render(){
        if(this.state.loading)
        {
            return PageLoading.loadingContent();
        }
		return(
			<View style={styles.container}>
                <View style={{width:screenWidth, height:64}}>
                    <Image source={JZBImages.nav} style={styles.nav} resizeMode={Image.resizeMode.stretch}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._search()}}>
                            <Image source={JZBImages.search} style={{width:25, height:25, marginRight:30, tintColor:'#FFF'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._showMsg()}}>
                            <Image source={JZBImages.msg} style={{width:25, height:25}}/>
                        </TouchableOpacity>
                    </Image>
                </View>
                <ScrollView>
                    <View style={{backgroundColor:"#FFF", paddingBottom:10}}>
                        <Image source={JZBImages.userBg} style={{width:screenWidth, height:113}} resizeMode={Image.resizeMode.stretch}>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.pressUserIcon()}} style={{alignItems:'center'}}>
                                <Image source={this.state.user_icon?{uri:IPAddr+this.state.user_icon}:JZBImages.userIcon} style={{width:70, height:70, borderRadius:35, backgroundColor:'#F5F5F5'}}/>
                                <Text style={styles.login}>{this.state.isLogin?this.state.username:'登录/注册'}</Text>
                            </TouchableOpacity>
                        </Image>
                        <View style={{width:screenWidth, height:150}}>
                            <View style={{width:screenWidth, flex:1, flexDirection:'row'}}>
                                {this._renderCell(JZBImages.youeryuan,'幼儿园',1)}
                                {this._renderCell(JZBImages.xiaoxue,'小学',2)}
                                {this._renderCell(JZBImages.peixunban,'培训班',3)}
                                {this._renderCell(JZBImages.tuoguanban,'托管班',4)}
                            </View>
                            <View style={{width:screenWidth, flex:1, flexDirection:'row'}}>
                                {this._renderCell(JZBImages.jiaoyu,'教育升学',5)}
                                {this._renderCell(JZBImages.zhishi,'家长知识',6)}
                                {this._renderCell(JZBImages.jiazhangquan,'家长圈',7)}
                                {this._renderCell(JZBImages.taolun,'热门讨论',8)}
                            </View>
                        </View>
                    </View>
                    {this._renderBody()}
                </ScrollView>
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
        paddingTop:20, 
        paddingRight:20, 
        flexDirection:'row', 
        justifyContent:'flex-end', 
        alignItems:'center'
    },
    login:{
        color:'#F9AB48', 
        marginTop:10, 
        fontSize:18, 
        backgroundColor:'transparent',
        textAlign:'center'
    },
    bodyCell:{
        width:screenWidth-30, 
        marginLeft:15, 
        marginTop:15, 
        height:25, 
        flexDirection:'row', 
        alignItems:'center'
    },
    textStyle:{
        marginLeft:50, 
        width:screenWidth-65, 
        marginLeft:50, 
        marginTop:10, 
        fontSize:16
    },
    recommendHeader:{
        width:screenWidth, 
        height:35, 
        flexDirection:'row', 
        alignItems:'center'
    },
    recommendCell:{
        flex:1, 
        marginLeft:10, 
        marginTop:15, 
        marginRight:10, 
        justifyContent:'space-between'
    }
});























