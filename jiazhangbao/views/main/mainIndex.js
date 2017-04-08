/**
 * 配置路由
 */

'use strict';

import React,{Component} from 'react';
import {
    Navigator,
    View,
    Platform,
    StatusBar,
    Animated,
    Keyboard
} from 'react-native';

import {push,cgRoute} from '../constStr'
import PluginList from '../plugins/PluginList'
import Popup from '../component/PopUp';
import Toast from '../tools/Toast'
import Tools from '../tools'

import TabMain from './tabBarMain';
import Publish from '../home/publish'; // 发布帖子
import JiGouIntru from '../home/jigouIntru'; // 机构介绍
import NewsDetail from '../recomNews/newsDetail'; // 推荐新闻详情界面
import ChatOnline from '../home/chatOnlineInfo'; // 
import BaiduMap from '../home/BaiduMap'; // 
import GuanLi from '../home/jigouguanli'; // 
import JiuCuo from '../home/jiucuo'; // 
import SearchResult from '../home/search_result'; // 
import Register from '../login/register'; // 
import Yonghu from '../login/yonghu'; // 
import Yzm from '../login/yzm'; // 
import JiaZhang from './jiazhang'; // 
import Login from '../login/login_index'; // 
import Search from '../home/search'; // 
import SysMsg from '../home/sysMsg'; // 
import UserInfo from '../user/userInfo'; // 
import Org from '../home/organization'; // 
import JiaoYu from '../home/jiaoyu_jiazhang'; // 
import CourseDetail from '../home/courseDetails'; // 
import JigouInfo from '../home/jigouInfo'; // 
import HomeJiazhangquan from '../home/home_jiazhangquan'; // 
import ChatGroupInfo from '../parents/cahtGroupInfo'; // 
import Setting from '../wode/setting';


var _navigator,_route;
var _this;
var nowTab=0;
export default class MainIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardSpace:new Animated.Value(0),
            initialRoute:{name: 'tabmain', param: {index: 0, topIndex: 0}},
            isRestore:false
        }
        _this = this;
    }

    RouteMapper(route, navigator, onComponentRef) {
        var Component = TabMain;
        var chara = "";//用于友盟统计
        _navigator = navigator;
        console.log("route.name:"+route.name);        
        switch (route.name) {
            case 'tabmain':
                Component = TabMain;
                break;
            case "publish":
                Component=Publish;
                break;
            case "jigouintru":
                Component=JiGouIntru;
                break;
            case "newsdetail":
                Component=NewsDetail;
                break;
            case "chatonline":
                Component=ChatOnline;
                break;
            case "baidumap":
                Component=BaiduMap;
                break;
            case "guanli":
                Component=GuanLi;
                break;
            case "jiucuo":
                Component=JiuCuo;
                break;
            case "searchresult":
                Component=SearchResult;
                break;
            case "register":
                Component=Register;
                break;
            case "yonghu":
                Component=Yonghu
                break;
            case "yzm":
                Component=Yzm;
                break;
            case "jiazhang":
                Component=JiaZhang;
                break;
            case "login":
                Component=Login;
                break;
            case "search":
                Component=Search;
                break;
            case "sysmsg":
                Component=SysMsg;
                break;
            case "userinfo":
                Component=UserInfo;
                break;
            case "org":
                Component=Org;
                break;
            case "jiaoyu":
                Component=JiaoYu;
                break;
            case "coursedetail":
                Component=CourseDetail;
                break;
            case "jigouinfo":
                Component=JigouInfo;
                break;
            case "homejiazhangquan":
                Component=HomeJiazhangquan;
                break;
            case "chatgroupinfo":
                Component=ChatGroupInfo;
                break;
            case "setting":
                Component=Setting;
                break;

                
            default: //default view
                Component = TabMain;
                route.name='tabmain'
                break;
        }
        _route=route;
        return <Component route={route} navigator={navigator} param={route.param} saveNowTab={(index)=>nowTab =index}/>
        
    }

    configureScene(route) {
        //FloatFromRight FadeAndroid
        if(Platform.OS === 'android'){
            return Object.assign({},Navigator.SceneConfigs.HorizontalSwipeJump,{
              gestures:{
                jumpBack:null,
                jumpForward:null
              }
            });
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }

    componentDidMount() {
        var i=0;
        Tools.getRoute((routeData)=>{
            if(routeData&&routeData.route){
                cgRoute.route=routeData.route;
                cgRoute.navigat=routeData.navigat  
                cgRoute.isRestore=true;       
                this.setState({
                    initialRoute:routeData.route,
                    isRestore:true
                })
               // RCTDeviceEventEmitter.emit('StateRestore', true);
                Tools.clearRoute();
            }
        })
        PluginList.initPush(); 
    }
    
    render() {
        //cgRoute.navigat.push(this.state.initialRoute)
        if(this.state.isRestore&&_navigator!=null){
            //重启应用时，重置路由栈
            _navigator.immediatelyResetRouteStack(cgRoute.navigat)
        }
        //初始路由场景是Me,索引值为0,根据用户操作依次入栈，出栈
            return (
                <View style={{flex:1}}>
                    <Navigator
                        key="1"
                        style={{flex:1,flexDirection:'column'}}   
                        initialRoute={this.state.initialRoute}             
                        configureScene={this.configureScene}
                        renderScene={this.RouteMapper}/>
                        <Popup ref={(popup) => { this.popup = popup}}/>
                        <StatusBar backgroundColor={"#000"} barStyle="light-content" hidden={false}/>
                        <Animated.View style={{paddingBottom:this.state.keyboardSpace}}/>
                </View>
            )

    }

}




















