
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
    WebView,
    StatusBar,
    Linking
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import Publish from './publish';
import JiGouIntru from './jigouIntru';
const nav = require('../../resources/home/home_nav.png');
const back = require('../../resources/login/nav_back@2x.png');
const common_more = require('../../resources/home/common_more@2x.png');
const jigouIntru = require('../../resources/home/agency_introduce@2x.png');
const online = require('../../resources/home/agency_discussOnline@2x.png');
const likeIcon = require('../../resources/home/postList_likeIcon@2x.png');
const replyIco = require('../../resources/home/postList_replyIcon@2x.png');

export default class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){

    }

    _back(){
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.pop() 
        }
    }

    call(){
        Linking.canOpenURL('tel:18202853094').then(supported => {
            if (!supported) {
                alert('该设备不支持拨打电话')
            } else {
                return Linking.openURL('tel:18202853094')
            }
        }).catch(err => console.error('An error occurred', err));
    }

    send(){
        alert('发消息')
    }

    baoban(){
        alert('报班')
    }

    publish(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'publish',
                component: Publish
            })
        }
    }

    jigouIntru(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'jigouIntru',
                component: JiGouIntru
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
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <Image source={back} style={{width:30, height:30, marginLeft:10}} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:20, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>{this.props.title}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('分享')}}>
                    	<Image source={common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <View style={{width:screenWidth, height:screenHeight-64-47}}>
                    <ScrollView>
                        <View style={{flexDirection:'row', backgroundColor:'#FFF', borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:15}}>
                            <Image source={nav} style={{width:85, height:70, marginTop:15, marginLeft:10}}/>
                            <View style={styles.recommendCell}>
                                <View>
                                    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{fontSize:18}}>EF音符教育青少儿英语（优品道中心）</Text>
                                    </View>
                                    <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>成都市青羊区99号UI为hi武汉覅乌尔禾</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.jigouIntru}>
                            <View style={{alignItems:'center', marginLeft:18}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.jigouIntru()} style={{alignItems:'center'}}>
                                    <Image source={jigouIntru} style={{width:30, height:30, marginBottom:6}}/>
                                    <Text style={{color:'#9B9B9B', fontSize:13}}>机构介绍</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems:'center', marginLeft:30}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('在线讨论')} style={{alignItems:'center'}}>
                                    <Image source={online} style={{width:30, height:30, marginBottom:6}}/>
                                    <Text style={{color:'#9B9B9B', fontSize:13}}>在线讨论</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.jiazhang}>
                            <Text style={{fontSize:14, color:'#989898'}}>家长讨论</Text>
                            <Text onPress={()=>alert('机构圈子')} style={{fontSize:14, color:'#19BCAD'}}>机构圈子>></Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('帖子详情')} style={styles.cell}>
                            <View style={{flex:1, backgroundColor:'#FFF',height:40,flexDirection:'row', justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={nav} style={{width:40, height:40, borderRadius:20}} />
                                    <View style={{marginLeft:10, marginTop:3, marginBottom:3, justifyContent:'space-between',height:34}}>
                                        <Text style={{color:'#FAB665', fontSize:14}}>EF音符教育青少儿英语(优品道中心)</Text>
                                        <Text style={{color:'#A5A5A5', fontSize:12}}>四年级家长</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={replyIco} style={{width:14, height:14}} />
                                    <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>10</Text>
                                    <Image source={likeIcon} style={{width:14, height:14, marginLeft:10}} />
                                    <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>8</Text>
                                </View>
                            </View>
                            <Text style={{fontSize:16, marginLeft:5, marginRight:5, marginTop:10}} numberOfLines={2}>欢迎关注我们</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.bottomBar}>
                    <Image source={nav} style={{width:38, height:38, marginLeft:8, borderRadius:19}} />
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.publish()} style={styles.touch}>
                        <Text style={styles.bottomText}>对于这个机构，您有什么想了解的吗？</Text>
                    </TouchableOpacity>
                </View>
            </View>
          )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
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
        borderBottomColor:'#E8E8E8',
        flexDirection:'row',
    },
    bottomBar:{
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor:'#FFF', 
        borderTopWidth:1, 
        borderTopColor:'#E8E8E8',
        width:screenWidth, 
        height:47, 
        position:'absolute', 
        bottom:0
    },
    baoban:{
        width:88, 
        height:34, 
        backgroundColor:'#33BAAB', 
        borderRadius:3, 
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
    price:{
        width:screenWidth, 
        height:60, 
        paddingLeft:10, 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:10,
        backgroundColor:'#FFF'
    },
    liucheng:{
        backgroundColor:'#FFF',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        flexDirection:'row',
        padding:10
    },
    jigouInfo:{
        marginTop:15, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        height:35, 
        backgroundColor:'#FFF', 
        alignItems:'center', 
        justifyContent:'space-between',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10
    },
    location:{
        width:screenWidth, 
        padding:10, 
        backgroundColor:'#FFF', 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8'
    },
    kechengInfo:{
        paddingLeft:10, 
        borderBottomWidth:1, 
        paddingTop:10, 
        borderBottomColor:'#E8E8E8',
        backgroundColor:'#FFF'
    },
    bottomText:{
        color:'#C0C0C0',
        fontSize:14,
    },
    touch:{
        marginLeft:8,
        marginRight:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#C0C0C0',
        flex:1,
        paddingLeft:8,
        paddingTop:8,
        height:33,
    },
    recommendCell:{
        flex:1, 
        marginLeft:10, 
        marginTop:15, 
        marginRight:10, 
        justifyContent:'space-between'
    },
    jigouIntru:{
        height:80, 
        flexDirection:'row', 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        backgroundColor:'#FFF', 
        alignItems:'center'
    },
    jiazhang:{
        marginTop:15, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        height:35, 
        backgroundColor:'#FFF', 
        alignItems:'center', 
        justifyContent:'space-between',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10
    },
    cell:{
        backgroundColor:'#FFF',
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        justifyContent:'space-between',
    }
});















