
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import JiaZhang from './jiazhang';
import Login from '../login/login_index';
import LoadingShow  from '../component/react-native-loading';
import NewsDetail from '../recomNews/newsDetail';
import Search from '../home/search.js';
import SysMsg from '../home/sysMsg.js';
import UserInfo from '../user/userInfo';
import Org from '../home/organization';
import JIAOYU from '../home/jiaoyu_jiazhang.js';
import JIAZHANGQUAN from '../home/jiazhangquan.js';
import CourseDetail from '../home/courseDetails';
import JigouInfo from '../home/jigouInfo';

const nav = require('../../resources/home/home_nav.png');
const search = require('../../resources/home/search@2x.png');
const msg = require('../../resources/home/main_mes@2x.png');
const userBg = require('../../resources/home/home_userbg.png');
const userIcon = require('../../resources/home/default_user.png');
const youeryuan = require('../../resources/home/main_youeryuan@2x.png');
const xiaoxue = require('../../resources/home/main_xiaoxue@2x.png');
const peixunban = require('../../resources/home/main_peixun@2x.png');
const tuoguanban = require('../../resources/home/main_tuoguan@2x.png');
const jiaoyu = require('../../resources/home/main_edu@2x.png');
const zhishi = require('../../resources/home/main_zhishi@2x.png');
const jiazhangquan = require('../../resources/home/main_jzq@2x.png');
const taolun = require('../../resources/home/main_taolun@2x.png');
const location = require('../../resources/home/location@2x.png');

var NativeTools = NativeModules.NativeTools;
var phonenum= '15680222613';

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
            network:true,
            isLogin:true
		}
	}
    componentDidMount(){
        // 获取用户数据
        NativeTools.getUserInfo(phonenum,(error, events) => {
            if (events[0] == '获取用户失败') {
                    Toast.show("获取用户失败", 2000)
                } else {
                    this.setState({username:events[0],
                                   userIcon:events[1]
                                   })
                }       
        });
        // 获取推荐新闻
        NativeTools.getRecomNews((error, events) => {
            if (events[0] == '获取推荐新闻失败') {
                Toast.show("获取推荐新闻失败", 2000)
            } else {
                this.setState({events:events})
            }   
        });
    }

    pressUserIcon() {
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'denglu',
                    component:this.state.isLogin?UserInfo:Login,
                })
            }
    }

    _search(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'search',
                component: Search,
            })
        }
    }

    _showMsg(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'sysmsg',
                component: SysMsg,
            })
        }
    }

    pressOrg(TITLE, INDEX){
        var com = JIAOYU;
        if (INDEX == 7) {com=JIAZHANGQUAN}
        if (INDEX == 8) {return}
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'org',
                component: INDEX<=4?Org:com,
                params:{
                    TITLE:TITLE
                }
            })
        }
    }

    _renderNav(){
        return(
            <View>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                    animated={true} />
                <View style={{width:screenWidth, height:64}}>
                    <Image source={nav} style={styles.nav} resizeMode={Image.resizeMode.stretch}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._search()}}>
                            <Image source={search} style={{width:30, height:30, marginRight:30}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._showMsg()}}>
                            <Image source={msg} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                    </Image>
                </View>
            </View>
        )
    }

    _renderCell(ICON, TITLE, INDEX){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressOrg(TITLE, INDEX)} style={{width:screenWidth, flex:1, justifyContent:'center', alignItems:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Image source={ICON} style={{width:50, height:50, borderRadius:25, marginBottom:10}}/>
                    <Text style={{fontSize:16}}>{TITLE}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderHeader(){
        return(
            <View style={{backgroundColor:"#FFF", paddingBottom:10}}>
                <Image source={userBg} style={{width:screenWidth, height:140, alignItems:'center'}} resizeMode={Image.resizeMode.stretch}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.pressUserIcon()}}>
                        <Image source={this.state.userIcon?{uri: this.state.userIcon}:userIcon} style={{width:80, height:80, borderRadius:40, marginTop:10}}/>
                        <Text style={styles.login} >{this.state.username?this.state.username:'登录/注册'}</Text>
                    </TouchableOpacity>
                </Image>
                <View style={{width:screenWidth, height:180}}>
                    <View style={{width:screenWidth, flex:1, flexDirection:'row'}}>
                        {this._renderCell(youeryuan,'幼儿园',1)}
                        {this._renderCell(xiaoxue,'小学',2)}
                        {this._renderCell(peixunban,'培训班',3)}
                        {this._renderCell(tuoguanban,'托管班',4)}
                    </View>
                    <View style={{width:screenWidth, flex:1, flexDirection:'row'}}>
                        {this._renderCell(jiaoyu,'教育升学',5)}
                        {this._renderCell(zhishi,'家长知识',6)}
                        {this._renderCell(jiazhangquan,'家长圈',7)}
                        {this._renderCell(taolun,'热门讨论',8)}
                    </View>
                </View>
            </View>
        )
    }

    _goToNewsDetail(TITLE, URL) {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'newsDetail',
                component: NewsDetail,
                params: {
                    title:TITLE,
                    url:URL
                }
            })
        }
    }

    goToCourseDetails(PRICE){
        var TITLE = '';
        if (PRICE) {
            TITLE = "课程详情";
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'courseDetail',
                    component: CourseDetail,
                    params: {
                        title:TITLE,
                    }
                })
            }
        }else{
            TITLE = "机构信息";
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'jigouInfo',
                    component: JigouInfo,
                    params: {
                        title:TITLE,
                    }
                })
            }
        }
        

        
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

    _renderRecommendCell(IMG, TITLE, SUBTITLE, PRICE, DISTANCE){
        return(
            <View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.goToCourseDetails(PRICE)}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={IMG} style={{width:85, height:70, marginTop:15, marginLeft:10}}/>
                        <View style={styles.recommendCell}>
                            <View>
                                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                    <Text style={{fontSize:18}}>{TITLE}</Text>
                                    <Text style={{fontSize:18, color:'#F87B00'}}>{PRICE}</Text>
                                </View>
                                <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>{SUBTITLE}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Image source={location} style={{width:8, height:12}}/>
                                <Text style={{fontSize:13, color:'#9B9B9B'}}> {DISTANCE}km</Text>
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
                    <Text style={{color:'#272822'}} onPress={()=>{alert('点击加载')}}>点击加载</Text>
                </View>
            )
        }
        return(
            <View style={{backgroundColor:'#FFF', marginTop:20}}>
                <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                {this._renderBodyCell(this.state.events?this.state.events[0].icon:'', this.state.events?this.state.events[0].typeName:'', '#E8E8E8', this.state.events?this.state.events[0].title:'', this.state.events?this.state.events[0].pageUrl:'')}
                {this._renderBodyCell(this.state.events?this.state.events[1].icon:'', this.state.events?this.state.events[1].typeName:'', '#E8E8E8', this.state.events?this.state.events[1].title:'', this.state.events?this.state.events[1].pageUrl:'')}
                {this._renderBodyCell(this.state.events?this.state.events[2].icon:'', this.state.events?this.state.events[2].typeName:'', '#E8E8E8', this.state.events?this.state.events[2].title:'', this.state.events?this.state.events[2].pageUrl:'')}
                {this._renderBodyCell(this.state.events?this.state.events[3].icon:'', this.state.events?this.state.events[3].typeName:'', '#FFF', this.state.events?this.state.events[3].title:'', this.state.events?this.state.events[3].pageUrl:'')}
                <View style={{height:1, width:screenWidth, backgroundColor:'#E8E8E8'}}/>
                <View style={{width:screenWidth, height:15, backgroundColor:'#F5F5F5'}}/>
                {this._renderRecommendHeader('推荐课程')}
                {this._renderRecommendCell(nav, '钢琴度套餐', '星萌艺校', '¥ 39', '1.54')}
                {this._renderRecommendCell(nav, '钢琴季度冷洪林餐', '星萌艺校', '¥ 19', '1.54')}
                {this._renderRecommendCell(nav, '钢玩到无餐', '星萌艺校', '¥ 229', '1.54')}
                {this._renderRecommendCell(nav, '分瓦达季度套餐', '星萌艺校', '¥ 34', '1.54')}
                <View style={{width:screenWidth, height:15, backgroundColor:'#F5F5F5'}}/>
                {this._renderRecommendHeader('推荐机构')}
                {this._renderRecommendCell(nav, '钢威锋网无法季度套餐', '星萌艺校', '', '1.54')}
                {this._renderRecommendCell(nav, '钢企鹅王发季度套餐', '星萌艺校', '', '1.54')}
                {this._renderRecommendCell(nav, '钢琴培驱蚊器翁', '星萌艺校', '', '1.54')}
                {this._renderRecommendCell(nav, '钢请问我去餐', '星萌艺校', '', '1.54')}
                <View style={{width:screenWidth, height:15, backgroundColor:'#F5F5F5'}}/>
            </View>
        )
    }

	render(){
		return(
			<View style={styles.container}>
                {this._renderNav()}
                <ScrollView>
                    {this._renderHeader()}
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
        fontSize:18
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























