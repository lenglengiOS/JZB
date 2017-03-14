
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
import Jiazhangquan from '../home/jiazhangquan';

const nav = require('../../resources/home/home_nav.png');
const showMore = require('../../resources/home/common_getin@2x.png');
const showMoreNor = require('../../resources/home/common_getinNor@2x.png');
var Car = require('./Car.json');
const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class BaoBan extends React.Component{
	constructor(props){
		super(props);
		{this.loadData()}
	}
    componentDidMount(){
       {this.loadData()}
    }

    loadData(){
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        this.state = {
            dataSource: new ListView.DataSource({
                getSectionData: getSectionData, // 获取组中数据
                getRowData: getRowData, // 获取行中的数据
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            dataSize:4,
            count:3,
            closeSection:[]
        };
        var jsonData = Car.data;
        var dataBlob = {},
            sectionIDs = [],
            rowIDs = [],
            cars = [];
        for (var i in jsonData) {
            //step 1、把组数据放入sectionIDs数组中
            sectionIDs.push(i);
            //step 2、把组中内容放dataBlob对象中
            dataBlob[i] = jsonData[i].title;
            //step 3、取出该组中所有的车
            cars = jsonData[i].cars;
            //step 4记录每一行中的数据
            rowIDs[i] = [];
            //step 5、获取行中每一组数据
            for (var j in cars) {
                //把行号放入rowIDs中
                rowIDs[i].push(j);
                //把每一行中的内容放dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }
        }

        // 更新状态
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs) 
        });
    }

    onRefresh() {  
        this.page=1;
        var firstData=[];
        if(this.state.isLocationSearch){
            return;
        }
    }

    pressRow(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'jiazhangquan',
                component: Jiazhangquan
            })
        }
    }

    pressHeader(sectionID){
        var index = this.state.closeSection.indexOf(sectionID);
        if (index!=-1) { // 包含该元素
            var arr = this.state.closeSection;
            arr.splice(index,1);
            this.setState({
                closeSection:arr
            })
            {this.loadData()}
            return;
        }
        this.setState({
            closeSection:this.state.closeSection.concat([sectionID])
        })
        {this.loadData()}
    }

    renderRow(rowData,sectionID){
        if (this.state.closeSection.indexOf(sectionID)!=-1) {
            return null;
        }
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressRow()}>
                <View style={styles.rowStyle}>
                    <Image source={nav} style={styles.rowImageStyle}/>
                    <View style={{justifyContent:'center', flex:1, height:72}}>
                    	<View>
	                    	<Text style={{color:'#F87A00'}}>{rowData.name}</Text>
	                    	<Text style={{marginTop:5, color:'#838383'}}>{rowData.name}</Text>
	                    </View>
                    </View>
                </View>
                <View style={{height:1, backgroundColor:'#FFF', width:screenWidth}}>
                    <View style={{height:1, backgroundColor:'#E8E8E8', width:screenWidth-68, marginLeft:68}}/>
                </View>
            </TouchableOpacity>
        )
    }

    // 每一组中的数据
    renderSectionHeader(sectionData, sectionID) {
        return (
        	<TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressHeader(sectionID)}>
	            <View style={styles.sectionHeaderViewStyle}>
	                <Text style={{marginLeft: 5, color: '#8F8F8F'}}>{sectionData}</Text>
		            <Image source={this.state.closeSection.indexOf(sectionID)!=-1?showMore:showMoreNor} style={{wdith:15, height:15, tintColor:'#AAAAAA'}}/>
	            </View>
	        </TouchableOpacity>
        );
    }

	render(){
		return(
			<View style={styles.container}>
                <MyListView
                    onRefresh={this.onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    count={this.state.count}/>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
	container:{
        flex:1,
		justifyContent:"center",
        backgroundColor:'red',
        alignItems:'center',
    },
    headerViewStyle: {
        height: 64,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});