
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import MyListView from '../component/MyListView';
import LoadingShow  from '../component/react-native-loading';
import Tools from '../tools';
import Toast from '../tools/Toast';

const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
            loading:false,
            loadingWaitText:"正在获取数据...",
            dataSource:defaultData,
            dataSize:5,
            count:3
		}
	}
    componentDidMount(){
        this.setState({loading:true})
        this.loadData();
    }

    loadData(){
        var tags = '';
        if(this.props.param.INDEX == 5)
        {
            tags = '?tag=0&tag1=1';
        }
        if(this.props.param.INDEX == 6)
        {
            tags = '?tag=2&tag1=3';
        }
        Tools.get(IPAddr+this.props.param.topItems.jiaoyu_jiazhang+tags,(data)=>{
                console.log("==allNews===="+JSON.stringify(data));
                this.setState({
                    dataSource:defaultData.cloneWithRows(data.allNews),
                    loading:false
                })
                
        },(err)=>{
            this.setState({
                loading:false
            })
            Toast.show(err)
        })
    }

    _back(){
        let { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    goToNewsDetail(url,subtitle){
        let {route,navigator} = this.props;
        if(navigator){
            navigator.push({
                name:"newsdetail",
                param:{
                    title:subtitle,
                    url:url
                }
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
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}} style={{width:30, height:30, position:'absolute', top:27, left:10}}>
                        <Image source={JZBImages.back} style={{width:25, height:25}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, fontWeight: 'bold', color:'#00B09D'}}>{this.props.param.TITLE}</Text>
                </View>
                <MyListView
                    onRefresh={this._onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
                <LoadingShow loading={this.state.loading} text={this.state.loadingWaitText}/>
			</View>
		  )
	}

    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToNewsDetail(rowData.url, rowData.subtitle)}}>
                <View style={{flexDirection:'row', backgroundColor:'#FFF', paddingTop:15, paddingBottom:15, paddingLeft:10, paddingRight:10, borderBottomWidth:1, borderBottomColor:'#E8E8E8'}}>
                    <View style={styles.recommendCell}>
                        <View>
                            <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                <Text style={{fontSize:16}}>{rowData.subtitle}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={JZBImages.edite} style={{width:13, height:13}}/>
                            <Text style={{fontSize:13, color:'#9B9B9B'}}> 家长宝</Text>
                            <View style={{backgroundColor:'#9B9B9B', height:10, width:1, marginLeft:5, marginRight:5}}/>
                            <Text style={{fontSize:13, color:'#9B9B9B'}}>{rowData.title}</Text>
                        </View>
                    </View>
                    <Image source={{uri: IPAddr+rowData.facepic}} style={{width:85, height:70, backgroundColor:'#F5F5F5'}}/>
                </View>
            </TouchableOpacity>
        )
    }

    _onRefresh() {  
        this.loadData();
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
        marginRight:10, 
        justifyContent:'space-between'
    }
});
