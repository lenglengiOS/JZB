
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
import SearchResult from './search_result';
import MyListView from '../component/MyListView';
const back = require('../../resources/login/nav_back@2x.png');
const showMoreNor = require('../../resources/home/main_showMoreNor@2x.png');
const showMore = require('../../resources/home/main_showMore@2x.png');
const search = require('../../resources/home/lxr_icon_search@2x.png');
const search_history = require('../../resources/home/search_history@2x.png');
const search_clearHistory = require('../../resources/home/search_clearHistory@2x.png');
const options = require('../../resources/home/options_pointer@2x.png');  



const defaultData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
           showMore:false,
           dataSource:defaultData.cloneWithRows(['','','']),
           selectOptions:'机构'
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

    doSearch(){
        const { navigator } = this.props;
        if(navigator&&this.state.searchText) {
            navigator.push({
                name: 'searchresult',
                component: SearchResult,
                params:{
                    searchText:this.state.searchText
                }
            })
        }
    }

    pressRow(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'searchresult',
                component: SearchResult,
                params:{
                    searchText:'rowData'
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
                    <TouchableOpacity  activeOpacity={0.8} onPress={()=>{this._back()}}>
                        <Image source={back} style={{width:30, height:30, marginLeft:10}} />
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity={0.8} style={{flexDirection:'row', alignItems:'center'}} onPress={()=>this.setState({showMore:!this.state.showMore})}>
                    	<Text style={{color:'#8C8C8C', fontSize:18, marginLeft:10}}>{this.state.selectOptions}</Text>
                    	<Image source={this.state.showMore?showMore:showMoreNor} style={{width:15, height:15, marginLeft:5}} />
                    </TouchableOpacity>
                    <View style={styles.TextInput}>
                    	<Image source={search} style={{width:15, height:15, marginLeft:5}} />
                    	<TextInput 
                    		style={{flex:1, marginRight:10, marginLeft:5, fontSize:15}}
							placeholder="幼儿园/培训班/机构/课程"
							placeholderTextColor='#A2A1A6'
                            returnKeyType='search'
                            clearButtonMode='while-editing'
                            onChangeText = {(text) => this.setState({searchText:text})}
                            onSubmitEditing={()=>this.doSearch()}/>
                    </View>
                </View>
                <ScrollView>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.setState({dataSource:defaultData.cloneWithRows([])})} style={styles.clearHistory}>
                        <Image source={search_clearHistory} style={{width:20, height:20}} />
                        <Text style={{marginLeft:10, color:'#919191', fontSize:15}}>清除历史记录</Text>
                    </TouchableOpacity>
                </ScrollView>
                {this.state.showMore?<View style={{position:'absolute', top:56, left:28, alignItems:'center'}}>
                                        <Image source={options} style={{width:11, height:8}} opacity={0.8}/>
                                        <View opacity={0.8} style={{width:75, height:85, backgroundColor:'#000', borderRadius:2}}>
                                            <TouchableOpacity activeOpacity={0.8} style={styles.selectOptions} onPress={()=>this.setState({selectOptions:'机构', showMore:false})}>
                                                <Text style={{color:'#FFF', fontSize:18}}>机构</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.8} style={styles.selectOptions} onPress={()=>this.setState({selectOptions:'课程', showMore:false})}>
                                                <Text style={{color:'#FFF', fontSize:18}}>课程</Text>
                                            </TouchableOpacity>
                                        </View>
                                     </View>:<View></View>}
			</View>
		  )
	}

	renderRow(){
		return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.pressRow()}>
    			<View style={styles.renderRow}>
                    <Image source={search_history} style={{width:20, height:20}} />
                    <Text style={{marginLeft:10, color:'#919191', fontSize:15}}>金苹果</Text>
    			</View>
            </TouchableOpacity>
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
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        flexDirection:'row'
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
    renderRow:{
        backgroundColor:'#FFF', 
        width:screenWidth, 
        height:44, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        paddingLeft:20, 
        paddingRight:20, 
        flexDirection:'row', 
        alignItems:'center'
    },
    clearHistory:{
        backgroundColor:'#FFF', 
        width:screenWidth, 
        height:44, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8', 
        paddingLeft:20, 
        paddingRight:20, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
    },
    selectOptions:{
        justifyContent:'center', 
        flex:1, 
        alignItems:'center'
    }
    
});
