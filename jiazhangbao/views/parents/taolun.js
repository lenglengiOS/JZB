
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import MyListView from '../component/MyListView';

const nav = require('../../resources/home/home_nav.png');
const showMore = require('../../resources/home/common_getin@2x.png');
const showMoreNor = require('../../resources/home/common_getinNor@2x.png');

const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class BaoBan extends React.Component{
	constructor(props){
		super(props);
		this.state={
           dataSource:defaultData.cloneWithRows(['','','','','','','','','']),
           dataSize:4,
           count:3,
           index:0,
           isShowMore:true,
           isJoin:false,
           selectedButton:[]
		}
	}
    componentDidMount(){
       
    }

    onRefresh() {  
        this.page=1;
        var firstData=[];
        if(this.state.isLocationSearch){
            this.loadManualFwqData()
            return;
        }
    }

    pressRow(){
        alert('pressRow')
    }

    pressHeader(sectionID){
        this.setState({
            isShowMore:!this.state.isShowMore,
            dataSource:defaultData.cloneWithRows(['','','','','','','','','']),
        })
    }

    pressJoin(rowData, sectionID, rowID){
        this.setState({
            isJoin:true, 
            selectedButton:this.state.selectedButton.concat([rowID]),
            dataSource:defaultData.cloneWithRows(['','','','','','','','','']),
        })
    }

    renderCell(rowData, sectionID, rowID){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressRow()}>
                <View style={styles.rowStyle}>
                    <Image source={nav} style={styles.rowImageStyle}/>
                    <View style={{justifyContent:'center', flex:1, height:72}}>
                        <View>
                            <Text style={{color:'#F87A00'}}>天府幼儿园</Text>
                            <Text style={{marginTop:5, color:'#838383'}}>欢迎加入天府幼儿园</Text>
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
                        <Image source={!this.state.isShowMore?showMore:showMoreNor} style={{wdith:15, height:15, tintColor:'#AAAAAA'}}/>
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
                    onRefresh={this.onRefresh.bind(this)}
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
        backgroundColor:'#F5F5F5',
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
        marginRight:10
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