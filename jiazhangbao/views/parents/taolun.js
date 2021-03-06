
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
    NativeModules
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
import MyListView from '../component/MyListView';
var TaoLunQun = require('./fujinqun.json');
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import LoadingShow  from '../component/react-native-loading';
import Toast from '../tools/Toast';
import Tools from '../tools';
var NativeTools = NativeModules.NativeTools;

const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class BaoBan extends React.Component{
	constructor(props){
		super(props);
		this.state={
           dataSource:defaultData.cloneWithRows(TaoLunQun.data),
           dataSize:4,
           count:3,
           index:0,
           isShowMore:true,
           isJoin:false,
           selectedButton:[]
		}
	}
    componentDidMount(){
       //alert(TaoLunQun.data.length)
    }

    onRefresh() {  
        this.page=1;
        var firstData=[];
        if(this.state.isLocationSearch){
            this.loadManualFwqData()
            return;
        }
    }

    pressRow(rowID, rowData){
        if (this.state.isJoin&&this.state.selectedButton.indexOf(rowID)!=-1){
            //alert(rowData.name)
            NativeTools.singleChat(rowData.name);
        }else{            
            //const { navigator } = this.props;
            //if(navigator) {
            //    navigator.push({
            //        name: 'chatgroupinfo',
            //    })
            //}
            Toast.show("加入后才能进群聊天哦！", 3000);
        }
        

    }

    pressHeader(sectionID){
        this.setState({
            isShowMore:!this.state.isShowMore,
            dataSource:defaultData.cloneWithRows(TaoLunQun.data),
        })
    }

    pressJoin(rowData, sectionID, rowID){
        // 验证是否登陆
            Tools.getStorage("maincfg",(resData)=>{
                if(Tools.isDataValid(resData))
                {
                   this.setState({
                        isJoin:true, 
                        selectedButton:this.state.selectedButton.concat([rowID]),
                        dataSource:defaultData.cloneWithRows(TaoLunQun.data),
                    })
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

    renderCell(rowData, sectionID, rowID){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressRow(rowID, rowData)}>
                <View style={styles.rowStyle}>
                    <Image source={{uri: BimgURL+rowData.logo+LimgURL}} style={styles.rowImageStyle}/>
                    <View style={{justifyContent:'center', flex:1, height:72}}>
                        <View>
                            <Text style={{color:'#F87A00'}}>{rowData.name}</Text>
                            <Text style={{marginTop:5, color:'#838383'}}>{rowData.description}</Text>
                        </View>
                    </View>
                    {this.renderJoinButton(rowData, sectionID, rowID)}
                </View>
            </TouchableOpacity>
        )
    }

    renderJoinButton(rowData, sectionID, rowID){
        if (this.state.isJoin&&this.state.selectedButton.indexOf(rowID)!=-1) {
            return(
                <View style={{position:'absolute', top:18, right:13}}>
                    <Text style={{color:'#9A9A9A', fontSize:14}}>已加入</Text>
                </View>
            )
        }
        return(
            <View style={styles.join}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressJoin(rowData, sectionID, rowID)}>
                    <Text style={{color:'#4AA8FD'}}>加入</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderRow(rowData, sectionID, rowID){
        if (rowID==0) {
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressHeader(sectionID)}>
                    <View style={styles.sectionHeaderViewStyle}>
                        <Text style={{marginLeft: 5, color: '#8F8F8F'}}>附近群</Text>
                        <Image source={!this.state.isShowMore?JZBImages.showMore:JZBImages.showMoreNor} style={{width:15, height:15, tintColor:'#AAAAAA'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
        if (!this.state.isShowMore) {return null}
        return(
            <View>
                {this.renderCell(rowData, sectionID, rowID)}
                <View style={{height:1, backgroundColor:'#FFF', width:screenWidth}}>
                    <View style={{height:1, backgroundColor:'#E8E8E8', width:screenWidth-68, marginLeft:68}}/>
                </View>
            </View>
        )
    }

	render(){
		return(
			<View style={styles.container}>
                <MyListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#FFF'
    },
    rowImageStyle: {
        width: 48,
        height: 48,
        borderRadius:24,
        marginRight:10,
        backgroundColor:'#F5F5F5'
    },
    sectionHeaderViewStyle: {
        backgroundColor: '#F5F5F5',
        height: 36,
        width:screenWidth,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingLeft:6,
        paddingRight:10,
        alignItems:'center',
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8',
        borderTopWidth:1,
        borderTopColor:'#E8E8E8',
        marginTop:-1
    },
    join:{
        width:43, 
        height:25, 
        borderRadius:3,
        borderColor:'#4AA8FD', 
        borderWidth:1, 
        position:'absolute', 
        top:10, 
        right:10,
        justifyContent:'center',
        alignItems:'center'
    }
});