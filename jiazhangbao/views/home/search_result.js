
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

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
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
           dataSource:defaultData,
           dataSize:5,
           count:3
		}
	}
    componentDidMount(){
       //alert(this.props.param.searchText)
       this.goLocation();
       this.getUserData();
    }

    getUserData(){
        Tools.getStorage("maincfg",(resData)=>{
            if(Tools.isDataValid(resData))
            {
                //alert(resData)
                var maincfgData=JSON.parse(resData)
                this.setState({
                        isLogin:true,
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    })
                console.log("====maincfgData=="+resData)

                // 1.登陆家长宝服务器
                var PostData ={
                    data:{
                        userphone:maincfgData.data.userphone,
                        userpwd:maincfgData.data.userpwd
                    }
                }
                Tools.postNotBase64(IPAddr+"/login/login.php", PostData,(ret)=>{
                    console.log("====登陆成功dadadada=="+JSON.stringify(ret))
                        if(ret.message == "登陆成功")
                        {
                            this.setState({
                                username:ret.data[0]?ret.data[0].user_name:'',
                                id:ret.data[0]?ret.data[0].id:'',
                                user_icon:ret.data[0]?ret.data[0].user_icon:'',
                                data:ret.data[0]?ret.data[0]:null,
                                isLogin:true,
                                c_grade:ret.data[0].c_grade?ret.data[0].c_grade+"家长":''
                            })
                        }else{
                            Toast.show("获取用户信息失败", 2000)
                        }
                    }, (err)=>{
                        Toast.show(err);
                        this.setState({isLogin:false})
                        console.log("====5555==="+err)
                });


            }else{
                this.setState({
                    isLogin:false,
                    user_icon:null
                })
            }
        });  
    }

    goLocation(){
        navigator.geolocation.getCurrentPosition(
          (position) => {
                console.log("==position===="+JSON.stringify(position));
                this.setState({
                    longitude:position.coords.longitude,
                    latitude:position.coords.latitude
                })
                // 请求后台查询数据
                var url = IPAddr+'/home/search.php?searchText='+this.props.param.searchText+'&longitude='+position.coords.longitude+'&latitude='+position.coords.latitude;
                Tools.get(url,(data)=>{
                    console.log("==searchData===="+JSON.stringify(data.allOrgs));
                    this.setState({
                        dataSource:defaultData.cloneWithRows(data.allOrgs),
                    })
        
                },(err)=>{
                    this.setState({
                        loading:false
                    })
                    Toast.show(err)
                })

            },
            (error) =>{
                console.log("==error.message===="+error.message);
                Toast.show("获取定位失败！", 2000)
                this.loadData();
            }
        );
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    gotoJigouInfo(ID, NAME){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'jigouinfo',
                param: {
                    title:'机构信息',
                    id:ID,
                    userIcon:this.state.user_icon,
                    name:NAME,
                    userId:this.state.id,
                    userphone:this.state.userphone,
                    username:this.state.username
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
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._back()}}>
    				<View style={styles.nav}>
                            <Image source={JZBImages.back} style={{width:30, height:30, marginLeft:10}} />
                        <View style={styles.TextInput}>
                        	<Image source={JZBImages.search} style={{width:15, height:15, marginLeft:5}} />
                        	<Text style={{flex:1, marginLeft:5}}>{"\""+this.props.param.searchText+"\""+"的搜索结果"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <MyListView
                    onRefresh={this._onRefresh.bind(this)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    dataSize={this.state.dataSize}
                    count={this.state.count}/>
			</View>
		  )
	}

    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.gotoJigouInfo(rowData.orgId, rowData.name)}} style={styles.cell}>
                <Image source={{uri: BimgURL+rowData.logo+LimgURL}} style={{width:85, height:70, backgroundColor:'#E8E8E8'}}/>
                <View style={styles.recommendCell}>
                    <View>
                        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={{fontSize:18}}>{rowData.name}</Text>
                        </View>
                        <Text style={{fontSize:15, color:'#9B9B9B', marginTop:5}}>{rowData.address}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={JZBImages.location} style={{width:8, height:12}}/>
                        <Text style={{fontSize:13, color:'#9B9B9B'}}> {rowData.distance}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onRefresh() {  
        this.goLocation();
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
    recommendCell:{
        flex:1, 
        marginLeft:10, 
        marginRight:10, 
        justifyContent:'space-between'
    },
    cell:{
        flexDirection:'row', 
        backgroundColor:'#FFF', 
        paddingTop:15, 
        paddingBottom:15, 
        paddingLeft:10, 
        borderBottomWidth:1, 
        borderBottomColor:'#E8E8E8'
    }
});
