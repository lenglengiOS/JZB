/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import commenStyle from '../styles/basestyle'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {Size} from '../constStr'
var pixe=PixelRatio.get()
var  screenHeight=Dimensions.get('window').height;
var Loading={
    renderLoading:function(loadingContent,renderNav,otherContent,style){
        if(!renderNav){
            renderNav=null
        }
        if(!otherContent){
            otherContent=null;
        }
        return(
            <View style={commenStyle.container}>
                {renderNav}
                <View style={[styles.contentcontainer,style]}>
                    {loadingContent}
                </View>
                {otherContent}
            </View>
        )
    },
    noDataView:function(renderNav,text,otherContent,style){
        text=text?text:"暂无数据..."
        return this.renderLoading(<View style={{flex:1,marginTop:10}}>
                <Text style={styles.text}>{text}</Text>
            </View>,renderNav,otherContent,style)
    },
    noDataCenterView:function(renderNav,text,otherContent,style){
        text=text?text:"暂无数据..."
        return this.renderLoading(<Text style={styles.text}>{text}</Text>,renderNav,otherContent,style)
    },
    loadingView:function(renderNav,otherContent,style){
        return this.renderLoading(<View><Bars color="#ff7836"/><Text style={styles.text}>加载中...</Text></View>,renderNav,otherContent,style)
    },
    /**
    *只显示加载图标和内容，不显示头部和其他内容
    */
    loadingContent:function(style){
        return(
            <View style={[styles.contentcontainer,style]}>
                <Bars color="#ff7836"/>
                <Text style={styles.text}>加载中...</Text>
            </View>   
        )
    },
    /**
    *局部加载等待
    */
    loadingIndicator:function(color){
        return( 
            <View style={[commenStyle.container,{padding:10,backgroundColor:"transparent"}]}>
                <ActivityIndicator animating={true} size='small' color={color?color:"#58a0ff"}/>
            </View> 
            )
    },
    /**
    *只显示提示，不显示头部和其他内容
    */
    noDataContent:function(text,style){
        text=text?text:"暂无数据..."
        return(
            <View style={[styles.contentcontainer,style]}>
                <Text style={styles.text}>{text}</Text>
            </View>   
        )
    }
}
var styles = StyleSheet.create({
    text:{
        textAlign:"center",
        fontSize:Size(14)
    }, 
    contentcontainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 0,
        backgroundColor:"#f4f4f4",
        justifyContent:"center"
      },
})
module.exports = Loading;

