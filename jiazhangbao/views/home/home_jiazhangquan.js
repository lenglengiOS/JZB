
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
    StatusBar,
    Modal
} from 'react-native';

import MyListView from '../component/MyListView';
import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
import Tools from '../tools';
import LoadingShow  from '../component/react-native-loading';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '../tools/Toast';
import PhotoView from '../component/'

const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

const margin = 5;

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
            dataSource:defaultData,
            dataSize:4,
            count:3,
            index:0,
            loading:false,
            loadingWaitText:"加载中...",
            modalVisible:false
		}
	}
    componentDidMount(){
       //alert(this.props.param.id)
       //alert(this.props.param.name)
        this.getData();
        this.login();
        this.listener = RCTDeviceEventEmitter.addListener('undatePosts',(value)=>{  
            // 接受到通知后的处理  
            this.getData()
        });
    }

    componentWillUnmount(){  
      // 移除监听 一定要写  
      this.listener.remove();  
    }

    login(){
        Tools.getStorage("maincfg",(resData)=>{
            if(Tools.isDataValid(resData))
            {
                var maincfgData=JSON.parse(resData)
                this.setState({
                        isLogin:true,
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    })
                console.log("====maincfgData=="+resData)
                var PostData ={
                    data:{
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    }
                }
                Tools.postNotBase64(IPAddr+"/login/login.php", PostData,(ret)=>{
                    console.log("====家长圈页面登陆成功dadadada=="+JSON.stringify(ret))
                        if(ret.message == "登陆成功")
                        {
                            this.setState({
                                username:ret.data[0].user_name,
                                id:ret.data[0].id,
                                user_icon:ret.data[0].user_icon,
                                data:ret.data[0],
                                isLogin:true,
                                c_grade:ret.data[0].c_grade+"家长"
                            })
                        }else{
                            Toast.show("获取用户信息失败", 2000)
                        }
                    }, (err)=>{
                        Toast.show(err);
                        this.setState({isLogin:false})
                        console.log("====444444==="+err)
                });
            }else{
                this.setState({
                    isLogin:false,
                    user_icon:null
                })
            }
        });  
    }

    getData(){
        this.setState({loading:true})
        Tools.get(IPAddr+"/home/jigouInfo.php?id="+this.props.param.id,(data)=>{
                console.log("==getPostsData8888===="+JSON.stringify(data));
                this.setState({
                    loading:false,
                    dataSource:defaultData.cloneWithRows(data.post),
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

    goToTopicDetail(item){
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
                            userIcon:this.state.user_icon,
                            userId:this.state.id,
                            userphone:this.state.userphone,
                            username:this.state.username,
                            c_grade:this.state.c_grade,
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

	render(){
		return(
			<View style={styles.container}>
                 <StatusBar
                     backgroundColor="blue"
                     barStyle="default"
                   />
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <Image source={JZBImages.back} style={{width:25, height:25, marginLeft:10}} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontSize:18, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>{this.props.param.name}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.setState({isFocus:!this.state.isFocus})}>
                        <Image source={this.state.isFocus?JZBImages.focus_on:JZBImages.focus_off} style={{width:20, height:20, marginRight:10}} />
                    </TouchableOpacity>
                </View>
                <View style={{width:screenWidth, height:44, borderBottomWidth:1, borderBottomColor:'#E8E8E8', backgroundColor:'#FFF', justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({index:0})} style={[styles.switchBar, {backgroundColor:this.state.index==0?'#3EB7A7':'#FFF', borderColor:'#3EB7A7'}]}>
                            <Text style={{color:this.state.index==0?'#FFF':'#3EB7A7'}}>最新帖子</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({index:1})} style={[styles.switchBar1, {backgroundColor:this.state.index==1?'#3EB7A7':'#FFF', borderColor:'#3EB7A7'}]}>
                            <Text style={{color:this.state.index==1?'#FFF':'#3EB7A7'}}>最新回复</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <MyListView
                    onRefresh={this.onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
                <TouchableOpacity onPress={()=>this.publish()} activeOpacity={0.8} style={{position:'absolute', right:20, bottom:30}}>
                    <Image source={JZBImages.fabu} style={{width:42, height:42, opacity:0.7}} />   
                </TouchableOpacity>
			</View>
		  )
	}

    renderCell(rowData){
        return(
            <View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToTopicDetail(rowData)}} style={styles.cell}>
                    <View style={{flex:1, backgroundColor:'#FFF',height:40,flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('用户资料')}>
                                <Image source={rowData.avatar.indexOf("/images/user/")!=-1?{uri: IPAddr+rowData.avatar}:{uri: rowData.avatar?BimgURL+rowData.avatar+LimgURL:'http://'}} style={{width:40, height:40, borderRadius:20}} />
                            </TouchableOpacity>
                            <View style={{marginLeft:10, marginTop:3, marginBottom:3, justifyContent:'space-between',height:34}}>
                                <Text style={{color:'#FAB665', fontSize:14}}>{rowData.name}</Text>
                                <Text style={{color:'#A5A5A5', fontSize:12}}>{rowData.childGrade}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={JZBImages.replyIco} style={{width:14, height:14}} />
                            <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>{rowData.replyNum?rowData.replyNum:0}</Text>
                            <Image source={JZBImages.likeIcon} style={{width:14, height:14, marginLeft:10}} />
                            <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>{rowData.likeNum?rowData.likeNum:0}</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:16, marginLeft:5, marginRight:5, marginTop:15}} numberOfLines={2}>{rowData.title}</Text>
                    <Text style={{fontSize:14, marginLeft:5, marginRight:5, marginTop:6, color:'#909090', lineHeight:20}} numberOfLines={2}>{rowData.content}</Text>
                    <View style={{flexDirection:'row'}}> 
                        {this.renderPhotos(rowData)}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderPhotos(rowData){
        if(!rowData.photos)
        {
            return;
        }
        var arr = rowData.photos?rowData.photos.split(","):[];
        return arr.map((item, index) => {
            if(index>=3)
            {
                return null;
            }
            return(
                <View key={index} style={styles.photoCell}>
                     <Image source={{uri: IPAddr+item}} style={{width:(screenWidth-20-margin*2)/3, height:(screenWidth-20-margin*2)/3, backgroundColor:'#F5F5F5'}} />
                </View>
            )
        })
    }

    renderRow(rowData, sectionID, rowID){
        if (rowID==0) {
            return(
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('公告')} style={{marginBottom:15}}>
                        <View style={styles.gonggao}>
                            <View style={styles.gonggao_button}><Text style={{color:'#FFF'}}>公告</Text></View>
                            <Text style={{marginLeft:10, fontSize:16}}>【家长圈使用需知】</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:screenWidth, height:1, backgroundColor:'#E8E8E8'}}/>
                    {this.renderCell(rowData)}
                </View>
            )
        }
        return(
            <View>
                {this.renderCell(rowData)}
            </View>
        )
    }

    onRefresh() {  
        this.getData()
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
    TextInput:{
    	flex:1,
    	borderRadius:5,
    	backgroundColor:'#EAEBED',
    	marginLeft:20,
    	marginRight:20,
    	height:30,
    	alignItems:'center',
    	flexDirection:'row',
    	justifyContent:'center'
    },
    recommendCell:{
        flex:1, 
        marginRight:10, 
        justifyContent:'space-between'
    },
    switchBar:{
        width:100, 
        height:30, 
        borderBottomLeftRadius:3, 
        borderTopLeftRadius:3, 
        borderWidth:1,
        justifyContent:'center', 
        alignItems:'center'
    },
    switchBar1:{
        width:100, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center',
        borderWidth:1,
        borderBottomRightRadius:3, 
        borderTopRightRadius:3
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
    },
    firstRow:{
        borderTopWidth:1,
        borderTopColor:'#E8E8E8',
        marginTop:15
    },
    gonggao:{
        width:screenWidth, 
        height:50, 
        backgroundColor:'#FFF', 
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        borderTopWidth:1,
        borderTopColor:'#E8E8E8',
        marginTop:-1,
        flexDirection:'row', 
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10
    },
    gonggao_button:{
        width:35, 
        height:25,
        backgroundColor:'#6DB6FF',
        borderRadius:4,
        justifyContent:'center', 
        alignItems:'center'
    },
    photoCell:{
        width:(screenWidth-20-margin*2)/3, 
        height:(screenWidth-20-margin*2)/3, 
        marginRight:5,
        marginTop:10
    }
});








