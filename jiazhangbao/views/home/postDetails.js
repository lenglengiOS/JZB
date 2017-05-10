
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
    StatusBar,
    Image
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
import Tools from '../tools';
import ShareModal from '../component/shareModal'
import LoadingShow  from '../component/react-native-loading';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '../tools/Toast';
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
import ResolveAssetSource from 'resolveAssetSource';

export default class BaoBan extends React.Component{
	constructor(props){
		super(props);
		this.state={
           
		}
	}
    componentDidMount(){
    	//var images = this.props.param.item.photos.split(",");
    	//console.log(JSON.stringify(this.props.param.item))
        this.goLocation();
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

    goLocation(){
        Geolocation.getCurrentPosition().then(data => {
                console.log("====Geolocation=="+JSON.stringify(data))
                Geolocation.reverseGeoCode(data.latitude, data.longitude).then(res => {
                        console.log("====reverseGeoCode=="+JSON.stringify(res))
                        this.setState({location:res.city})
                    }).catch(e =>{
                    console.warn(e, 'error');
                  })

          }).catch(e =>{
            console.warn(e, 'error');
          })
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    reply(){
    	alert('回复')
    }

    renderImages(){
    	var images = this.props.param.item.photos?this.props.param.item.photos.split(","):[];
    	var sizeArr = this.props.param.item.size?this.props.param.item.size.split(","):[];
    	if(images.length <= 0)
    	{	
    		return;
    	}
    	return images.map((item, index) => {

    		let icon = require('../../resources/Main/tab_home-on@2x.png')
            let source = ResolveAssetSource(icon);

    		return(
    			<View key={index} style={{width:screenWidth, backgroundColor:'#FFF', paddingTop:10, paddingLeft:10}}>
    				<Image source={{uri: IPAddr+item}} resizeMode='cover' style={{width:screenWidth-20, backgroundColor:'#F5F5F5', height:(screenWidth-20.0)/sizeArr[index]}}/>
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
                        <Image source={JZBImages.back} style={{width:25, height:25, marginLeft:10}} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:18, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>帖子详情</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.toShare()}>
                    	<Image source={JZBImages.common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <View style={{width:screenWidth, height:screenHeight-64-47}}>
	                <ScrollView>
	                	<View style={styles.info}>
	                        <View style={{flexDirection:'row'}}>
	                            <Image source={this.props.param.item.avatar.indexOf("/images/user/")!=-1?{uri: IPAddr+this.props.param.item.avatar}:{uri: BimgURL+this.props.param.item.avatar+LimgURL}} style={{width:40, height:40, borderRadius:20, backgroundColor:'#F5F5F5'}} />
	                            <View style={{marginLeft:10, marginTop:3, marginBottom:3, justifyContent:'space-between',height:34}}>
	                                <Text style={{color:'#FAB665', fontSize:14, fontWeight:'bold'}}>{this.props.param.item.name}</Text>
	                                <View style={{flexDirection:'row', marginTop:5}}>
		                                <Text style={{color:'#A5A5A5', fontSize:12}}>{this.props.param.item.childGrade}</Text>
		                                <Image source={JZBImages.location} style={{width:10, height:12, marginLeft:10}}/>
						                <Text style={{marginLeft:3, color:'#A5A5A5', fontSize:12}}>{this.state.location}</Text>
						            </View>

	                            </View>
	                        </View>
	                        <View style={{flexDirection:'row', height:69, paddingTop:15}}>
	                        	<Image source={JZBImages.user_time} style={{width:15, height:15, marginRight:3}}/>
	                            <Text style={{color:'#8B8B8B', fontSize:12}}>{this.props.param.item.createTime}</Text>
	                        </View>
	                    </View>
	                    <View style={styles.content}>
	                    	<Text style={{fontSize:16, fontWeight:'bold', marginTop:15, width:screenWidth-20}}>{this.props.param.item.title}</Text>
	                    	<Text style={{fontSize:16, marginTop:10, width:screenWidth-20, color:'#343434', lineHeight:20}}>{this.props.param.item.content}</Text>
	                    </View>
	                    {this.renderImages()}
	                    <View style={{width:screenWidth, height:80, backgroundColor:'#FFF', flexDirection:'row',alignItems:'center', justifyContent:'flex-end'}}>
	                    	<View style={{flexDirection:'row'}}>
	                    		<Image source={JZBImages.likeIcon} style={{width:18, height:18, marginLeft:10, tintColor:'#5284E2'}} />
	                            <Text style={{color:'#5284E2', marginLeft:2, fontSize:16, marginRight:20}}>赞</Text>
	                            <Image source={JZBImages.replyIco} style={{width:18, height:18, tintColor:'#5284E2'}} />
	                            <Text style={{color:'#5284E2', marginLeft:2, fontSize:16, marginRight:10}}>回复</Text>
	                        </View>
	                    </View>

	                </ScrollView>
	            </View>
                <View style={styles.bottomBar}>
                    <Image source={JZBImages.postDetailSendReply} style={{width:28, height:28, marginLeft:8}} />
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.reply()} style={styles.touch}>
                        <Text style={styles.bottomText} numberOfLines={2}>回复是一种鼓励</Text>
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
    info:{
    	flex:1, 
    	backgroundColor:'#FFF', 
    	width:screenWidth, 
    	padding:10, 
    	height:70,
    	flexDirection:'row', 
    	justifyContent:'space-between', 
    	alignItems:'center',
    	borderBottomWidth:1,
    	borderBottomColor:'#E8E8E8'
    },
    content:{
    	backgroundColor:'#FFF',
    	width:screenWidth,
    	paddingLeft:10,
    	paddingRight:10,
    	paddingBottom:10
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
    bottomText:{
        color:'#C0C0C0',
        fontSize:14,
        marginLeft:2,
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
    }
    
});


















