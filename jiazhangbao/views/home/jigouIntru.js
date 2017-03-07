
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
import BaiduMapDemo from './BaiduMapDemo';

const nav = require('../../resources/home/home_nav.png');
const back = require('../../resources/login/nav_back@2x.png');
const common_more = require('../../resources/home/common_more@2x.png');
const chose = require('../../resources/user/common_getin@2x.png');
const location = require('../../resources/home/agency_location@2x.png');
const phone = require('../../resources/home/agency_phone@2x.png');
const showMore = require('../../resources/home/common_getin@2x.png');
const showMoreNor = require('../../resources/home/common_getinNor@2x.png');



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

    gotoLocation(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'baiduMapDemo',
                component: BaiduMapDemo
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
                    <Text numberOfLines={1} style={styles.title}>机构介绍</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('分享')}}>
                    	<Image source={common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.school}>
                        <Image source={nav} style={{width:90, height:73, marginRight:10}} />
                        <Text style={{fontSize:16}}>成都市盐道街小学</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.gotoLocation()} style={styles.location}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={location} style={{width:16, height:16}} />
                            <Text style={{fontSize:16, marginLeft:10}}>盐道街2号</Text>
                        </View>
                        <Image source={chose} style={{width:20, height:20}} />
                    </TouchableOpacity>




                </ScrollView>
               
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
    title:{
        fontSize:20, 
        marginLeft:20, 
        marginRight:20, 
        flex:1, 
        color:'#00B09D', 
        textAlign:'center'
    },
    school:{
        width:screenWidth, 
        flexDirection:'row', 
        padding:10, 
        marginTop:-1, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        borderTopWidth:1, 
        borderTopColor:'#E8E8E8',
        alignItems:'center',
        backgroundColor:'#FFF'
    },
    location:{
        height:44, 
        width:screenWidth,
        borderTopColor:'#E8E8E8',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFF',
        paddingLeft:10,
        paddingRight:10,
        marginTop:15,
        justifyContent:'space-between'
    }
});















