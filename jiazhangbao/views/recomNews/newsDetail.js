
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
    StatusBar
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

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                     backgroundColor="blue"
                     barStyle="default"
                     animated={true}/>
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <Image source={JZBImages.back} style={{width:25, height:25, marginLeft:10}} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:18, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>{this.props.param.title}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.toShare()}>
                    	<Image source={JZBImages.common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <View style={{width:screenWidth, flex:1}}>
                    <WebView
                        source={{uri:this.props.param.url}}
                        autoCapitalize="none"
                        scalesPageToFit={true}
                        startInLoadingState={true}
                        clearButtonMode="while-editing" />
                    <ShareModal ref={(o) => this.ShareModal = o}></ShareModal>
                </View>
            </View>
          )
    }
}



var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#FFF'
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
    }
});















