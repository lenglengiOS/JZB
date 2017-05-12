
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
    Image,
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import Tools from '../tools';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import ShareModal from '../component/shareModal'

export default class BaoBan extends React.Component{
	constructor(props){
		super(props);
		this.state={
           
		}
	}
    componentDidMount(){
       Tools.getStorage("maincfg",(resData)=>{
            if(Tools.isDataValid(resData))
            {
                this.setState({isLogin:true})
            }
        });  
    }

    componentWillUnmount() {

    }

    backToLoginPage(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'login',
                param:{
                }
            })
        }
    }
    back(){
       const { navigator } = this.props;
        if(navigator) {
            navigator.pop()
        }
    }

    goBack(){
        Tools.removeStorage("maincfg");
        let value = 'value';
        RCTDeviceEventEmitter.emit('undateUserInfo',value); 
        this.backToLoginPage();
    }

    loginOut(){
        Alert.alert(
            '确定要退出吗？',
            '退出后将无法使用更多功能',
            [
                {text: '取消', onPress: () => console.log('取消')},
                {text: '确定', onPress: () => this.goBack()},
            ]
        )
    }

    toShare(){
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
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.back()}} style={styles.touchNav}>
                        <Image source={JZBImages.back} style={{width:27, height:27}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, color:'#00B09D'}}>我的设置</Text>
                </View>
                <ScrollView>
                	<TouchableOpacity  activeOpacity={0.8} onPress={()=>this.toShare()} style={styles.yaoqing}>
                        <Text style={{fontSize:16}}>邀请好友</Text>
                        <Text style={styles.text}>分享参与抽奖</Text>
                        <Image source={JZBImages.chose} style={{width:20, height:20}} />
                	</TouchableOpacity>
                	<View style={styles.huancun}>
                        <Text style={{fontSize:16}}>清楚缓存</Text>
                        <Text style={styles.text}>1.00M</Text>
                        <Image source={JZBImages.chose} style={{width:20, height:20}} />
                	</View>
                	<View style={styles.guanyu}>
                        <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16}}>关于我们</Text>
                            <Text style={{flex:1}}/>
                            <Image source={JZBImages.chose} style={{width:20, height:20}} />
                        </View>
                        <View style={{height:1, backgroundColor:'#E8E8E8',flex:1}}/>
                        <View style={{height:44, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16}}>建议反馈</Text>
                            <Text style={styles.text}>提点建议吧</Text>
                            <Image source={JZBImages.chose} style={{width:20, height:20}} />
                        </View>
                	</View>
                    {this.state.isLogin?
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.loginOut()}} style={styles.loginOut}>
                            <Text style={{color:'#FFF', fontSize:18}}>退出登录</Text>
                        </TouchableOpacity>
                        :<View/>}
                </ScrollView>
                <ShareModal ref={(o) => this.ShareModal = o}></ShareModal>
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
        borderBottomColor:'#E8E8E8'
    },
    touchNav:{
        width:30, 
        height:30, 
        position:'absolute', 
        top:27, 
        left:10
    },
    yaoqing:{
        height:44, 
        marginTop:11, 
        borderBottomWidth:1,
        backgroundColor:'#FFF', 
        borderBottomColor:'#E8E8E8', 
        borderTopWidth:1, 
        borderTopColor:'#E8E8E8', 
        flexDirection:'row', 
        alignItems:'center',
        paddingLeft:15,
        paddingRight:10
    },
    huancun:{
        height:44, 
        marginTop:15, 
        borderBottomWidth:1,
        backgroundColor:'#FFF', 
        borderBottomColor:'#E8E8E8', 
        borderTopWidth:1, 
        borderTopColor:'#E8E8E8', 
        flexDirection:'row', 
        alignItems:'center',
        paddingLeft:15,
        paddingRight:10
    },
    text:{
        fontSize:16, 
        flex:1, 
        textAlign:'right', 
        color:'#7B7B7B'
    },
    guanyu:{
        marginTop:15, 
        borderBottomWidth:1,
        backgroundColor:'#FFF', 
        borderBottomColor:'#E8E8E8', 
        borderTopWidth:1, 
        borderTopColor:'#E8E8E8', 
        paddingLeft:15,
        paddingRight:10
    },
    loginOut:{
        flex:1,
        marginLeft:15,
        marginRight:15,
        borderRadius:3,
        marginTop:30, 
        height:44, 
        backgroundColor:'#ED5A43',
        alignItems:'center',
        justifyContent:'center'
    }

});





















