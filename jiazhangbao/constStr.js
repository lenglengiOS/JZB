/**
 * Created by Administrator on 16-3-10.
 * 定义全局变量,常量
 */
import React from 'react';
import {
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';
var  navheight=(Platform.OS === 'android') ? 45 : 64;
var  screenWidth=Dimensions.get('window').width;
var  screenHeight=Dimensions.get('window').height;
var pixe=PixelRatio.get()
var MainTabHeight =48;
var navbackground="#353232";
var lineColor="#ededed"

var Size=function(font){
	if(pixe<=2){
		return font;
	}else{
		return parseInt(font-(pixe-2)*2);
	}
}

const isDebug=true;
if(!isDebug){
	console.log=function(text){}
}


module.exports ={Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console}
