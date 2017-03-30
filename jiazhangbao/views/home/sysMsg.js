
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console} from '../constStr';
import MyListView from '../component/MyListView';


const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           dataSource:defaultData.cloneWithRows(['','','']),
           dataSize:5,
           count:3
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

    pressRow(){
        alert('pressRow')
    }

	render(){
		return(
			<View style={styles.container}>
				<StatusBar
                     backgroundColor="blue"
                     barStyle="default"
                     animated={true}/>
                <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={JZBImages.back} style={{width:30, height:30}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, color:'#00B09D'}}>{this.props.title}</Text>
                </View>
                <MyListView
                    onRefresh={this._onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
			</View>
		  )
	}

    renderRow(){
        if (this.props.title=='聊天记录') {
            return(
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressRow()}>
                    <View style={styles.rowStyle}>
                        <Image source={JZBImages.nav} style={styles.rowImageStyle}/>
                        <View style={{justifyContent:'center', flex:1, height:65}}>
                            <View>
                                <Text style={{fontSize:16}}>天府幼儿园</Text>
                                <Text style={{marginTop:5, color:'#9E9E9E'}}>哈喽</Text>
                            </View>
                        </View>
                        <View style={{position:'absolute', top:18, right:13}}>
                            <Text style={{color:'#9A9A9A', fontSize:14}}>下午 2:24</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <View style={{flexDirection:'row', backgroundColor:'#FFF', paddingTop:15, paddingBottom:15, paddingLeft:10, borderBottomWidth:1, borderBottomColor:'#E8E8E8'}}>
                <Text>666</Text>
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
        borderBottomColor:'#E8E8E8'
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
        marginLeft:10, 
        marginRight:10, 
        justifyContent:'space-between'
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#FFF',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8'
    },
    rowImageStyle: {
        width: 48,
        height: 48,
        borderRadius:24,
        marginRight:10
    }
});
