
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
import Tools from '../tools';
import LoadingShow  from '../component/react-native-loading';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '../tools/Toast';

export default class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            loadingWaitText:"加载中...",
        }
    }
    componentDidMount(){
        //alert(this.props.param.id)
        this.getData()

        // 接收到通知之后执行  this.getData()
        this.listener = RCTDeviceEventEmitter.addListener('undatePosts',(value)=>{  
            // 接受到通知后的处理  
            this.getData()
        });
        
    }

    componentWillUnmount(){  
      // 移除监听 一定要写  
      this.listener.remove();  
    }

    getData(){
        this.setState({loading:true})
        Tools.get(IPAddr+"/home/jigouInfo.php?name="+this.props.param.name+'&id='+this.props.param.id,(data)=>{
                console.log("==getPostsData===="+JSON.stringify(data));
                this.setState({
                    loading:false,
                    data:data
                })
                
        },(err)=>{
            this.setState({
              loading:false
            })
            Toast.show(err)
        })
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    publish(){
        Tools.getStorage("maincfg",(resData)=>{
            if(Tools.isDataValid(resData))
            {
                let {route,navigator} = this.props;
                if(navigator){
                    navigator.push({
                        name:"publish",
                        param:{
                            circleId:this.props.param.id,
                            userIcon:this.props.param.userIcon,
                            userId:this.props.param.userId,
                            userphone:this.props.param.userphone,
                            username:this.props.param.username,
                            c_grade:this.props.param.c_grade
                        }
                    })
                }
            }else{
                Toast.show("需要登录", 2000)
                let {route,navigator} = this.props;
                if(navigator){
                    navigator.push({
                        name:"login",
                        param:{
                           
                        }
                    })
                }
            }
        });
    }

    jigouIntru(){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"jigouintru",
                param:{
                    data:this.state.data
                }
            })
        }
    }

    chatOnline(){
        //let {route,navigator} = this.props;
        //if(navigator){
        //    navigator.push({
        //        name:"chatonline",
        //        param:{
        //        }
        //    })
        //}
        alert('跳转到聊天界面')
    }

    gotoPostDetails(item){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"postdetails",
                param:{
                    item:item
                }
            })
        }
    }

    jigouquanzi(){
        let { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'homejiazhangquan',
                param:{
                    TITLE:'家长圈',
                    id:this.props.param.id,
                    name:this.state.data.jigouInfo.name
                }
            })
        }
    }

    renderPosts(){
        if(!this.state.data){return;}

        return this.state.data.post.map((item, index) => {
            return(
                <TouchableOpacity key={index} activeOpacity={0.8} onPress={()=>this.gotoPostDetails(item)} style={styles.cell}>
                    <View style={{flex:1, backgroundColor:'#FFF',height:40,flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={item.avatar.indexOf("/images/user/")!=-1?{uri: IPAddr+item.avatar}:{uri: this.state.data?BimgURL+item.avatar+LimgURL:'http://'}} style={{width:40, height:40, borderRadius:20, backgroundColor:'#F5F5F5'}} />
                            <View style={{marginLeft:10, marginTop:3, marginBottom:3, justifyContent:'space-between',height:34}}>
                                <Text style={{color:'#FAB665', fontSize:14, fontWeight:'bold'}}>{this.state.data?item.name:''}</Text>
                                <Text style={{color:'#A5A5A5', fontSize:12}}>{this.state.data?item.childGrade:''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={JZBImages.replyIco} style={{width:14, height:14}} />
                            <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>{item.replyNum?item.replyNum:0}</Text>
                            <Image source={JZBImages.likeIcon} style={{width:14, height:14, marginLeft:10}} />
                            <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>{item.likeNum?item.likeNum:0}</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:16, marginLeft:5, marginRight:5, marginTop:10}} numberOfLines={2}>{this.state.data?item.title:''}</Text>
                </TouchableOpacity>
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
                    <Text numberOfLines={1} style={{fontSize:18, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>机构信息</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('分享')}}>
                    	<Image source={JZBImages.common_more} style={{width:30, height:30, marginRight:10}} />
                	</TouchableOpacity>
                </View>
                <View style={{width:screenWidth, height:screenHeight-64-47}}>
                    <ScrollView>
                        <View style={{flexDirection:'row', backgroundColor:'#FFF', borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:15}}>
                            <Image source={{uri: this.state.data?BimgURL+this.state.data.jigouInfo.logo+LimgURL:'http://'}} style={{width:85, height:70, marginTop:15, marginLeft:10, backgroundColor:'#F5F5F5'}}/>
                            <View style={styles.recommendCell}>
                                <View>
                                    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{fontSize:18}}>{this.state.data?this.state.data.jigouInfo.name:''}</Text>
                                    </View>
                                    <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>{this.state.data?this.state.data.jigouInfo.address:''}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.jigouIntru}>
                            <View style={{alignItems:'center', marginLeft:18}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.jigouIntru()} style={{alignItems:'center'}}>
                                    <Image source={JZBImages.jigouIntru} style={{width:30, height:30, marginBottom:6}}/>
                                    <Text style={{color:'#9B9B9B', fontSize:13}}>机构介绍</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems:'center', marginLeft:30}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.chatOnline()} style={{alignItems:'center'}}>
                                    <Image source={JZBImages.online} style={{width:30, height:30, marginBottom:6}}/>
                                    <Text style={{color:'#9B9B9B', fontSize:13}}>在线讨论</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.jiazhang}>
                            <Text style={{fontSize:14, color:'#989898'}}>家长讨论</Text>
                            <Text onPress={()=>this.jigouquanzi()} style={{fontSize:14, color:'#19BCAD'}}>机构圈子>></Text>
                        </View>
                        {this.renderPosts()}
                    </ScrollView>
                </View>
                <View style={styles.bottomBar}>
                    <Image source={this.props.param.userIcon?{uri: IPAddr+this.props.param.userIcon}:JZBImages.userIcon} style={{width:38, height:38, marginLeft:8, borderRadius:19, backgroundColor:'#F5F5F5'}} />
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.publish()} style={styles.touch}>
                        <Text style={styles.bottomText} numberOfLines={2}>对于这个机构，您有什么想了解的吗？</Text>
                    </TouchableOpacity>
                </View>
                <LoadingShow loading={this.state.loading} text={this.state.loadingWaitText}/>
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















