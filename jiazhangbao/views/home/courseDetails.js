
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
const nav = require('../../resources/home/home_nav.png');
const back = require('../../resources/login/nav_back@2x.png');
const common_more = require('../../resources/home/common_more@2x.png');
const common_mes = require('../../resources/home/common_mes@2x.png');
const common_phone = require('../../resources/home/common_phone@2x.png');
const jigou = require('../../resources/home/class_pay_success@2x.png');
const youhui = require('../../resources/home/agency_tag_youhui@2x.png');
const zhifu = require('../../resources/home/agency_tag_zhifu@2x.png');
const money = require('../../resources/home/agency_tag_jigou@2x.png');
const location = require('../../resources/home/location@2x.png');

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
                        <Image source={nav} style={{width:screenWidth, height:180}}>
                            <View style={{width:screenWidth, height:30, backgroundColor:'rgba(0,0,0, 0.6)' , position:'absolute', bottom:0, justifyContent:'center'}}>
                                <Text style={{color:'#FFF', fontSize:16, marginLeft:10}}>钢琴培训季度套餐</Text>
                            </View>
                        </Image>
                        <View style={{backgroundColor:'#FFF'}}>
                            <View style={styles.price}>
                                <View>
                                    <Text style={{fontSize:15, color:'#FE7400'}}>优惠价：¥3999</Text>
                                    <Text style={{fontSize:15, color:'#BCBCBC', textDecorationLine:'line-through'}}>现场价：¥5940</Text>
                                </View>
                                <Text style={{fontSize:15, color:'#FE7400'}}>预交费：¥100</Text>
                            </View>
                            <View style={{width:screenWidth-10, height:1, backgroundColor:'#E8E8E8', marginLeft:10}}/>
                            <View style={[styles.price,{justifyContent:'flex-start', height:40}]}>
                                <Image source={jigou} style={{width:13, height:13, tintColor:'#3BC1B3'}} />
                                <Text style={{fontSize:14, color:'#3BC1B3', marginLeft:2}}>机构认证</Text>
                                <Image source={money} style={{width:13, height:13, marginLeft:20}} />
                                <Text style={{fontSize:14, color:'#3BC1B3'}}>随时退</Text>
                                <Image source={money} style={{width:13, height:13, marginLeft:20}} />
                                <Text style={{fontSize:14, color:'#3BC1B3'}}>过期退</Text>
                            </View>
                            <View style={{width:screenWidth-10, height:1, backgroundColor:'#E8E8E8', marginLeft:10}}/>
                            <View style={styles.liucheng}>
                                <View style={{alignItems:'center'}}>
                                    <View style={{borderWidth:1, borderRadius:5, borderColor:'#83CFC5', padding:8, width:75}}>
                                        <Text style={{fontSize:13.5, color:'#8F8F8F'}} numberOfLines={4}>线上支付小额预交费，获取优惠券</Text>
                                    </View>
                                    <Image source={zhifu} style={{width:15, height:15, marginTop:8}} />
                                </View>
                                <View style={{width:(screenWidth-75*3-20)*0.5, height:75, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, color:'#00B2A0'}}>→</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={{borderWidth:1, borderRadius:5, borderColor:'#83CFC5', padding:8, width:75}}>
                                        <Text style={{fontSize:13.5, color:'#8F8F8F'}} numberOfLines={4}>凭优惠券到机构报班，支付剩余学费</Text>
                                    </View>
                                    <Image source={money} style={{width:15, height:15, marginTop:8}} />
                                </View>
                                <View style={{width:(screenWidth-75*3-20)*0.5, height:75, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, color:'#00B2A0'}}>→</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={{borderWidth:1, borderRadius:5, borderColor:'#83CFC5', padding:8, width:75}}>
                                        <Text style={{fontSize:13.5, color:'#8F8F8F'}} numberOfLines={4}>完成报班享受折扣优惠，开始上课</Text>
                                    </View>
                                    <Image source={youhui} style={{width:15, height:15, marginTop:8}} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.jigouInfo}>
                            <Text style={{fontSize:14, color:'#989898'}}>机构信息</Text>
                            <Text onPress={()=>alert('在线讨论')} style={{fontSize:14, color:'#19BCAD'}}>在线讨论>></Text>
                        </View>
                        <TouchableOpacity style={styles.location} activeOpacity={0.8} onPress={()=>alert('机构信息')}>
                            <Text style={{fontSize:16, color:'#000'}}>星萌艺校</Text>
                            <Text style={{fontSize:14, color:'#808080', marginTop:5}}>四川省成都市锦江区景明路65号5栋</Text>
                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Image source={location} style={{width:8, height:12}}/>
                                <Text style={{fontSize:13, color:'#9B9B9B'}}> 9.35km</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.jigouInfo}>
                            <Text style={{fontSize:14, color:'#989898'}}>课程信息</Text>
                        </View>
                        <View style={styles.kechengInfo}>
                            <Text style={{fontSize:14, color:'#989898', marginRight:10}}>课程信息：<Text style={{fontSize:14, color:'#000'}}>钢琴培训季度套餐</Text></Text>
                            <Text style={{fontSize:14, color:'#989898', marginRight:10, marginTop:10}}>开课人数：<Text style={{fontSize:14, color:'#000'}}>100人</Text></Text>
                            <Text style={{fontSize:14, color:'#989898', marginRight:10, marginTop:10}}>试听信息：<Text style={{fontSize:14, color:'#000'}}>不支持试听</Text></Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14, color:'#989898', marginTop:10}}>课程介绍：</Text>
                                <Text style={{fontSize:14, color:'#000',flex:1, marginTop:10, marginRight:5}}>缉拿额覅偶叫饿哦我司法局我就微积分我我of奇偶文件佛七微积分我减肥哦文件而非违法批今儿我if额外围殴积分任务</Text>
                            </View>
                            <View style={{width:screenWidth-10, height:1, backgroundColor:'#E8E8E8'}}/>
                            <View style={{flexDirection:'row', height:35, justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:'#989898', marginTop:10}}>课程教师：</Text>
                                <Text style={{fontSize:14, color:'#000',flex:1, marginTop:10, marginRight:5}}>陆彦雪 冷洪林</Text>
                            </View>
                            <View style={{width:screenWidth-10, height:1, backgroundColor:'#E8E8E8'}}/>
                            <View style={{justifyContent:'center', height:35}}>
                                <Text onPress={()=>alert('课程详情')} style={{fontSize:14, color:'#19BCAD'}}>课程详情>></Text>
                            </View>    
                        </View>
                        <View style={styles.jigouInfo}>
                            <Text style={{fontSize:14, color:'#989898'}}>购买须知</Text>
                        </View>
                        <View style={styles.kechengInfo}>
                            <Text style={{fontSize:14, color:'#FE8702', marginRight:10}}>有效期：<Text style={{fontSize:14, color:'#989898'}}>钢琴培训季度套餐</Text></Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14, color:'#FE8702', marginTop:10}}>注意事项：</Text>
                                <Text style={{fontSize:14, color:'#989898',flex:1, marginTop:10, marginRight:5}}>缉拿额覅偶叫饿哦我司法局我就微积分我我of奇偶文件佛七微积分我减肥哦文件而非违法批今儿我if额外围殴积分任务</Text>
                            </View>
                            <Text style={{fontSize:14, color:'#FE8702', marginRight:10, marginTop:10, marginBottom:10}}>其他优惠：<Text style={{fontSize:14, color:'#989898'}}></Text></Text>
                            <View style={{width:screenWidth-10, height:1, backgroundColor:'#E8E8E8'}}/>
                            <View style={{justifyContent:'center', height:35}}>
                                <Text onPress={()=>alert('邀请朋友报班')} style={{fontSize:14, color:'#19BCAD'}}>邀请朋友报班>></Text>
                            </View>    
                        </View>

                        <View style={styles.jigouInfo}>
                            <Text style={{fontSize:14, color:'#989898'}}>课程评价</Text>
                        </View>
                        <View style={[styles.kechengInfo, {height:48, justifyContent:'center', alignItems:'center', marginBottom:15, paddingTop:0}]}>
                            <Text onPress={()=>alert('家长圈')} style={{fontSize:14, color:'#989898', marginRight:10}}>没人评论？去机构的家长圈看看吧>></Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.bottomBar}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>this.call()} style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={common_phone} style={{width:25, height:25, marginLeft:18}} />
                            <Text style={{color:'#6F6F6F', marginLeft:3, fontSize:16}}>咨询</Text>
                        </TouchableOpacity>    
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.send()}} style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={common_mes} style={{width:25, height:25, marginLeft:22}} />
                            <Text style={{color:'#6F6F6F', marginLeft:3, fontSize:16}}>私信</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.baoban} onPress={()=>{this.baoban()}}>
                        <Text style={{color:'#FFF', fontSize:16}}>立即报班</Text>
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
        bottom:0,
        justifyContent:'space-between'
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
    }
});















