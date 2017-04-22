
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
    ActionSheetIOS
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr} from '../constStr';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingShow  from '../component/react-native-loading';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Picker from 'react-native-picker';
import Toast from '../tools/Toast';
import Tools from '../tools';
import CityData from './cityData';

export default class WoDe extends React.Component{
	constructor(props){
		super(props);
		this.state={
            loading:false,
            loadingWaitText:"正在上传..."
		}
	}
    componentDidMount(){
        //alert(JSON.stringify(this.props.param.data))
        this.setState({
            name:this.props.param.data.name?this.props.param.data.name:'',
            contact_tel:this.props.param.data.contact_tel?this.props.param.data.contact_tel:'',
            region:this.props.param.data.name?this.props.param.data.region:'',
            address:this.props.param.data.name?this.props.param.data.address:'',
            user_phone:this.props.param.data.user_phone
        })
    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    selectAddr(){
        var pickerData = CityData.data;

        Picker.init({
            pickerData: pickerData,
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:'选择地区',
            pickerConfirmBtnColor:[0,116,251,1], 
            pickerCancelBtnColor:[107,107,107,1],   
            pickerTitleColor:[161,161,161,1],

            onPickerConfirm: data => {
                this.setState({region:data.join(' ')})
            },
            onPickerCancel: data => {
                //alert(data);
            },
            onPickerSelect: data => {
                //alert(data);
            }
        });
        Picker.show();
    }

    upLoadInfo(){
        if(!this.state.name)
        {
            Toast.show("请输入姓名",2000);
            return;
        }
        var check = Tools.checkPhone(this.state.contact_tel);
        if(check)
        {
            Toast.show(check,2000);
            return;
        }
        if(!this.state.region)
        {
            Toast.show("请选择地区！",2000);
            return;
        }
        if(!this.state.address)
        {
            Toast.show("请输入地址！",2000);
            return;
        }
        this.setState({
            loading:true,
        })
        var PostData ={
            data:{
               name:this.state.name,
               contact_tel:this.state.contact_tel,
               region:this.state.region,
               address:this.state.address,
               user_phone:this.state.user_phone
            }
        }
        Tools.postNotBase64(IPAddr+"/user/updateUserInfo.php", PostData,(ret)=>{
            console.log("====dadadada=="+ret)
                this.setState({loading:false})
                Toast.show("修改成功！", 2000)
                let value = this.state.address;
                RCTDeviceEventEmitter.emit('undateUserAddr',value); 
                this._back();
            }, (err)=>{
                this.setState({loading:false})
                Toast.show(err);
                console.log("====444444==="+err)
        });
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
                    <Text style={{fontSize:18, color:'#00B09D'}}>邮寄地址</Text>
                </View>
                <ScrollView>
                    <View style={styles.bodyC}>
                        <View style={styles.cellS}>
                            <Text style={styles.name}>姓名：</Text>
                            <TextInput 
                            style={styles.info}
                            onChangeText={(text) => this.setState({name:text})}
                            value={this.state.name}
                            clearButtonMode='while-editing'
                            defaultValue={this.state.name}
                            placeholder='请输入姓名'
                            />
                        </View>
                        <View style={{width:screenWidth-15,height:1, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.cellS}>
                            <Text style={styles.name}>电话：</Text>
                            <TextInput 
                            style={styles.info}
                            onChangeText={(text) => this.setState({contact_tel:text})}
                            value={this.state.contact_tel}
                            defaultValue={this.state.contact_tel}
                            clearButtonMode='while-editing'
                            placeholder='请输入电话'
                            />
                        </View>
                        <View style={{width:screenWidth-15,height:1, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.cellS}>
                            <Text style={styles.name}>地区：</Text>
                            <TouchableOpacity  activeOpacity={1} style={{flex:1, justifyContent:'center'}} onPress={()=>{this.selectAddr()}}>
                                <Text style={{color:this.state.region?'#000':'#C7C6CD', fontSize:16, lineHeight:18}}>{this.state.region?this.state.region:'请选择地区'}</Text>
                            </TouchableOpacity>
                            <Image source={JZBImages.chose} style={{width:20, height:20, marginRight:15, marginTop:2}} />
                        </View>
                        <View style={{width:screenWidth-15,height:1, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.cellS}>
                            <Text style={[styles.name, {marginRight:10}]}>详细地址：</Text>
                            <TextInput 
                            style={styles.info}
                            onChangeText={(text) => this.setState({address:text})}
                            value={this.state.address}
                            clearButtonMode='while-editing'
                            defaultValue={this.state.address}
                            placeholder='请输入地址'
                            />
                        </View>
                    </View>
                    <Text style={styles.note}>家长大人，我们会按照此地址为您邮寄奖品，请确保您的信息准确哦！</Text>
                    <TouchableOpacity style={styles.save} activeOpacity={0.8} onPress={()=>this.upLoadInfo()}>
                        <Text style={{color:'#FFF', fontSize:18}}>保存</Text>
                    </TouchableOpacity>

                </ScrollView>
                <LoadingShow loading={this.state.loading} text={this.state.loadingWaitText}/>
			</View>
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
        justifyContent:'center', 
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8'
    },
    bodyC:{
        width:screenWidth,
        borderBottomWidth:1,
        borderBottomColor:'#E8E8E8',
        borderTopWidth:1,
        borderTopColor:'#E8E8E8',
        backgroundColor:'#FFF',
        paddingLeft:15,
        marginTop:10
    },
    cellS:{
        height:43,
        width:screenWidth-15,
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        fontSize:15,
        marginRight:40
    },
    info:{
        flex:1,
        fontSize:16,
        marginRight:15
    },
    note:{
        color:'#FD9C00', 
        fontSize:13, 
        marginLeft:15, 
        marginTop:10, 
        marginRight:15,
        lineHeight:19
    },
    save:{
        width:screenWidth-30,
        borderRadius:5,
        backgroundColor:'#33BAAB',
        alignItems:'center',
        justifyContent:'center',
        height:44,
        marginLeft:15, 
        marginTop:18
    }
});





























