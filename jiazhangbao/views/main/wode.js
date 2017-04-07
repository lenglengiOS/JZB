
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
    Image
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           
		}
	}
    componentDidMount(){
       
    }

    renderNameView(){
    	if(!this.state.isLogin)
    	{
    		return(
    			<View style={{height:60, flex:1, flexDirection:'row'}}>
    				<Text style={{color:'#FB5441', fontSize:16, marginLeft:15, marginRight:10}}>青春</Text>
    				<Image source={JZBImages.gc_beauty_v1} style={{width:18, height:18}} />
    			</View>
	    	)
    	}
    	return(
    		<View style={{height:60, flex:1, flexDirection:'row',alignItems:'center'}}>
    			<Text style={{color:'#969696', fontSize:16, marginLeft:15}}>登陆/注册</Text>
    		</View>
    	)
    	
    }

	render(){
		return(
			<View style={styles.container}>
                <View style={styles.nav}>
                	<Text style={styles.userCenter}>个人中心</Text>
                </View>
                <ScrollView>
                	<View style={styles.userInfo}>
                		<View style={{height:90,marginLeft:15, paddingRight:10,borderBottomWidth:1,borderBottomColor:'#E8E8E8', alignItems:'center',flexDirection:'row'}}>
                			<Image source={this.state.userIcon?{uri: this.state.userIcon}:JZBImages.userIcon} style={{width:60, height:60, borderRadius:30}}/>
                			{this.renderNameView()}
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />

                		</View>
                		<View style={{width:screenWidth, height:64, backgroundColor:'#FFF', paddingLeft:15, paddingRight:15,flexDirection:'row'}}>
                			<View style={styles.jifen}>
                				<Text style={{color:'#717171', fontSize:15}}>0</Text>
                				<Text style={{color:'#717171', fontSize:14}}>我的积分</Text>
                			</View>
                			<View style={styles.jifen}>
                				<Text style={{color:'#717171', fontSize:15}}>0</Text>
                				<Text style={{color:'#717171', fontSize:14}}>我的积分</Text>
                			</View>
                			<View style={styles.jifen}>
                				<Text style={{color:'#717171', fontSize:15}}>0</Text>
                				<Text style={{color:'#717171', fontSize:14}}>我的积分</Text>
                			</View>
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_take_class} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>已报班</Text>
                			<Text style={{color:'#717171', fontSize:16, marginRight:5}}>查看订单</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_post} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>帖子</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                		<View style={{marginLeft:53, width:screenWidth-53, height:1, backgroundColor:'#E8E8E8'}}/>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_friend} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>好友</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_follow} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>关注</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                		<View style={{marginLeft:53, width:screenWidth-53, height:1, backgroundColor:'#E8E8E8'}}/>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_store} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>收藏</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>
                	<View style={styles.commCell}>
                		<View style={{height:44, width:screenWidth,flexDirection:'row', alignItems:'center', paddingLeft:15, paddingRight:10}}>
                			<Image source={JZBImages.user_setting} style={styles.image} />
                			<Text style={{color:'#000', fontSize:16, flex:1}}>设置</Text>
                			<Image source={JZBImages.chose} style={{width:20, height:20}} />
                		</View>
                	</View>





                </ScrollView>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#F5F5F5',
    },
    nav:{
    	width:screenWidth,
    	height:64,
    	paddingTop:20,
    	backgroundColor:'#33BAAB',
    	justifyContent:'center',
    	alignItems:'center'
    },
    userCenter:{
    	color:'#FFF',
    	fontSize:17
    },
    userInfo:{
    	backgroundColor:'#FFF',
    	borderBottomWidth:1,
    	borderBottomColor:'#E8E8E8',
    	borderTopWidth:1,
    	borderTopColor:'#E8E8E8',
    	marginTop:-1
    },
    jifen:{
    	flex:1,
    	height:64,
    	paddingTop:5,
    	paddingBottom:4, 
    	alignItems:'center', 
    	justifyContent:'space-around'
    },
    commCell:{
    	width:screenWidth, 
    	borderTopWidth:1, 
    	borderTopColor:'#E8E8E8', 
    	marginTop:13, 
    	backgroundColor:'#FFF', 
    	borderBottomWidth:1, 
    	borderBottomColor:'#E8E8E8'
    },
    image:{
    	width:24, 
    	height:24, 
    	marginRight:15
    }
    
});


























