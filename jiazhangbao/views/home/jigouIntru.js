
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console} from '../constStr';


const arr = ['','','','','','','','','','',''];


export default class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowMore:false
        }
    }
    componentDidMount(){

    }

    _back(){
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.param} navigator={navigator} />
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
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"publish",
                param:{
                }
            })
        }
    }

    gotoLocation(){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"baidumap",
                param:{
                    label:'666'
                }
            })
        }
    }

    gotoGuanli(){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"guanli",
                param:{
                }
            })
        }
    }

    gotojiucuo(){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"jiucuo",
                param:{
                }
            })
        }
    }

    callPhone(){
        Linking.canOpenURL('tel:18202853094').then(supported => {
            if (!supported) {
                alert('该设备不支持拨打电话')
            } else {
                return Linking.openURL('tel:18202853094')
            }
        }).catch(err => console.error('An error occurred', err));
    }

    renderPhotoCell(){
        var margin = 3;
        return arr.map((item, index) => {
            return(
                <View style={{width:(screenWidth-20-margin*3)*0.25, height:(screenWidth-20-margin*3)*0.25, marginRight:3, marginTop:3}} >
                     <Image source={JZBImages.nav} style={{width:(screenWidth-20-margin*3)*0.25, height:(screenWidth-20-margin*3)*0.25}} />
                </View>
            )
        })
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
                        <Image source={JZBImages.back} style={{width:30, height:30, marginLeft:10}} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.title}>机构介绍</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('分享')}}>
                        <Image source={JZBImages.common_more} style={{width:30, height:30, marginRight:10}} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.school}>
                        <Image source={JZBImages.nav} style={{width:90, height:73, marginRight:10}} />
                        <Text style={{fontSize:16}}>成都市盐道街小学</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.gotoLocation()} style={styles.location}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={JZBImages.location} style={{width:17, height:17}} />
                            <Text style={{fontSize:16, marginLeft:10}}>盐道街2号</Text>
                        </View>
                        <Image source={JZBImages.chose} style={{width:20, height:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.callPhone()} style={styles.location}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={JZBImages.phone} style={{width:17, height:17}} />
                            <Text style={{fontSize:16, marginLeft:10}}>18202853094</Text>
                        </View>
                        <Image source={JZBImages.chose} style={{width:20, height:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isShowMore:!this.state.isShowMore})} style={styles.jigou}>
                        <Text style={{fontSize:14, color:'#A1A0A1'}}>机构简介</Text>
                        <Text style={{fontSize:15, marginTop:10, marginLeft:5, marginRight:5}}  numberOfLines={this.state.isShowMore?0:4}>EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)EF英孚教育青少儿英语(优品道中心)</Text>
                        <View style={{alignItems:'center'}}>
                            <Image source={!this.state.isShowMore?JZBImages.common_getinNor:JZBImages.showMore} style={{width:20, height:20}} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.photo}>
                        <Text style={{fontSize:14, color:'#A1A0A1'}}>机构相册</Text>
                    </View>
                    <View style={styles.photos}>
                        {this.renderPhotoCell()}
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.gotojiucuo()} style={styles.location}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16, marginLeft:10, color:'#33BAAB'}}>我要纠错</Text>
                            <Text style={{fontSize:14, marginLeft:10, color:'#A6A6A6'}}>（信息来源于网络，如有错误请更正）</Text>
                        </View>
                        <Image source={JZBImages.chose} style={{width:20, height:20}} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.gotoGuanli()} style={[styles.location, {height:56,marginBottom:15, justifyContent:'center'}]}>
                        <View style={{justifyContent:'center', alignItems:'center', width:170, height:40, borderRadius:5, backgroundColor:'#33BAAB'}}>
                            <Text style={{fontSize:17, marginLeft:10, color:'#FFF'}}>我是机构管理者</Text>
                        </View>
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
    },
    jigou:{
        width:screenWidth,
        borderTopColor:'#E8E8E8',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        backgroundColor:'#FFF',
        padding:10,
        paddingBottom:6,
        marginTop:15,
    },
    photo:{
        height:35, 
        justifyContent:'center',
        paddingLeft:10,
        backgroundColor:'#FFF',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        marginTop:15
    },
    photos:{
        padding:10,
        paddingRight:0, 
        backgroundColor:'#FFF',
        flexWrap:'wrap',
        flexDirection:'row',
        width:screenWidth,
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8'
    }

});















