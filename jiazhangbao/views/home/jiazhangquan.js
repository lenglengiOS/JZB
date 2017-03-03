
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
    StatusBar
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import MyListView from '../component/MyListView';
import NewsDetail from '../recomNews/newsDetail';
import Publish from './publish';

const back = require('../../resources/login/nav_back@2x.png');
const showMoreNor = require('../../resources/home/main_showMoreNor@2x.png');
const search = require('../../resources/home/lxr_icon_search@2x.png');
const search_history = require('../../resources/home/search_history@2x.png');
const search_clearHistory = require('../../resources/home/search_clearHistory@2x.png');
const options = require('../../resources/home/options_pointer@2x.png');  
const nav = require('../../resources/home/home_nav.png');
const location = require('../../resources/home/location@2x.png');
const edite = require('../../resources/home/main_articles_edit@2x.png');
const focus_off = require('../../resources/home/circleList_focus_off@2x.png');
const focus_on = require('../../resources/home/circleList_focus_on@2x.png');
const likeIcon = require('../../resources/home/postList_likeIcon@2x.png');
const replyIco = require('../../resources/home/postList_replyIcon@2x.png');
const fabu = require('../../resources/home/fabu.png');

const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           dataSource:defaultData.cloneWithRows(['','','']),
           dataSize:4,
           count:3,
           index:0
		}
	}
    componentDidMount(){
       
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    goToTopicDetail(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'topicDetail',
                component: NewsDetail,
                params: {
                    title:"金苹果天府国际幼儿园",
                    url:'http://www.baidu.com'
                }
            })
        }
    }

    publish(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'publish',
                component: Publish
            })
        }
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
                    <Text numberOfLines={1} style={{fontSize:20, marginLeft:20, marginRight:20, flex:1, color:'#00B09D', textAlign:'center'}}>{this.props.TITLE}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.setState({isFocus:!this.state.isFocus})}>
                        <Image source={this.state.isFocus?focus_on:focus_off} style={{width:20, height:20, marginRight:10}} />
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
                    onRefresh={this._onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
                <TouchableOpacity onPress={()=>this.publish()} activeOpacity={0.8} style={{position:'absolute', right:20, bottom:30}}>
                    <Image source={fabu} style={{width:42, height:42, opacity:0.7}} />   
                </TouchableOpacity>
			</View>
		  )
	}

    renderCell(){
        return(
            <View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToTopicDetail()}} style={styles.cell}>
                    <View style={{flex:1, backgroundColor:'#FFF',height:40,flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('用户资料')}>
                                <Image source={nav} style={{width:40, height:40, borderRadius:20}} />
                            </TouchableOpacity>
                            <View style={{marginLeft:10, marginTop:3, marginBottom:3, justifyContent:'space-between',height:34}}>
                                <Text style={{color:'#FAB665', fontSize:14}}>宝妈小娟娟</Text>
                                <Text style={{color:'#A5A5A5', fontSize:12}}>四年级家长</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={replyIco} style={{width:14, height:14}} />
                            <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>10</Text>
                            <Image source={likeIcon} style={{width:14, height:14, marginLeft:10}} />
                            <Text style={{color:'#969696', marginLeft:2, fontSize:12}}>8</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:16, marginLeft:5, marginRight:5, marginTop:10}} numberOfLines={2}>家长圈使用需知a用需dv用需用需wad用需需知a用需dv用需用需wa需知a用需dv用需用需wa需知a用需dv用需用需wa需知a用需dv用需用需wa</Text>
                    <Text style={{fontSize:14, marginLeft:5, marginRight:5, marginTop:5, color:'#909090'}} numberOfLines={2}>需用需wa需知a用需dv用需用需wa需知a用需dv需wa需知a用需dv需wa需知a用需dv用需用需wa需知a用需dv用需用需wa</Text>
                    <View style={{width:screenWidth-30,marginLeft:5, height:(screenWidth-40)/3,justifyContent:'space-between', flexDirection:'row', marginTop:8}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('查看图片1')}>
                            <Image source={nav} style={{width:(screenWidth-40)/3, height:(screenWidth-40)/3}} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('查看图片2')}>
                            <Image source={nav} style={{width:(screenWidth-40)/3, height:(screenWidth-40)/3}} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('查看图片3')}>
                            <Image source={nav} style={{width:(screenWidth-40)/3, height:(screenWidth-40)/3}} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
                    {this.renderCell()}
                </View>
            )
        }
        return(
            <View>
                {this.renderCell()}
            </View>
        )
        
    }

    _onRefresh() {  
        this.page=1;
        var firstData=[];
        if(this.state.isLocationSearch){
            this.loadManualFwqData()
            return;
        }
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
    }
});








