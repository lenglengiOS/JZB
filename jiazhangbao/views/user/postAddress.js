
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

    }

    _back(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop() 
        }
    }

    uploadInfo(INDEX){
        var data = [];
        var pickerTitleText = '';
        var selectedValue = [];
        switch(INDEX){
            case 1:
                data = ['未入园','幼儿园','一年级','二年级','三年级','四年级','五年级','六年级','初中及以上'];
                //data = [1,2,3,4];
                pickerTitleText = '请选择孩子学段';
                selectedValue = ['未入园'];
            break;
            case 2:
                data = ['未出生','1岁以下','1岁','2岁','3岁','4岁','5岁','6岁','7岁','8岁','9岁','10岁','11岁','12岁','12岁以上'];
                pickerTitleText = '请选择孩子年龄';
                selectedValue = ['未出生'];
            break;
            case 3:
                data = ['男孩','女孩'];
                pickerTitleText = '请选择孩子性别';
                selectedValue = ['男孩'];
            break;
            case 4:
                data = ['男','女'];
                pickerTitleText = '请选择性别';
                selectedValue = ['男'];
            break;
        }


        Picker.init({
            pickerData: data,
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:pickerTitleText,
            pickerConfirmBtnColor:[0,116,251,1], 
            pickerCancelBtnColor:[107,107,107,1],   
            pickerTitleColor:[161,161,161,1],
            selectedValue: selectedValue,

            onPickerConfirm: data => {
                alert(data);
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
                alert(data);
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
                            defaultValue='6878'
                            placeholder='请输入姓名'
                            />
                        </View>
                        <View style={{width:screenWidth-15,height:1, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.cellS}>
                            <Text style={styles.name}>电话：</Text>
                            <TextInput 
                            style={styles.info}
                            onChangeText={(text) => this.setState({tel:text})}
                            value={this.state.tel}
                            clearButtonMode='while-editing'
                            defaultValue='6878'
                            placeholder='请输入电话'
                            />
                        </View>
                        <View style={{width:screenWidth-15,height:1, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.cellS}>
                            <Text style={styles.name}>地区：</Text>
                            <TouchableOpacity  activeOpacity={1} style={{flex:1, justifyContent:'center'}} onPress={()=>{this.selectAddr()}}>
                                <Text style={{color:'#C7C6CD', fontSize:16}}>请选择地区</Text>
                            </TouchableOpacity>
                            <Image source={JZBImages.chose} style={{width:20, height:20, marginRight:15}} />
                        </View>
                        <View style={{width:screenWidth-15,height:1, backgroundColor:'#E8E8E8'}}/>
                        <View style={styles.cellS}>
                            <Text style={[styles.name, {marginRight:10}]}>详细地址：</Text>
                            <TextInput 
                            style={styles.info}
                            onChangeText={(text) => this.setState({addr:text})}
                            value={this.state.addr}
                            clearButtonMode='while-editing'
                            defaultValue='6878'
                            placeholder='请输入地址'
                            />
                        </View>
                    </View>
                    <Text style={styles.note}>家长大人，我们会按照此地址为您邮寄奖品，请确保您的信息准确哦！</Text>
                    <TouchableOpacity style={styles.save} activeOpacity={0.8} onPress={()=>alert('保存')}>
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





























