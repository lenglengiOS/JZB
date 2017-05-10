
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
import Tools from '../tools';
import ShareModal from '../component/shareModal'

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
        //<Component {...route.param} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.pop() 
        }
    }

    /*
    *分享
    */
    toShare(){
        // var sharedata={
        //     title:actInfo.share_pri_title,
        //     imageurl:actInfo.share_prize_img_url,
        //     url:actInfo.share_prize_url
        // }
       
        // this.ShareModal&&this.ShareModal.show(sharedata,null,actInfo.share_prize_url)
        this.ShareModal&&this.ShareModal.show()
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

    jigouIntru(){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"jigouintru",
                param:{
                    
                }
            })
        }
    }

    chatOnline(){
        
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
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.toShare()}>
                    	<Image source={JZBImages.common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <View style={{width:screenWidth, height:screenHeight-64-47}}>
                    <ScrollView>
                        <View style={{flexDirection:'row', backgroundColor:'#FFF', borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:10}}>
                            <Image source={JZBImages.nav} style={{width:85, height:74, marginTop:10, marginLeft:10}}/>
                            <View style={styles.recommendCell}>
                                <View>
                                    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{fontSize:18}}>市机关第三幼儿园讨论群</Text>
                                    </View>
                                    <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>成都市青羊区99号</Text>
                                </View>
                            </View>
                        </View>
                        



                    </ScrollView>
                </View>
                <View style={styles.bottomBar}>
                    <Image source={JZBImages.nav} style={{width:38, height:38, marginLeft:8, borderRadius:19}} />
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.publish()} style={styles.touch}>
                        <Text style={styles.bottomText} numberOfLines={2}>对于这个机构，您有什么想了解的吗？</Text>
                    </TouchableOpacity>
                </View>
                <ShareModal ref={(o) => this.ShareModal = o}></ShareModal>
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
        marginLeft:5,
        marginRight:5
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















