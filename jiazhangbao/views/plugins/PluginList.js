'use strict';

import Tools from "../tools";
const Toast = require("../tools/Toast")
import React from 'react';
import {
    Platform,
    NativeModules
} from 'react-native';
var PluginList = NativeModules.NativeTools;
const AppPlugin = ({
	initPush:function(){
		PluginList.initPush()
	},
	clearuserInfo:function(){
        Tools.removeStorage("token");
        Tools.removeStorage("iminfo");
        Tools.removeStorage('isIMLogin')
        Tools.removeStorage("usertype")
        Tools.removeStorage("duobaotoken")
        this.logoutIM();
    },
    checkIMLogin:function(successCallBack){
    	Tools.getStorage("isIMLogin",(isIMLogin)=>{
			if(isIMLogin||isIMLogin=="true"){
				successCallBack();
			}else{
				Tools.getStorage("maincfg",(resData)=>{
					if(Tools.isDataValid(resData)&&Tools.isDataValid(resData.other)&&resData.other.iminfo){
						Tools.getToken((token)=>{
							this.autoLoginIM(resData.other.iminfo,token,(ret)=>{
								if(ret>0){
									successCallBack();
								}else{
									Toast.show("登录失效,请重新登录");
									this.clearuserInfo();
								}
							})
						})
					}
				})		
			}
		})		
    },
    autoLoginIM:function(imInfoUrl,token,callback){
            Tools.get(imInfoUrl+"/token/"+token,(resData)=>{
                if(Tools.isDataValid(resData.imuid)&&Tools.isDataValid(resData.impwd)){
                    var IMaccount={
                        "openimAccount":resData.imuid,
                        "openimPass":resData.impwd
                        }
                    var userinfo={
                        IMaccount:IMaccount,
                        token:token
                    }
                    Tools.setStorage("iminfo",JSON.stringify(userinfo))
                    this.loginIM(IMaccount);
                    Tools.setStorage("isIMLogin","true") 
                    if(callback){
                    	callback(1);
                    }                   
                 }else{
                    //返回的im为null时,判断当前缓存的用户的token用户是否是当前的token是否一样，是一样的则取出其缓存的im账号来登录，否则需要重新登录
                    Tools.getStorage("iminfo",(userinfo)=>{
                        userinfo=JSON.parse(userinfo);
                        if(userinfo&&userinfo.token==token){
                            this.loginIM(userinfo.IMaccount);
                            Tools.setStorage("isIMLogin","true")   
                        }else{    
                           Tools.setStorage("isIMLogin","false")                     
                           Tools.removeStorage("iminfo");
                        } 
                        if(callback){
	                    	callback(-1);
	                    }                       
                    })                                      
                 }
             },(err)=>{
             	if(callback){
                   callback(-1);
                } 
                this.clearuserInfo();
            })      
    },
	 autoLogin:function(imInfoUrl,loginUrl){
	 	this.getLocation((location)=>{
	 		var city="";
	        var county="";
	        var province="";
            if (Tools.isDataValid(location)) {
                province = Tools.isDataValid(location.province)?location.province:"";
                city = Tools.isDataValid(location.city)?location.city:"";
                county = Tools.isDataValid(location.district)?location.district:"";
            };
			this.getPushToken((ixtoken,xgtoken)=>{
	        	Tools.getToken((token)=>{	 			 		
		            if(token&&token!="guest"){
		            	this.getAppVersion((ver)=>{
				            var PostData ={
				            	data:{
				                    application:"Chaoge",
				                    xgtoken:xgtoken,
				                    ixtoken:ixtoken,
				                    phone:"",
				                    pwd:"",
				                    ver:Platform.OS+"_"+ver,
				                    province:encodeURIComponent(province),
				                    city:encodeURIComponent(city),
				                    county:encodeURIComponent(county),
				            	}
				      		}	
				      		console.log("===autologinUrl==="+loginUrl+"/token/"+token)
				      		Tools.post(loginUrl+"/token/"+token,PostData,(resData)=>{
								Tools.setStorage("token",resData.token);
								this.autoLoginIM(imInfoUrl,resData.token);
					 		},(err)=>{
					 			Toast.show(err);
					 			this.clearuserInfo();	
					 		})
				        })
		            			
		            }else{
		            	this.clearuserInfo();
		            }	 		
			 	})
	 		})     		
  		})	 	
	 },
	/**
	启动寻星
	*/
	startSatellite: function() {
		PluginList.startSatellite();
	},

	/*
	获取位置信息  
	返回例：{ district: '郫县', city: '成都市', province: '四川省' }
	*/
	getLocation: function(callback) {
		try{
			var result=null;
			if(Platform.OS=='ios'){
				PluginList.getLocation((location)=>{
					result=location;
					callback(location)
				});
			}else{
				PluginList.getLocalStorage("location",(location)=>{
					
					if(location&&Tools.isDataValid(eval("("+location+")").city)){	
						location=eval("("+location+")")
						result=location;
						if(callback!=null){
							callback(location)
							callback=null;
						}										
					}else{
						PluginList.getLocation(true,(local)=>{
							result=local;
							if(callback!=null){
								callback(local)
								callback=null;
							}
						});
					}
				})
				var timer =setTimeout(()=>{
					if(!Tools.isDataValid(result)&&callback!=null){
						callback("")	
						callback=null			
					}	
					timer&&clearTimeout(timer)				
				},6000) 
			}
		}catch(e){
			
		}
		//getLocalStorage	
	},
	startLocation:function(){
		if(Platform.OS=='ios'){
			return;
		}
		PluginList.startLocation();
	},
	//Android端sharedPreference 存储
	getLocalStorage:function(key,callback) {
		if(Platform.OS=='ios'){
			Tools.getStorage(key,callback)
			return;
		}
		PluginList.getLocalStorage(key,callback)
	},
	//Android端sharedPreference 存储
	setLocalStorage:function(key,value){
		if(Platform.OS=='ios'){
			Tools.setStorage(key,value)
			return;
		}
		PluginList.setLocalStorage(key,value)
	},
	getStatusBarHeight:function(callback){
		if(Platform.OS=='ios'){
			return;
		}
		PluginList.getStatusBarHeight(callback)
	},
	startBarCode: function(successCallback) {	
        PluginList.startBarCode(successCallback);
	},
	
	/*
	检查是否安装微信、QQ
	由于苹果审核政策需求，建议对未安装客户端平台进行隐藏
	*/
	checkQQAndWechatInstalled: function(callback) {
		PluginList.checkQQAndWechatInstalled(callback);
	},
	/*
	分享插件
	 type:QQ、Qzone、WechatSession、WechatTimeline
	*/
	shareSNS: function(type, content, url, image) {
		if(!image){
			image="";
		}
		if(!url){
			url=""
		}
		PluginList.shareSNS(type, content, image, url);
	},
	/**
 	*  支付宝支付
 	*  param:服务器签名字符串（data）
 	*  callback:回调函数
 	*/
	orderToAlipay: function(param, successCallback,errorCallback) {
		PluginList.orderToAlipay(param, successCallback,errorCallback);
	},	
	/**
 	*  微信支付
 	*
 	*  param:服务器签名字符串（data）
 	*  callback:回调函数 0-成功,-1-失败,-2取消
	 */
	orderToWechat: function(param, successCallback,errorCallback) {
		try{
			PluginList.orderToWechat(param, successCallback,errorCallback);
		}catch(e){

		}
	},
	
	//0b1fa30e0b1cb2f69da5a1bd8a0512cf
	/**
 	*  云旺-用户登陆
	*/
	loginIM: function(param) {
		PluginList.loginIM(param);

	},
	/**
 	*  云旺-退出登陆
	*/
	logoutIM: function() {
		PluginList.logoutIM();
	},
	/**
 	*  云旺-打开客服聊天
	*/
	openIM: function() {
		this.checkIMLogin(()=>{
			PluginList.openIM();
		})		
	},
	/*
	*单聊，参数：对方的imID
	*/
	openIMChat:function(userIMId){
		this.checkIMLogin(()=>{
			PluginList.openIMChat(userIMId)
		})
	},
	/*
	*群组
	*/
	toGetTribes:function(){
		this.checkIMLogin(()=>{
			PluginList.toGetTribes()
		})			
	},
	/**
	*添加好友
	*/
	addFriend:function(mUserId,mRemarkName,mMsg,successCallback){
		if (mMsg==null) {
       		mMsg="";
       	};
		this.checkIMLogin(()=>{
			PluginList.addFriend(mUserId,mRemarkName,mMsg,successCallback)
		})         
	},
	/**
	*获取好友
	*/
	getFriends:function(successCallback){
		PluginList.getFriends(successCallback);
	},
	/**
	*打开最近会话列表，系统消息
	*/
	toConversationList:function(){
		this.checkIMLogin(()=>{
			PluginList.toConversationList();
		})	
	},
	/**
	*删除好友
	*/
	delFriend:function(muserId,callback){
		PluginList.delFriend(muserId,callback);
	},
	/**
	*加入黑名单
	*/
	addBlack:function(muserId,successcallback){
		PluginList.removeInBlack(muserId,successcallback);
	},
	/**
	*移除黑名单
	*/
	removeBlack:function(muserId,callback){
		PluginList.removeOutBlack(muserId,callback);		
	},
	/**
	*是否在黑名单
	*/
	isInBlack:function(muserId,callback){
		PluginList.isInBlack(muserId,callback);
	},
	/**
	*黑名单
	*/
	toBlackList:function(){
		PluginList.toBlackList();
	},
	/**
	*加修改备注
	*/
	remarkName:function(muserId,name,callback){
		PluginList.changeRemark(muserId,name,callback);		
	},

	/**
 	*  信鸽
	*/
	getPush:function(successCallback){
	   PluginList.getPush(successCallback);	
	},
	getPushToken:function(successCallback){
		if(Platform.OS=='ios'){
			PluginList.getPushToken((token)=>{
				successCallback(token,token)
			})
		}else{
			PluginList.getPushToken(successCallback)
		}
	},
	/**
 	*  三代机http请求借口
	*/
	httpRequest:function(map,callback,errorCallback){
		if(Platform.OS=="ios"){
			PluginList.SDJ_HttpRequest(map,callback,errorCallback)
		}else{
			PluginList.SDJ_HttpRequest(map,(res)=>{
				if(res&&res.code<0){
					if(errorCallback&& typeof errorCallback==="function"){
						errorCallback(res.msg?res.msg:"请求失败")
					}
				}else{
					if(callback&& typeof callback==="function"){
						callback(res)
					}
				}
			},()=>{})
		}
	},
	/**
 	*  保存或复制文本
	*/
	saveTXT:function(type,result,successCallback,errorCallback){
		PluginList.saveTXT(type,result,successCallback,errorCallback);
	},
	/*
 	*  获取联系人
	*/
	getContact:function(successCallback,errorCallback){
	   PluginList.getContact(successCallback,errorCallback);	
	},
	/*
 	*  获取Document目录
	*/
	getDirectoryPaths:function(successCallback){
	   PluginList.getDirectoryPaths(successCallback);	
	},
	/**
	*获取软件版本号
	*/
	getAppVersion:function(successCallback){
		PluginList.getVersion(successCallback)
	},

		/**
	 *  跳转到某页面统计
	 *  name(string)：页面名称
	 */
	  beginLogPageView: function(name) {
	  	PluginList.beginLogPageView(name);
	  },

	/**
	 *  离开某页面统计
	 *  name(string)：页面名称
	 */
	  endLogPageView: function(name) {
	  	PluginList.endLogPageView(name);
	  },

	/**
	 *  友盟在统计用户时以设备为标准，如果需要统计应用自身的账号，请使用以下接口
	 *  puid(string)：用户账号ID.长度小于64字节
	 */
	  // profileSignInWithPUID: function(provider, puid) {
	  //   PluginList.profileSignInWithPUID(provider, puid);
	  // },

	  /**
	 *  友盟在统计用户时以设备为标准，如果需要统计应用自身的账号，请使用以下接口
	 *  puid(string)：用户账号ID.长度小于64字节
	 */
	  profileSignInWithPUID: function(puid) {
	    PluginList.profileSignInWithPUID(puid);
	  },

	/**
	 *  是否进入background模式。 对于支持backgound模式的APP，SDK可以确保在进入后台时，完成对日志的持久化工作，保证数据的完整性。
	 *  value(boolean)：是否进入background模式（默认YES）
	 */
	  // setBackgroundTaskEnabled: function(value) {
	  // 	PluginList.setBackgroundTaskEnabled(value);
	  // },

	/**
	 *  统计事件发生次数
	 *  eventId(string)：为当前统计的事件ID
	 */
	  eventCount: function(name) {
	  	PluginList.eventCount(name);
	  },

	/**
	 *  统计点击行为各属性被触发的次数
	 *  eventId(string)：为当前统计的事件ID
	 *  attributes(map<String:String>)：为当前事件的属性和取值（键值对），不能为空。
	 
	 示例：统计电商应用中“购买”事件发生的次数，以及购买的商品类型及数量，那么在购买的函数里调用：
	 var map = {"type" : "book", "quantity" : "3"};
	 */
	  eventCountWithAttributes: function(name, attributes) {
	  	PluginList.eventCountWithAttributes(name, attributes);
	  },

	/**
	 *  统计数值型变量的值的分布
	 *  eventId(string)：为当前统计的事件ID
	 *  attributes(map<String:String>)：为当前事件的属性和取值（键值对），不能为空。
	 *  counter(number)：统计一个数值类型的连续变量（该变量必须为整数），用户每次触发的数值的分布情况，如事件持续时间、每次付款金额等
	 
	 示例：购买《Swift Fundamentals》这本书，花了110元
	 IOSMobClick.eventCountWithAttributesAndCounter("pay", {"book" : "Swift Fundamentals"}, 110);
	 */
	  eventCountWithAttributesAndCounter: function(name, attributes, counter) {
	  	PluginList.eventCountWithAttributesAndCounter(name, attributes, counter);
	  },

	  /**
	  *  Android独有接口
	  *  手动检查应用是否有升级
	  */
	  forceUpdate: function(){
	  	if(Platform.OS=='ios'){
	  		return;
	  	}
	    PluginList.forceUpdate();
	  },
	/*
 	*  获取二维码图片
	*/
	getPhotoScan:function(successCallback,errorCallback){
	   PluginList.getPhotoScan(successCallback,errorCallback);	
	},
	/*
 	*  货运物流-城市选择
	*/
	getCity:function(CallBack){
		this.getLocation((location)=>{
			var city=location&&Tools.isDataValid(location.city)?location.city:"成都";
			if(city.indexOf("市")==city.length-1){
				city=city.replace("市","")
			}
			if(Platform.OS=='ios'){
				PluginList.getCity(CallBack);
		  		return;
		  	}
	  		CityChoose.getCity(city,CallBack)
	  	})
	}

});

module.exports = AppPlugin;

