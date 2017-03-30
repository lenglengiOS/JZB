
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


export default class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isJoin:false
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

    joinIn(){
        if (this.state.isJoin) {
            alert('已加入')
        }else{
            alert('我要加入')
        }
        
    }

    renderBottomBar(){
        if (this.state.isJoin) {
            return(
                <View style={styles.bottomBar}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.joinIn()} style={[styles.touch, {backgroundColor:'#FFF'}]}>
                        <Text style={[styles.bottomText, {color:'#55BFB0'}]}>已加入，去讨论>></Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return(
            <View style={styles.bottomBar}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.joinIn()} style={styles.touch}>
                    <Text style={styles.bottomText}>我要加入</Text>
                </TouchableOpacity>
            </View>
        )
        
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
                    <Text numberOfLines={1} style={{fontSize:20, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>在线讨论群</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('分享')}}>
                    	<Image source={JZBImages.common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{flexDirection:'row', backgroundColor:'#FFF', borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:10}}>
                        <Image source={JZBImages.nav} style={{width:88, height:74, marginTop:10, marginLeft:10}}/>
                        <View style={styles.recommendCell}>
                            <View>
                                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                    <Text style={{fontSize:18}}>EF音符教育青少儿英语（优品道中心）</Text>
                                </View>
                                <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>成都市青羊区99号UI为hi武乌尔禾</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.qunzhu}>
                        <Text style={{fontSize:16}}>群主</Text>
                        <Text style={{fontSize:16, color:'#8D8D8D'}}>市机关第三幼儿园</Text>
                    </View>








                    
                </ScrollView>
                {this.renderBottomBar()}
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
        backgroundColor:'#FFF', 
        paddingTop:20, 
        justifyContent:'center', 
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        flexDirection:'row',
    },
    recommendCell:{
        flex:1, 
        marginLeft:10, 
        marginTop:10, 
        marginRight:10, 
        justifyContent:'space-between'
    },
    bottomBar:{
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor:'#F5F5F5', 
        width:screenWidth, 
        height:44, 
        position:'absolute', 
        bottom:10
    },
    touch:{
        marginLeft:15,
        marginRight:15,
        borderRadius:5,
        backgroundColor:'#55BFB0',
        flex:1,
        height:44,
        alignItems:'center',
        justifyContent:'center'
    },
    bottomText:{
        color:'#FFF',
        fontSize:17,
    },
    qunzhu:{
        marginTop:15,
        height:44,
        backgroundColor:'#FFF',
        paddingLeft:10, 
        paddingRight:10, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        borderTopWidth:1,
        borderTopColor:'#E8E8E8'
    }
});















