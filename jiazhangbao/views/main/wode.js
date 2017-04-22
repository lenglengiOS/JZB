
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Tools from '../tools';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           
		}
	}
    componentDidMount(){
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
        Geolocation.getCurrentPosition().then(data => {
                console.log("====Geolocation=="+JSON.stringify(data))
                Geolocation.reverseGeoCode(data.latitude, data.longitude).then(res => {
                        console.log("====reverseGeoCode=="+JSON.stringify(res))
                        this.setState({location:res.city})
                    }).catch(e =>{
                    console.warn(e, 'error');
                  })

          }).catch(e =>{
            console.warn(e, 'error');
          })
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
                    user_icon:''
                })
            }
        });  
    }

    setting(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'setting',
                param:{
                    
                }
            })
        }
    }

    goToLogin(){
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

    renderNameView(){
    	if(this.state.isLogin)
    	{
    		return(
                <View style={{flex:1, height:60}} activeOpacity={1} onPress={()=>this.gotoUserInfo()}>
        			<View style={{flexDirection:'row', marginTop:5}}>
        				<Text style={{color:'#FB5441', fontSize:16, marginLeft:15, marginRight:10}}>{this.state.username}</Text>
        				<Image source={JZBImages.gc_beauty_v1} style={{width:18, height:18}} />
        			</View>
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <Image source={JZBImages.location} style={{width:10, height:14, marginLeft:15}}/>
                        <Text style={{marginLeft:3, color:'#717171', fontSize:14}}>{this.state.location}</Text>
                    </View>
                    
                </View>
	    	)
    	}
    	return(
    		<View style={{height:60, flex:1, flexDirection:'row',alignItems:'center'}} activeOpacity={1} onPress={()=>this.goToLogin()}>
    			<Text style={{color:'#969696', fontSize:16, marginLeft:15}}>登陆/注册</Text>
    		</View>
    	)
    	
    }

	render(){
		return(
			<View style={styles.container}>
                <View style={styles.nav}>
                	<Text style={styles.userCenter}>个人中心</Text>
                </View>
                <ScrollView>
                	<View style={styles.userInfo}>
                		<TouchableOpacity style={{height:90,marginLeft:15, paddingRight:10,borderBottomWidth:1,borderBottomColor:'#E8E8E8', alignItems:'center',flexDirection:'row'}} activeOpacity={1} onPress={()=>this.goToLogin()}>
                			<Image source={this.state.user_icon?{uri: IPAddr+this.state.user_icon}:JZBImages.userIcon} style={{width:60, height:60, borderRadius:30, backgroundColor:'#F5F5F5'}}/>
                			{this.renderNameView()}
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</TouchableOpacity>
                		<View style={{width:screenWidth, height:64, backgroundColor:'#FFF', paddingLeft:15, paddingRight:15,flexDirection:'row'}}>
                			<View style={styles.jifen}>
                				<Text style={{color:'#717171', fontSize:15}}>0</Text>
                				<Text style={{color:'#717171', fontSize:14}}>我的积分</Text>
                			</View>
                			<View style={styles.jifen}>
                				<Text style={{color:'#717171', fontSize:15}}>0</Text>
                				<Text style={{color:'#717171', fontSize:14}}>签到天数</Text>
                			</View>
                			<View style={styles.jifen}>
                				<Text style={{color:'#717171', fontSize:15}}>0</Text>
                				<Text style={{color:'#717171', fontSize:14}}>活跃指数</Text>
                			</View>
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_take_class} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>已报班</Text>
                			<Text style={{color:'#717171', fontSize:16, marginRight:5}}>查看订单</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_post} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>帖子</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                		<View style={{marginLeft:53, width:screenWidth-53, height:1, backgroundColor:'#E8E8E8'}}/>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_friend} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>好友</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_follow} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>关注</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                		<View style={{marginLeft:53, width:screenWidth-53, height:1, backgroundColor:'#E8E8E8'}}/>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_store} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>收藏</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>
                	<View style={styles.commCell}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.setting()}}>
                    		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                    			<Image source={JZBImages.user_setting} style={styles.image} />
                    			<Text style={{color:'#000', fontSize:16, flex:1}}>设置</Text>
                    			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                    		</View>
                        </TouchableOpacity>
                	</View>





                </ScrollView>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#F5F5F5',
    },
    nav:{
    	width:screenWidth,
    	height:64,
    	paddingTop:20,
    	backgroundColor:'#33BAAB',
    	justifyContent:'center',
    	alignItems:'center'
    },
    userCenter:{
    	color:'#FFF',
    	fontSize:17
    },
    userInfo:{
    	backgroundColor:'#FFF',
    	borderBottomWidth:1,
    	borderBottomColor:'#E8E8E8',
    	borderTopWidth:1,
    	borderTopColor:'#E8E8E8',
    	marginTop:-1
    },
    jifen:{
    	flex:1,
    	height:64,
    	paddingTop:5,
    	paddingBottom:4, 
    	alignItems:'center', 
    	justifyContent:'space-around'
    },
    commCell:{
    	width:screenWidth, 
    	borderTopWidth:1, 
    	borderTopColor:'#E8E8E8', 
    	marginTop:13, 
    	backgroundColor:'#FFF', 
    	borderBottomWidth:1, 
    	borderBottomColor:'#E8E8E8'
    },
    image:{
    	width:24, 
    	height:24, 
    	marginRight:15
    }
    
});


























