/**
 * Created by Administrator on 16-3-10.
 * 定义全局变量,常量
 */
import React from 'react';
import {
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';
var  navheight=(Platform.OS === 'android') ? 45 : 64;
var  screenWidth=Dimensions.get('window').width;
var  screenHeight=Dimensions.get('window').height;
var pixe=PixelRatio.get()
var MainTabHeight =48;
var navbackground="#353232";
var lineColor="#ededed"

//保存当前的route名字
var push={
	routeName:"tabmain",
	typelabel:""
}
var cgRoute={
	route:{name: 'tabmain', param: {index: 0, topIndex: 0}},
	navigat:[{name: 'tabmain', param: {index: 0, topIndex: 0}}],
	isRestore:false
}

var BimgURL = 'http://og2lz4ktk.bkt.clouddn.com/';
var LimgURL = '?imageView2/1/';

var Size=function(font){
	if(pixe<=2){
		return font;
	}else{
		return parseInt(font-(pixe-2)*2);
	}
}

let IPAddr = "http://192.168.0.104";
//let IPAddr = "http://172.27.35.1";

const isDebug=true;
if(!isDebug){
	console.log=function(text){}
}

const JZBImages = {
	nav:require('../resources/home/home_nav.png'),
	back:require('../resources/login/nav_back@2x.png'),
	common_more:require('../resources/home/common_more@2x.png'),
	jigouIntru:require('../resources/home/agency_introduce@2x.png'),
	online:require('../resources/home/agency_discussOnline@2x.png'),
	likeIcon:require('../resources/home/postList_likeIcon@2x.png'),
	replyIco:require('../resources/home/postList_replyIcon@2x.png'),
	common_mes:require('../resources/home/common_mes@2x.png'),
	common_getinNor:require('../resources/home/common_getinNor@2x.png'),
	common_phone :require('../resources/home/common_phone@2x.png'),
	jigou:require('../resources/home/class_pay_success@2x.png'),
	youhui:require('../resources/home/agency_tag_youhui@2x.png'),
	zhifu:require('../resources/home/agency_tag_zhifu@2x.png'),
	money:require('../resources/home/agency_tag_jigou@2x.png'),
	location:require('../resources/home/location@2x.png'),
	default_holder:require('../resources/home/default_holder.png'),
	showMoreNor:require('../resources/home/main_showMoreNor@2x.png'),
	search:require('../resources/home/lxr_icon_search@2x.png'),
	search_history:require('../resources/home/search_history@2x.png'),
	search_clearHistory:require('../resources/home/search_clearHistory@2x.png'),
	options:require('../resources/home/options_pointer@2x.png'),
	edite:require('../resources/home/main_articles_edit@2x.png'),
	focus_off:require('../resources/home/circleList_focus_off@2x.png'),
	focus_on:require('../resources/home/circleList_focus_on@2x.png'),
	fabu:require('../resources/home/fabu.png'),
	chose:require('../resources/user/common_getin@2x.png'),
	phone:require('../resources/home/agency_phone@2x.png'),
	showMore:require('../resources/home/common_getin@2x.png'),
	addImage:require('../resources/home/sendPost_add@2x.png'),
	cancel:require('../resources/login/login_cancel@2x.png'),
	pwd:require('../resources/login/login_psw@2x.png'),
	wx:require('../resources/login/share_weixin.png'),
	qq:require('../resources/login/share_qq.png'),
	wb:require('../resources/login/share_sina.png'),
	nicheng:require('../resources/login/login_user@2x.png'),
	login_phone:require('../resources/login/login_phone@2x.png'),	
	msg:require('../resources/home/main_mes@2x.png'),
	userBg:require('../resources/home/home_userbg.png'),
	userIcon:require('../resources/home/default_user.png'),
	youeryuan:require('../resources/home/main_youeryuan@2x.png'),
	xiaoxue:require('../resources/home/main_xiaoxue@2x.png'),
	peixunban:require('../resources/home/main_peixun@2x.png'),
	tuoguanban:require('../resources/home/main_tuoguan@2x.png'),
	jiaoyu:require('../resources/home/main_edu@2x.png'),
	zhishi:require('../resources/home/main_zhishi@2x.png'),
	jiazhangquan:require('../resources/home/main_jzq@2x.png'),
	taolun:require('../resources/home/main_taolun@2x.png'),
	HomeIcon:require('../resources/Main/tab_home@2x.png'),
	HomeIcon_sel:require('../resources/Main/tab_home-on@2x.png'),
	JZIcon:require('../resources/Main/tab_user-group@2x.png'),
	JZIcon_sel:require('../resources/Main/tab_user-group-on@2x.png'),
	BBIcong:require('../resources/Main/tab_graduation@2x.png'),
	BBIcon_sel:require('../resources/Main/tab_graduation-on@2x.png'),
	WDIcon:require('../resources/Main/tab_user@2x.png'),
	WDIcon_sel:require('../resources/Main/tab_user-on@2x.png'),
	gc_beauty_v1:require('../resources/wode/gc_beauty_v1.png'),
	gc_beauty_v2:require('../resources/wode/gc_beauty_v2.png'),
	gc_beauty_v3:require('../resources/wode/gc_beauty_v3.png'),
	gc_beauty_v4:require('../resources/wode/gc_beauty_v4.png'),
	gc_beauty_v5:require('../resources/wode/gc_beauty_v5.png'),
	gc_beauty_v6:require('../resources/wode/gc_beauty_v6.png'),
	gc_beauty_v7:require('../resources/wode/gc_beauty_v7.png'),
	gc_beauty_v8:require('../resources/wode/gc_beauty_v8.png'),
	gc_beauty_v9:require('../resources/wode/gc_beauty_v9.png'),
	gc_beauty_v10:require('../resources/wode/gc_beauty_v10.png'),
	gc_beauty_v12:require('../resources/wode/gc_beauty_v12.png'),
	gc_beauty_v13:require('../resources/wode/gc_beauty_v13.png'),
	gc_beauty_v14:require('../resources/wode/gc_beauty_v14.png'),
	gc_beauty_v15:require('../resources/wode/gc_beauty_v15.png'),
	user_follow:require('../resources/wode/user_follow.png'),
	user_friend:require('../resources/wode/user_friend.png'),
	user_post:require('../resources/wode/user_post.png'),
	user_setting:require('../resources/wode/user_setting.png'),
	user_store:require('../resources/wode/user_store.png'),
	user_take_class:require('../resources/wode/user_take_class.png'),
}


module.exports ={Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,push,cgRoute,IPAddr,BimgURL,LimgURL}
















